const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.cyan,
      secondary: colors.violet,
      gray: colors.slate,
      neutral: colors.neutral,
      white: colors.white,
      amber: colors.amber,
    },
    extend: {
      keyframes: {
        revspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
