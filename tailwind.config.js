/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0e1217",
        cardDark: "#1c1f26",
        textSmDark: "#a8b3cf",
        lightBg: "#f3f3f3",
        textSmLight: "#8b8b8b",
      },
      container: {
        center: "true",
        padding: "2rem",
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
};
