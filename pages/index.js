import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Pursuit of Zen - Personal website of Liquan Yang</title>
        <meta name="description" content="Personal website of Liquan Yang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="space-y-6 divide-y-2 divide-gray-200 sm:space-y-8">
        <section className="flex flex-col place-items-center">
          <Image src="/profile.jpeg" alt="Lee" width={144} height={144} className="rounded-full" />
          <h1 className="mt-6 text-2xl tracking-tight font-bold text-gray-800 sm:text-3xl">
            Hi, I'm Liquan Yang
          </h1>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed sm:text-xl sm:leading-relaxed">
            I'm a geek, musician, adventurer, and most importantly, a lifelong student.
            I like solving challenging problems and learning about technologies that I find interesting.
            I have an interest in machine learning, software development, and most recently, data engineering.
            You can find me on <a href="https://stackoverflow.com/users/6245650/scratchnpurr" className="text-primary-600 hover:text-primary-500">StackOverflow</a> where
            I occasionally help others with their coding problems.
          </p>
        </section>
        <section className="mt-8 pt-8 grid gap-16 sm:pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          <ul>
            {allPostsData.map(({ id, meta }) => (
              <li key={id}>
                {meta.title}
                <br />
                {meta.date}
                <div className="space-x-2">
                  {meta.tags.map(e => <span key={e}>{e}</span>)}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
      </footer>
    </Layout>
  )
}
