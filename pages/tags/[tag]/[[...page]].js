import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import PostList from "../../../components/post-list";
import { getAllPosts } from "../../../lib/posts";

const PAGE_SIZE = 10;

export async function getStaticPaths() {
  const tagPosts = await getAllPosts(true);
  const tagPages = tagPosts.map((tagPost) => {
    // determine pages required for tag
    const pages = Math.ceil(tagPost.total / PAGE_SIZE);

    // build page number array
    const pageIterator = Array.from(Array(pages).keys()).map((i) => i + 1);

    // generate paths for the tag/page combinations
    const tagPagePaths = pageIterator.map((i) => {
      return {
        params: {
          tag: tagPost.tag,
          page: [i.toString()],
        },
      };
    });

    // generate paths for tag only
    const tagPath = {
      params: {
        tag: tagPost.tag,
        page: [],
      },
    };

    return [...tagPagePaths].concat([tagPath]);
  });

  return {
    paths: tagPages.flat(),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let resolvedPage = 1;

  // getAllPosts will return array [{tag, posts, total}]
  // since it's fetching by tags
  const allPosts = await getAllPosts(true);

  const tagData = allPosts.find((tagPost) => tagPost.tag === params.tag);

  if (params.page && params.page.length > 0) {
    resolvedPage = params.page[0];
  }

  const subsetPosts = tagData.posts.slice(
    (resolvedPage - 1) * PAGE_SIZE,
    resolvedPage * PAGE_SIZE,
  );

  return {
    props: {
      tag: params.tag,
      posts: subsetPosts,
      // return 0 for currentPage if page argument is invalid
      currentPage: subsetPosts.length === 0 ? 0 : parseInt(resolvedPage),
      totalPages: Math.ceil(tagData.total / PAGE_SIZE),
    },
    revalidate: 10,
  };
}

export default function TagPage({ tag, posts, currentPage, totalPages }) {
  const router = useRouter();

  useEffect(() => {
    // if currentPage is 0, then page param is invalid
    if (currentPage === 0) {
      router.replace("/tags/[tag]", `/tags/${tag}`);
    }
  }, [currentPage, tag, router]);

  return (
    <Layout pageTitle={`Blog posts by ${tag}`}>
      <main className="block w-full">
        {posts && posts.length > 0 && (
          <PostList>
            {posts.map(({ slug, meta }) => (
              <PostList.Item key={slug} slug={slug} meta={meta} />
            ))}
          </PostList>
        )}
      </main>
    </Layout>
  );
}
