/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        globalBackground: "#24334a",
      },
      colors: {
        navbarColor: "#0b1c36",
        petOrange: "#ff6d00",
      },
    },
  },
  plugins: [],
};
