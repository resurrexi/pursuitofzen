import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import PostList from "../components/post-list";
import { getAllPosts } from "../lib/posts";

const PAGE_SIZE = 5;

export async function getStaticProps() {
  const { posts, total } = await getAllPosts();
  return {
    props: {
      // only return first `PAGE_SIZE` posts
      posts: posts.slice(0, PAGE_SIZE),
      total,
    },
  };
}

export default function Home({ posts, total }) {
  return (
    <Layout pageTitle="Personal site of Liquan Yang">
      <main className="space-y-6 divide-y-2 divide-gray-200 dark:divide-gray-600 sm:space-y-8">
        <section className="flex flex-col place-content-center">
          <div className="hidden text-center sm:block">
            <Image
              src="/profile.jpeg"
              alt="Lee"
              width={128}
              height={128}
              className="m-auto rounded-full"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Hi, I&apos;m Liquan Yang
            </h1>
          </div>
          <div className="flex items-center sm:hidden">
            <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
              Hi, I&apos;m Liquan Yang
            </h1>
          </div>
          <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-400 sm:text-lg sm:leading-relaxed">
            I&apos;m a geek, musician, adventurer, and lifelong student. I like
            solving challenging problems and reading on how others tackle the
            same problems. I have an interest in machine learning and software
            engineering. You can find me on{" "}
            <a
              href="https://stackoverflow.com/users/6245650/scratchnpurr"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-600"
            >
              StackOverflow
            </a>{" "}
            where I occasionally help others with their coding problems.
          </p>
        </section>
        <section className="pt-5">
          <PostList>
            {posts.map(({ slug, meta }) => (
              <PostList.Item key={slug} slug={slug} meta={meta} />
            ))}
          </PostList>
          {total > PAGE_SIZE && (
            <div className="mt-8 flex w-full justify-center">
              <Link
                href="/blog"
                className="text-base font-medium text-primary-600 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-600"
              >
                View more
              </Link>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
