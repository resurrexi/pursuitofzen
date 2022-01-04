import Image from "next/image";
import Layout from "../components/layout";
import PostList from "../components/post-list";
import { getAllPosts } from "../lib/posts";

export async function getStaticProps() {
  const { posts } = await getAllPosts();
  return {
    props: {
      // only return first 10 posts
      allPostsData: posts.slice(0, 10),
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout pageTitle="Personal site of Liquan Yang">
      <main className="space-y-6 divide-y-2 divide-gray-200 sm:space-y-8">
        <section className="flex flex-col place-items-center">
          <Image
            src="/profile.jpeg"
            alt="Lee"
            width={144}
            height={144}
            className="rounded-full"
          />
          <h1 className="mt-6 text-2xl tracking-tight font-bold text-gray-800 sm:text-3xl">
            Hi, I&apos;m Liquan Yang
          </h1>
          <p className="mt-4 text-base text-gray-500 leading-relaxed sm:text-lg sm:leading-relaxed">
            I&apos;m a geek, musician, adventurer, and most importantly, a
            lifelong student. I like solving challenging problems and learning
            about technologies that I find interesting. I have an interest in
            machine learning, software development, and most recently, data
            engineering. You can find me on{" "}
            <a
              href="https://stackoverflow.com/users/6245650/scratchnpurr"
              className="text-primary-600 hover:text-primary-500"
            >
              StackOverflow
            </a>{" "}
            where I occasionally help others with their coding problems.
          </p>
        </section>
        <section className="pt-5">
          <PostList>
            {allPostsData.map(({ slug, meta }) => (
              <PostList.Item key={slug} slug={slug} meta={meta} />
            ))}
          </PostList>
        </section>
      </main>
    </Layout>
  );
}
