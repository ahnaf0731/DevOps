/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E36414",   // your orange
        secondary: "#0F4C5C", // your deep teal
        accent: "#5F0F40",    // your plum
      },
    },
  },
  plugins: [],
};
