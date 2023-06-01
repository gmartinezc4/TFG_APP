/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gentium': ['Gentium Book Plus', 'serif'],
        'quicksand': ['Quicksand', 'serif'],
        'PTserif': ['PT Serif', 'serif']
      }
    },
  },
  plugins: [],
}
