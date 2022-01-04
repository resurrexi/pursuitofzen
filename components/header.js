import Link from "next/link";
import Image from "next/image";
import DarkModeToggler from "./dark-mode-toggler";

function Header({ children }) {
  return <header className="flex-none">{children}</header>;
}

function NavBar({ children }) {
  return (
    <nav>
      <div className="max-w-3xl mx-auto px-4 border-b border-gray-200 sm:px-6 lg:px-8 dark:border-gray-600">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a>
                  <Image src="/logo.svg" alt="logo" width={40} height={40} />
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
            <DarkModeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.Nav = NavBar;

export default Header;
