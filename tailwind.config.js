/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF385C',
        'airbnb-dark': '#222222',
        'airbnb-gray': '#717171',
        'airbnb-light-gray': '#DDDDDD',
        'airbnb-bg': '#FFFFFF',
        'airbnb-hover': '#F7F7F7',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
};
