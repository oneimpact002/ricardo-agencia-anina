/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:   "#131B54",
          blue:   "#253FF6",
          yellow: "#E8F871",
          dark:   "#0B0C0C",
          darker: "#111111",
        },
      },
      fontFamily: {
        sans: ["Red Hat Display", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
