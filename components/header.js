import { useState, createContext, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggler from "./dark-mode-toggler";
import HamburgerMenuIcon from "./icons/hamburger";
import CloseIcon from "./icons/close";

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
      className={`${
        menuOpened ? "min-h-screen" : ""
      } z-50 flex flex-col fixed top-0 inset-x-0 backdrop-blur-md max-w-3xl mx-auto px-4 border-b border-gray-200 sm:px-6 lg:px-8 sm:min-h-fit dark:border-gray-600`}
    >
      <div className="flex flex-none justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center sm:mr-6">
            <Link href="/">
              <a className="inline-flex items-center">
                <Image src="/logo.svg" alt="logo" width={40} height={40} />
              </a>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {children}
          </div>
        </div>
        <div className="flex items-center hidden sm:flex">
          <DarkModeToggler />
        </div>
        <div className="flex items-center sm:hidden">
          <span className="sr-only">Open main menu</span>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
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
        className={`${
          menuOpened ? "flex flex-col" : "hidden"
        } flex-auto sm:hidden`}
        id="mobile-menu"
      >
        <div className="py-6 block h-full flex flex-auto flex-col justify-between">
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
    <Link href={link}>
      <a className="block py-2 text-gray-500 items-center font-semibold text-lg sm:inline-flex hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-600">
        {label}
      </a>
    </Link>
  );
}

Header.Nav = NavBar;
Header.NavMenu = NavMenu;
Header.NavMenuItem = NavMenuItem;

export default Header;
