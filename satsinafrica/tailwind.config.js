/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], // Texte normal
        title: ['Fira Sans', 'sans-serif'], // Titres
      },
      screens: {
        'msm': '767px',
        'xsm': '460px',
        'xxsm': '450px',
      },
    },
  },
  plugins: [],
}

