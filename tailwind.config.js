/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      content: {
        'copyIconDark': 'url("../public/copy-dark.svg")',
        'copyIconLight': 'url("../public/copy-light.svg")',
      },
      keyframes: {
        copied: {
          "0%": { bottom:".5em", opacity:"1" },
          "100%": { bottom:"1.5em", opacity:"0" }
        }
      },
      animation: {
        copied: "copied 400ms ease-out forwards"
      },
      screens: {
        "3xl": "1680px",
      },
    },
  },
  plugins: [],
};
