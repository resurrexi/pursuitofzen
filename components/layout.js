import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import { useTheme } from 'next-themes'

export default function Layout({ children, pageTitle }) {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white transition-colors duration-1000 ease-in-out dark:bg-gray-900">
      <Head>
        <title>Pursuit of Zen - {pageTitle}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Personal website of Liquan Yang" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href={resolvedTheme === "light" ? "/themes/prism-one-light.css" : "/themes/prism-one-dark.css"}
          rel="stylesheet"
        />
      </Head>
      <header className="flex-none">
        <nav>
          <div className="max-w-3xl mx-auto px-4 border-b border-gray-200 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <Image src="/android-chrome-192x192.png" alt="logo" width={40} height={40} />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  <Link href="/blog">
                    <a className="inline-flex text-gray-500 items-center text-base font-bold hover:text-primary-500">
                      Blog
                    </a>
                  </Link>
                  <Link href="/works">
                    <a className="inline-flex text-gray-500 items-center text-base font-bold hover:text-primary-500">
                      Works
                    </a>
                  </Link>
                  <Link href="/resume">
                    <a className="inline-flex text-gray-500 items-center text-base font-bold hover:text-primary-500">
                      Resume
                    </a>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:flex sm:space-x-4">
                <Link href="/about">
                  <a className="inline-flex text-gray-500 items-center text-base font-bold hover:text-primary-500">
                    About
                  </a>
                </Link>
                {resolvedTheme === "light" ? (
                  <button
                    type="button"
                    className="group p-1 text-amber-600 focus:outline-none"
                    onClick={() => setTheme("dark")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="group p-1 text-amber-500 focus:outline-none"
                    onClick={() => setTheme("light")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="grow max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <footer className="flex-none">
        <div className="border-t border-gray-200 text-gray-500 max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          &copy; {(new Date()).getFullYear()} Pursuit of Zen
        </div>
      </footer>
    </div>
  )
}
