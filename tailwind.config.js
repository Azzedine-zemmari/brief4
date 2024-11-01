/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'primary' : '#495076',
        'BigTitle':'#44546F',
        'title' : '#172B4D',
        'blure' : '#8489A5',
        'CardBg' : '#f1f2f4'
      },
    },
    backgroundImage:{
      'blackCover' : "url('../image/maxim-berg-3E2xgrlNXq4-unsplash.jpg')",
      'whiteCover' : "url('../image/maxim-berg-ZESbrsLBPPk-unsplash.jpg')"
    }
  },
  plugins: [],
}