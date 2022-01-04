import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../../components/layout";
import Date from "../../components/date";
import ReadTimer from "../../components/read-timer";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();

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
      <main className="space-y-6 divide-y-2 divide-gray-200">
        <div className="space-y-2">
          <h1 className="text-2xl leading-relaxed font-bold tracking-tight text-gray-800">
            {postData.meta.title}
          </h1>
          <div className="flex justify-between text-gray-500">
            <span className="block">
              <Date dateString={postData.meta.date} />
            </span>
            <div>
              <ReadTimer readTime={postData.meta.readTime} />
            </div>
          </div>
          <div className="space-x-2">
            {postData.meta.tags.map((e) => (
              <Link key={e} href={`/tags/${e}`}>
                <a>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 hover:bg-secondary-200"
                  >
                    {e}
                  </button>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <article className="pt-6 line-numbers prose prose-slate prose-lg max-w-none dark:prose-invert prose-a:text-primary-600 hover:prose-a:text-primary-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postData.content}
          </ReactMarkdown>
        </article>
      </main>
    </Layout>
  );
}
