import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Layout from "../../components/layout";
import Date from "../../components/date";
import ReadTimer from "../../components/read-timer";
import { getPostSlugs, getPostData } from "../../lib/posts";

function TagPill({ children }) {
  return (
    <button
      type="button"
      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 transition-colors duration-1000 ease-in-out hover:bg-secondary-200 dark:text-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700"
    >
      {children}
    </button>
  );
}

export async function getStaticPaths() {
  const paths = getPostSlugs().map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout pageTitle={postData.meta.title}>
      <main className="space-y-6 divide-y-2 divide-gray-200 dark:divide-gray-600">
        <div className="space-y-2">
          <h1 className="text-2xl leading-relaxed font-bold tracking-tight text-gray-800 dark:text-gray-200">
            {postData.meta.title}
          </h1>
          <div className="flex justify-between text-gray-500 dark:text-gray-400">
            <Date dateString={postData.meta.date} />
            <ReadTimer readTime={postData.meta.readTime} />
          </div>
          {postData.meta.tags && postData.meta.tags.length > 0 && (
            <div className="space-x-2">
              {postData.meta.tags.map((e) => (
                <Link key={e} href={`/tags/${e}`}>
                  <a>
                    <TagPill>{e}</TagPill>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* article element below must have "grid grid-cols-1" for mobile responsiveness */}
        <article className="line-numbers grid grid-cols-1 pt-6 prose prose-slate max-w-3xl dark:prose-invert prose-a:text-primary-600 hover:prose-a:text-primary-500 dark:prose-a:text-primary-500 dark:hover:prose-a:text-primary-600">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {postData.content}
          </ReactMarkdown>
        </article>
      </main>
    </Layout>
  );
}
