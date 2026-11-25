/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parakh: {
          red: '#e01b24',
          'red-dark': '#b7141b',
          'red-light': '#fdf2f2',
          purple: '#6322cf',
          'purple-light': '#f3eefb',
          dark: '#212529',
          body: '#333333',
          gray: '#555555',
          'gray-light': '#fafafa',
          'gray-border': '#eaeaea',
          border: '#e2e8f0',
          footer: '#1a1d20'
        }
      },
      fontFamily: {
        devanagari: [
          'Segoe UI',
          'Noto Sans Devanagari',
          'Roboto',
          'Arial',
          '-apple-system',
          'sans-serif'
        ]
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        modal: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}
