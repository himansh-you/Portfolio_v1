/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'lilita': ['Lilita One', 'sans-serif'],
      },
      colors: {
        'blue-primary': '#2196f3',
        'blue-dark': '#1976d2', 
        'yellow-cta': '#ffc107',
        'yellow-hover': '#ffb300',
        'pink-blog': '#e91e63',
        'green-social': '#4caf50',
        'linkedin': '#0077b5',
        'github': '#333333', 
        'email': '#ea4335',
        'twitter': '#1da1f2',
      },
    },
  },
  plugins: [],
}