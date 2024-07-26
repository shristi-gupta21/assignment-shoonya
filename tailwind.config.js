/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-1000": "rgb(27, 50, 82)",
        "beige": "rgb(224, 217, 207)",
      },
      screens: {
        "1.5xl": "1440px",
      },
    },
  },
  plugins: [],
};
