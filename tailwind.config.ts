import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F3EA",
        parchment: "#FFFDF7",
        forest: "#103B6D",
        moss: "#2F8A55",
        bana: "#1864A3",
        ink: "#102033",
        clay: "#D84735",
        sand: "#F4C542",
        logoBlue: "#1864A3",
        logoGreen: "#2F8A55",
        logoRed: "#D84735",
        logoYellow: "#F4C542"
      },
      fontFamily: {
        display: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(18, 61, 52, 0.12)",
        lift: "0 18px 45px rgba(23, 35, 31, 0.16)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
} satisfies Config;
