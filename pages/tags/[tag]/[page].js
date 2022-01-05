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

    // generate paths for the tag
    const paths = pageIterator.map((i) => {
      return {
        params: {
          tag: tagPost.tag,
          page: i.toString(),
        },
      };
    });

    return paths;
  });

  return {
    paths: tagPages.flat(),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { tag, page } = params;
  const allPosts = await getAllPosts(true);
  const tagData = allPosts.find((tagPost) => tagPost.tag === tag);

  return {
    props: {
      tag,
      posts: tagData.posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
      page: parseInt(page),
      total: tagData.total,
    },
  };
}

export default function TagPage({ tag, posts, page, total }) {
  return (
    <Layout pageTitle={`Browse by ${tag}`}>
      <main>
        <PostList>
          {posts.map(({ slug, meta }) => (
            <PostList.Item key={slug} slug={slug} meta={meta} />
          ))}
        </PostList>
      </main>
    </Layout>
  );
}
