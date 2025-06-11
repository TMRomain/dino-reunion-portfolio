/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'volcanic-orange': {
          50: '#fef7ed',
          100: '#fdedd4',
          200: '#f9d5a8',
          300: '#f5b571',
          400: '#ef8d38',
          500: '#ea6e18',
          600: '#db530e',
          700: '#b53b0e',
          800: '#902f12',
          900: '#752812',
        },
        'forest-green': {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce4cb',
          300: '#8bcfa8',
          400: '#54b47f',
          500: '#2f9960',
          600: '#227a4b',
          700: '#1d623d',
          800: '#194f32',
          900: '#15412a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
