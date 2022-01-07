import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PostList from "../../components/post-list";
import { getAllPosts } from "../../lib/posts";

const PAGE_SIZE = 10;

export async function getStaticPaths() {
  const allPosts = await getAllPosts();

  // determine number of pages
  const pages = Math.ceil(allPosts.total / PAGE_SIZE);

  // build paths
  const paths = Array.from(Array(pages).keys()).map((i) => {
    return {
      params: {
        page: [(i + 1).toString()],
      },
    };
  });

  // attach blank path to paths,
  // in case no page param is passed in the URL
  paths.push({
    params: {
      page: [],
    },
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let resolvedPage = 1;

  // getAllPosts will return {posts, total}
  // since it's not fetching by tags
  const { posts, total } = await getAllPosts();

  if (params.page && params.page.length > 0) {
    resolvedPage = params.page[0];
  }

  const subsetPosts = posts.slice(
    (resolvedPage - 1) * PAGE_SIZE,
    resolvedPage * PAGE_SIZE,
  );

  return {
    props: {
      posts: subsetPosts,
      // return 0 for currentPage if page argument is invalid,
      // e.g, page value > total pages or not numeric
      currentPage: subsetPosts.length === 0 ? 0 : parseInt(resolvedPage),
      totalPages: Math.ceil(total / PAGE_SIZE),
    },
    revalidate: 10,
  };
}

export default function BlogPage({ posts, currentPage, totalPages }) {
  const router = useRouter();

  useEffect(() => {
    // if currentPage is 0, then page param is invalid
    if (currentPage === 0) {
      router.replace("/blog");
    }
  }, [currentPage, router]);

  return (
    <Layout pageTitle="Blog posts">
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
