---
title: "Downloading anime with Airflow"
date: "2026-05-31"
tags: ["airflow"]
summary: "Using Airflow to download anime"
---

I maintain a Plex server with a personal collection of anime series that I have downloaded over a couple of years. The anime episodes are downloaded using Airflow and Anipy API, where the user simply provides a few inputs such as the anime title, the title override, and the season. Since Anipy API uses information from Allanime, the title input needs to match what Allanime has for the anime (or one of its alternative titles). The title override specifically tells Airflow the folder name to use when persisting the anime episodes to disk. This is due to how Plex parses out folders for animes with multiple seasons. Animes with multiple seasons should contain the anime title, followed by season folders. By providing a title override, all seasons can go in the override folder. Finally, the season is used to add the season number to the episode title.

Here's a recent set of parameters I used to download Season 4 of _Ginga Eiyuu Densetsu: Die Neue These_:

```json
{
  "anime": "Ginga Eiyuu Densetsu: Die Neue These - Sakubou",
  "season": 4,
  "title_override": "Ginga Eiyuu Densetsu: Die Neue These"
}
```

## The pipeline

Let's take look at the pipeline for downloading episodes.

[airflow-dag.png](https://postimg.cc/68NBLtnZ)

### search_for_anime

This task uses Anipy's API to search for matching titles against Allanime's database. It returns results as a list of dictionaries. This list is used downstream via XCOMs.

```python
@task
def search_for_anime(params):
    from anipy_api.provider import LanguageTypeEnum
    from anipy_api.provider.providers import AllAnimeProvider

    anime = params["anime"]
    provider = AllAnimeProvider()

    search_results = provider.get_search(anime)
    anime_results = [
        {"title": r.name, "id": r.identifier}
        for r in search_results
        if LanguageTypeEnum.SUB in r.languages
    ]

    return anime_results
```

### parse_results

This is a branching task that determines which downstream task to run, depending on whether the number of search results. If only 1 anime was returned, then it will branch to `get_episodes`. Otherwise, it branches to `show_options`. If no anime results were found, then an exception is raised and the DAG stops.

```python
@task.branch
def parse_results(ti):
    results = ti.xcom_pull(task_ids="search_for_anime", key="return_value")

    if len(results) == 0:
        raise AirflowFailException("Failed to find anime")

    if len(results) > 1:
        ti.xcom_push(key="anime_options", value=results)
        return "show_options"

    ti.xcom_push(key="anime_title", value=results[0]["title"])
    return "get_episodes"
```

### show_options

A diagnostic task for showing other matches if multiple matches are found. I tend to use this if I need to determine if the anime has more seasons. Since the results are returned as a XCOM variable, I simply just see the available options from the Airflow UI.

```python
@task
def show_options(ti):
    options = ti.xcom_pull(task_ids="parse_results", key="anime_options")
    parsed_options = [
        {"id": result["id"], "title": result["title"]} for result in options
    ]

    return parsed_options
```

### get_episodes

Finds the anime that matches the closest to the anime title input using fuzzy matching. Since I tend to just pull the anime title from Allanime, the input will always match exactly to one of the options. Once the closest match is found, the task finds all the episodes of the anime title. This list of episodes is later fed to the downstream task for download.

```python
@task(trigger_rule="one_success")
def get_episodes(params, ti):
    from anipy_api.anime import Anime
    from anipy_api.provider import LanguageTypeEnum
    from anipy_api.provider.providers import AllAnimeProvider
    from rapidfuzz import fuzz

    anime = params["anime"]

    results = ti.xcom_pull(task_ids="search_for_anime", key="return_value")
    results_ = {result["title"]: result for result in results}
    closest_match = max(
        results_.keys(),
        key=lambda title: fuzz.ratio(title, anime),
    )

    provider = AllAnimeProvider()
    closest_anime = Anime(
        provider,
        results_[closest_match]["title"],
        results_[closest_match]["id"],
        set([LanguageTypeEnum.SUB]),
    )

    # get episodes
    episodes = closest_anime.get_episodes(lang=LanguageTypeEnum.SUB)

    ti.xcom_push(key="anime_id", value=closest_anime.identifier)
    ti.xcom_push(key="anime_title", value=closest_anime.name)

    return episodes
```

### download_episode

This task uses dynamic task mapping to download episodes in parallel. Since the previous `get_episodes` task returns a list of episode numbers, the task gets each episode and downloads it, with a custom episode filename (Anipy will automatically determine the filename extension). You'll notice the episodes are saved in a `FastAnime` folder. I had previously used this package to download episodes, but it has since been deprecated and is no longer being maintained.

```python
    @task(map_index_template="{{ episode }}")
    def download_episode(episode, ti, params, get_episodes_task_id="get_episodes"):
        from pathlib import Path

        from anipy_api.anime import Anime
        from anipy_api.download import Downloader
        from anipy_api.provider import LanguageTypeEnum
        from anipy_api.provider.providers import AllAnimeProvider

        anime_id = ti.xcom_pull(task_ids=get_episodes_task_id, key="anime_id")
        anime_title = ti.xcom_pull(task_ids=get_episodes_task_id, key="anime_title")
        title_override = params["title_override"]
        season = params["season"]
        renamed = title_override or anime_title
        episode_title = f"{renamed}; Season {season}; Episode {str(episode).zfill(2)}"

        provider = AllAnimeProvider()
        anime = Anime(provider, anime_title, anime_id, set([LanguageTypeEnum.SUB]))

        # get stream link
        stream = anime.get_video(episode, LanguageTypeEnum.SUB, preferred_quality=1080)

        downloader = Downloader()
        download_path = downloader.download(
            stream=stream,
            download_path=Path(
                f"/home/airflow/Videos/FastAnime/{renamed}/Season {season}/{episode_title}"
            ),
        )

        return str(download_path)
```

## Full code

Here's the full DAG code with the tasks.

```python
"""DAG to download anime using Anipy API.

Downloads anime from AllManga.to and writes them to disk following the
pattern of `{title}/Season {season_number}/{title}; Episode {episode_number}`.
This pattern is to ensure that the episodes can be detected and matched by
Plex Media Server.

## Params

* `anime`: Anime title, preferably based from AllManga.to
* `title_override`: (optional) Override value for title of anime. If left
    blank, the title will fallback to `anime`.
* `season`: (optional) Season number. If left blank, will default to 1.
"""

import logging
import pathlib

from airflow.decorators import dag, task
from airflow.exceptions import AirflowFailException
from airflow.models.param import Param
from airflow.utils.dates import days_ago
from settings.dags import DEFAULT_ARGS

DAG_ID = pathlib.Path(__file__).stem

logger = logging.getLogger("airflow.task")


@dag(
    dag_id=DAG_ID,
    schedule=None,
    start_date=days_ago(1),
    catchup=False,
    default_args=DEFAULT_ARGS,
    params={jjj
        "anime": Param(
            type="string",
            title="Anime Title",
            description="Enter the name of the anime.",
        ),
        "title_override": Param(
            None,
            type=["string", "null"],
            title="Title override",
            description="Override value for title.",
        ),
        "season": Param(
            1,
            type="integer",
            minimum=1,
            title="Season",
            description="Season folder to save episodes in (for Plex)",
        ),
    },
    max_active_tasks=3,
    doc_md=__doc__,
)
def run():
    @task
    def search_for_anime(params):
        from anipy_api.provider import LanguageTypeEnum
        from anipy_api.provider.providers import AllAnimeProvider

        anime = params["anime"]
        provider = AllAnimeProvider()

        search_results = provider.get_search(anime)
        # anime_results = [
        #     Anime.from_search_result(provider, r)
        #     for r in search_results
        #     if LanguageTypeEnum.SUB in r.languages
        # ]
        anime_results = [
            {"title": r.name, "id": r.identifier}
            for r in search_results
            if LanguageTypeEnum.SUB in r.languages
        ]

        return anime_results

    @task.branch
    def parse_results(ti):
        results = ti.xcom_pull(task_ids="search_for_anime", key="return_value")

        if len(results) == 0:
            raise AirflowFailException("Failed to find anime")

        if len(results) > 1:
            ti.xcom_push(key="anime_options", value=results)
            return "show_options"

        ti.xcom_push(key="anime_title", value=results[0]["title"])
        return "get_episodes"

    @task
    def show_options(ti):
        options = ti.xcom_pull(task_ids="parse_results", key="anime_options")
        parsed_options = [
            {"id": result["id"], "title": result["title"]} for result in options
        ]

        return parsed_options

    @task(trigger_rule="one_success")
    def get_episodes(params, ti):
        from anipy_api.anime import Anime
        from anipy_api.provider import LanguageTypeEnum
        from anipy_api.provider.providers import AllAnimeProvider
        from rapidfuzz import fuzz

        anime = params["anime"]

        results = ti.xcom_pull(task_ids="search_for_anime", key="return_value")
        results_ = {result["title"]: result for result in results}
        closest_match = max(
            results_.keys(),
            key=lambda title: fuzz.ratio(title, anime),
        )

        provider = AllAnimeProvider()
        closest_anime = Anime(
            provider,
            results_[closest_match]["title"],
            results_[closest_match]["id"],
            set([LanguageTypeEnum.SUB]),
        )

        # get episodes
        episodes = closest_anime.get_episodes(lang=LanguageTypeEnum.SUB)

        ti.xcom_push(key="anime_id", value=closest_anime.identifier)
        ti.xcom_push(key="anime_title", value=closest_anime.name)

        return episodes

    @task(map_index_template="{{ episode }}")
    def download_episode(episode, ti, params, get_episodes_task_id="get_episodes"):
        from pathlib import Path

        from anipy_api.anime import Anime
        from anipy_api.download import Downloader
        from anipy_api.provider import LanguageTypeEnum
        from anipy_api.provider.providers import AllAnimeProvider

        anime_id = ti.xcom_pull(task_ids=get_episodes_task_id, key="anime_id")
        anime_title = ti.xcom_pull(task_ids=get_episodes_task_id, key="anime_title")
        title_override = params["title_override"]
        season = params["season"]
        renamed = title_override or anime_title
        episode_title = f"{renamed}; Season {season}; Episode {str(episode).zfill(2)}"

        provider = AllAnimeProvider()
        anime = Anime(provider, anime_title, anime_id, set([LanguageTypeEnum.SUB]))

        # get stream link
        stream = anime.get_video(episode, LanguageTypeEnum.SUB, preferred_quality=1080)

        downloader = Downloader()
        download_path = downloader.download(
            stream=stream,
            download_path=Path(
                f"/home/airflow/Videos/FastAnime/{renamed}/Season {season}/{episode_title}"
            ),
        )

        return str(download_path)

    show_options = show_options()
    get_episodes = get_episodes()
    download_episodes = download_episode.expand(episode=get_episodes)

    (
        search_for_anime()
        >> parse_results()
        >> (
            show_options,
            get_episodes,
        )
    )
    show_options >> get_episodes >> download_episodes


run()
```
