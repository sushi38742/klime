/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Sora', 'sans-serif'],
      },
      colors: {
        accent: '#2B5BFF',
        offwhite: '#F0F2F7',
        dark: '#0A0F1E',
      },
    },
  },
  plugins: [],
}

