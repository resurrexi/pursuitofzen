import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export default function Home() {
export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>Pursuit of Zen - Personal website of Liquan Yang</title>
        <meta name="description" content="Personal website of Liquan Yang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="space-y-8 sm:space-y-12">
        <section className="flex flex-col place-items-center">
          <Image src="/profile.jpeg" alt="Lee" width={144} height={144} className="rounded-full" />
          <h1 className="mt-6 text-2xl tracking-tight font-bold text-gray-800 sm:text-3xl">
            Hi, I'm Liquan Yang
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-500 leading-relaxed sm:text-xl sm:leading-relaxed">
            I'm a geek, musician, adventurer, and most importantly, a lifelong student.
            I like solving challenging problems and learning about technologies that I find interesting.
            I have an interest in machine learning, software development, and most recently, data engineering.
            You can find me on <a href="https://stackoverflow.com/users/6245650/scratchnpurr" className="text-primary-600 hover:text-primary-500">StackOverflow</a> where
            I occasionally help others with their coding problems.
          </p>
        </section>
        <section>
          <a href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </section>
      </main>
      <footer>
      </footer>
    </Layout>
  )
}
