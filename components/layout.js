import { useEffect } from 'react'
import Head from 'next/head'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/plugins/line-numbers/prism-line-numbers'

export default function Layout({ children, pageTitle }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Pursuit of Zen - {pageTitle}</title>
        <meta name="description" content="Personal website of Liquan Yang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grow bg-white max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
      <footer className="flex-none">
        <div className="bg-white border-t border-gray-200 text-gray-500 max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          &copy; {(new Date()).getFullYear()} Pursuit of Zen
        </div>
      </footer>
    </div>
  )
}
