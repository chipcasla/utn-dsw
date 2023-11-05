/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'fakegold': {  DEFAULT: '#F6A523',  50: '#FEF7E9',  100: '#FDEED3',  200: '#FBDDA7',  300: '#F9CB7B',  400: '#F8B84F',  500: '#F6A523',  600: '#D78709',  700: '#A26407',  800: '#804D00',  900: '#422700',  950: '#1B1001'},},
      }
  },
  plugins: [
        require('flowbite/plugin')
    ],
}

