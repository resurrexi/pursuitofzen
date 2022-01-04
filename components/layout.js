import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { useTheme } from "next-themes";
import SunIcon from "../components/icons/sun";
import MoonIcon from "../components/icons/moon";

export default function Layout({ children, pageTitle }) {
  const { resolvedTheme, setTheme } = useTheme();

  // hack for client/server mismatch
  // https://stackoverflow.com/a/56525858/6245650
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

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
        <link
          href={
            loaded && resolvedTheme === "light"
              ? "/themes/prism-one-light.css"
              : "/themes/prism-one-dark.css"
          }
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
                      <Image
                        src="/logo.svg"
                        alt="logo"
                        width={40}
                        height={40}
                      />
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
                {loaded && resolvedTheme === "light" ? (
                  <button
                    type="button"
                    className="group p-1 text-amber-600 focus:outline-none"
                    onClick={() => setTheme("dark")}
                  >
                    <MoonIcon className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="group p-1 text-amber-500 focus:outline-none"
                    onClick={() => setTheme("light")}
                  >
                    <SunIcon className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
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
