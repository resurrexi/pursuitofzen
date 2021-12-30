const colors = require("tailwindcss/colors")

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
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
}
