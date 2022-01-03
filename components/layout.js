import Head from 'next/head'
import Script from 'next/script'

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>Pursuit of Zen - {pageTitle}</title>
        <meta name="description" content="Personal website of Liquan Yang" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/prismjs@1.25.0/themes/prism-tomorrow.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/prismjs@1.25.0/plugins/line-numbers/prism-line-numbers.css"
          rel="stylesheet"
        />
      </Head>
      <div className="relative bg-white max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
      <Script src="https://unpkg.com/prismjs@1.25.0/components/prism-core.min.js"></Script>
      <Script src="https://unpkg.com/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js"></Script>
      <Script src="https://unpkg.com/prismjs@1.25.0/plugins/line-numbers/prism-line-numbers.min.js"></Script>
    </>
  )
}
