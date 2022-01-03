import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout pageTitle={postData.meta.title}>
      <main className="space-y-6 divide-y-2 divide-gray-200">
        <div className="space-y-2">
          <h1 className="text-2xl leading-8 font-bold tracking-tight text-gray-800">
            {postData.meta.title}
          </h1>
          <span className="block text-gray-500">
            <Date dateString={postData.meta.date} />
          </span>
          <div className="space-x-2">
            {postData.meta.tags.map(e => (
              <span
                key={e}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                {e}
              </span>
            )
            )}
          </div>
        </div>
        <article className="pt-6 line-numbers prose prose-slate prose-lg max-w-none dark:prose-invert prose-a:text-primary-600 hover:prose-a:text-primary-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postData.content}
          </ReactMarkdown>
        </article>
      </main>
    </Layout>
  )
}
