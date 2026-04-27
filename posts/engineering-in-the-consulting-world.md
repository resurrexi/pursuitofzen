---
title: "Engineering in the consulting world"
date: "2026-04-26"
tags: ["ai", "consulting"]
summary: "Tidbits on how to onboard quickly in today's consulting world"
---

I recently switched to a role helping a healthcare client migrate to GCP. When I joined the project, some of the preliminary research work had already been completed. In order to quickly familiarize myself with the project, I had to rely on the use of LLMs to help me in the discovery and design process. In the consulting world, LLMs can prove to be particularly useful as existing engineers roll off the project and new ones get rolled onto the project. In the case of this healthcare client, they are looking to migrate some of their AWS stack to GCP.

## Skills to the rescue

Since the discovery phase of the project consisted of comparing AWS service with the GCP counterpart, I wrote a skill for the LLM to execute it everytime when such a need to compare Cloud A Service vs. Cloud B Service. This skill allows the LLM to pull the docs from both cloud providers, build out a feature comparison matrix, and identify risks with priorities. This enabled my team to identify gaps early so that we could decide on how to redesign for the new stack and what would need to be refactored. Creating the skill required an initial guidance phase using 2 actual services that needed to be compared. I also went back-and-forth with the agent on how I wanted the output, which included the matrix and risk analysis. This conversation laid the groundwork for the building of the skill, which was simply prompting the LLM to convert what we did in the session to a skill with parameters.

## Embeddings on codebase

Another useful tool for onboarding to a project's codebase has been [cocoindex-code](https://github.com/cocoindex-io/cocoindex-code). Similar to [GitNexus](https://github.com/abhigyanpatwari/GitNexus), cocoindex indexes the codebase using either a local embedding model or a model available in LiteLLM. Once the codebase is indexed, use the provided `ccc` skill to ask the coding agent about the code. Cocoindex will continuously track the project repository for changes and incrementally index changed or new files.
