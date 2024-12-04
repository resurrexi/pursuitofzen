import { useState, createContext, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import DarkModeToggler from "./dark-mode-toggler";
import HamburgerMenuIcon from "./icons/hamburger";
import CloseIcon from "./icons/close";
import { joinClasses } from "../lib/utils";

const NavContext = createContext();

function useMenuToggle() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuOpened((prev) => !prev);
  }, [setMenuOpened]);

  return { menuOpened, toggleMenu };
}

function Header({ children }) {
  const { menuOpened, toggleMenu } = useMenuToggle();

  const menuContext = {
    menuOpened,
    toggleMenu,
  };

  return (
    <NavContext.Provider value={menuContext}>
      <header className="flex-none">{children}</header>
    </NavContext.Provider>
  );
}

function NavBar({ children }) {
  return <nav>{children}</nav>;
}

function NavMenu({ children }) {
  const { menuOpened, toggleMenu } = useContext(NavContext);

  return (
    <div
      className={joinClasses(
        menuOpened && "min-h-screen",
        "fixed inset-x-0 top-0 z-50 mx-auto flex max-w-3xl flex-col border-b border-gray-200 px-4 backdrop-blur-md dark:border-gray-600 sm:min-h-fit sm:px-6 lg:px-8",
      )}
    >
      <div className="flex h-16 flex-none justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center sm:mr-6">
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo.svg" alt="logo" width={40} height={40} />
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {children}
          </div>
        </div>
        <div className="hidden items-center sm:flex">
          <DarkModeToggler />
        </div>
        <div className="flex items-center sm:hidden">
          <span className="sr-only">Open main menu</span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            {menuOpened ? <CloseIcon /> : <HamburgerMenuIcon />}
          </button>
        </div>
      </div>
      {/* mobile menu
          4rem in the height calculation corresponds to h-16 that is set by the navbar
        */}
      <div
        className={joinClasses(
          menuOpened ? "flex flex-col" : "hidden",
          "flex-auto sm:hidden",
        )}
        id="mobile-menu"
      >
        <div className="flex h-full flex-auto flex-col justify-between py-6">
          <div className="space-y-1 text-center">{children}</div>
          <div className="space-y-1">
            <DarkModeToggler />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavMenuItem({ link, label }) {
  return (
    <Link
      href={link}
      className="block items-center py-2 text-lg font-semibold text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-600 sm:inline-flex"
    >
      {label}
    </Link>
  );
}

Header.Nav = NavBar;
Header.NavMenu = NavMenu;
Header.NavMenuItem = NavMenuItem;

export default Header;
