import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import Header from "./header";
import DarkModeToggler from "./dark-mode-toggler";

export default function Layout({ children, pageTitle }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white transition-colors duration-1000 ease-in-out dark:bg-neutral-900">
      <Head>
        <title>Pursuit of Zen - {pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Personal website of Liquan Yang" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header>
        <Header.Nav />
      </Header>
      <div className="flex-auto max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <footer className="flex-none">
        <div className="border-t border-gray-200 text-gray-500 max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Pursuit of Zen
        </div>
      </footer>
    </div>
  );
}
