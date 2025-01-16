/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "drop-bounce": "drop 1s ease-out, bounce 0.6s ease-out",
      },
      keyframes: {
        drop: {
          "0%": {transform: "translateY(-100%)"},
          "100%": {transform: "translateY(0)"},
        },
        bounce: {
          "0%, 100%": {transform: "translateY(0)"},
          "50%": {transform: "translateY(-20%)"},
        },
      },
    },
  },
  plugins: [],
};
