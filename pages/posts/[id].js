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
          <div className="flex justify-between text-gray-500">
            <span className="block">
              <Date dateString={postData.meta.date} />
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {postData.readTime} min
            </span>
          </div>
          <div className="space-x-2">
            {postData.meta.tags.map(e => (
              <span
                key={e}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 hover:bg-secondary-200">
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
