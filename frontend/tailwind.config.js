/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0ff",
          100: "#e6e1ff",
          500: "#6c4bf4",
          600: "#5a37e8",
          700: "#4a29c9",
        },
      },
    },
  },
  plugins: [],
};
