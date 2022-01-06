import { useState, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";

export default function DarkModeToggler() {
  const { resolvedTheme, setTheme } = useTheme();

  // hack for client/server mismatch
  // https://stackoverflow.com/a/56525858/6245650
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <link
          href={
            loaded && resolvedTheme === "light"
              ? "/themes/prism-one-light.css"
              : "/themes/prism-one-dark.css"
          }
          rel="stylesheet"
        />
      </Head>
      {loaded && resolvedTheme === "light" ? (
        <button
          type="button"
          className="group block w-full p-2 flex place-content-center text-amber-600 focus:outline-none"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" />
        </button>
      ) : (
        <button
          type="button"
          className="group block w-full p-2 flex place-content-center text-amber-500 focus:outline-none"
          onClick={() => setTheme("light")}
        >
          <SunIcon className="h-5 w-5 transition duration-300 ease-in-out group-hover:scale-125" />
        </button>
      )}
    </>
  );
}
