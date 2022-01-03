import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  return (
    <Layout pageTitle="Personal site of Liquan Yang">
      <main className="space-y-6 divide-y-2 divide-gray-200 sm:space-y-8">
        <section className="flex flex-col place-items-center">
          <Image src="/profile.jpeg" alt="Lee" width={144} height={144} className="rounded-full" />
          <h1 className="mt-6 text-2xl tracking-tight font-bold text-gray-800 sm:text-3xl">
            Hi, I&apos;m Liquan Yang
          </h1>
          <p className="mt-4 text-base text-gray-500 leading-relaxed sm:text-lg sm:leading-relaxed">
            I&apos;m a geek, musician, adventurer, and most importantly, a lifelong student.
            I like solving challenging problems and learning about technologies that I find interesting.
            I have an interest in machine learning, software development, and most recently, data engineering.
            You can find me on <a href="https://stackoverflow.com/users/6245650/scratchnpurr" className="text-primary-600 hover:text-primary-500">StackOverflow</a> where
            I occasionally help others with their coding problems.
          </p>
        </section>
        <section className="pt-2">
          <ul className="px-2">
            {allPostsData.map(({ id, meta }) => (
              <li key={id}
                className="group flex items-center py-8 cursor-pointer"
                onClick={() => router.push(`/posts/${id}`)}>
                <div className="w-full">
                  <div className="flex justify-between">
                    <span className="block text-lg font-bold text-gray-700 transition duration-300 ease-in-out sm:text-xl group-hover:text-primary-500 group-hover:translate-x-2">
                      {meta.title}
                    </span>
                    <span className="flex items-center text-base text-gray-500 transition duration-300 ease-in-out sm:text-transparent group-hover:text-gray-500 group-hover:-translate-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {meta.readTime} min
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="block text-base text-gray-500 transition duration-300 delay-100 ease-in-out group-hover:translate-x-2">
                      {meta.date}
                    </span>
                    <div className="text-sm space-x-1 text-gray-500 transition duration-300 delay-100 ease-in-out sm:text-transparent group-hover:text-secondary-500 group-hover:-translate-x-2">
                      {meta.tags.map(e => (
                        <Link key={e} href={`/tags/${e}`}>
                          <a className="hover:text-secondary-600 hover:underline">
                            #{e}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  )
}
