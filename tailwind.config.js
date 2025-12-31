/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'charcoal': '#1A1B26',
        'slate': '#3B3F51',
        'warm-grey': '#A8B2D1',
        'ivory': '#E6EDF3',
        'steel-blue': '#6B9BD1',
        'warm-brown': '#B8956A',
      },
    },
  },
  plugins: [],
}
