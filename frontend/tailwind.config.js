/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: ['./index.html', "./src/**/*.{js,ts,tsx,jsx,html}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "7rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      }

    },scrollbar: {
      hideArrows: {
        '&::-webkit-scrollbar-button': {
          display: 'none',
        },
      },
    }

  },
  plugins: [tailwindScrollbar],
}