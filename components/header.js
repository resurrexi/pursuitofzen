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
            <div className="flex-shrink-0 flex items-center sm:mr-6">
              <Link href="/">
                <a>
                  <Image src="/logo.svg" alt="logo" width={40} height={40} />
                </a>
              </Link>
            </div>
            {children}
          </div>
          <div className="hidden sm:flex">
            <DarkModeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavMenu({ children }) {
  return <div className="hidden sm:flex sm:space-x-4">{children}</div>;
}

function NavMenuItem({ link, label }) {
  return (
    <Link href={link}>
      <a className="inline-flex text-gray-500 items-center text-base font-bold hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-600">
        {label}
      </a>
    </Link>
  );
}

Header.Nav = NavBar;
Header.NavMenu = NavMenu;
Header.NavMenuItem = NavMenuItem;

export default Header;