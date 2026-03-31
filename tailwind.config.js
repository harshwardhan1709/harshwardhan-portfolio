/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#FEC700",
        forest: "#02462E",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // You can change this to your preferred font
      }
    },
  },
  plugins: [],
}