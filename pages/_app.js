import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
