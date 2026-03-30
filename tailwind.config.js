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
        shake: {
          "0%, 100%": {transform: "translateX(0)"},
          "20%": {transform: "translateX(-4px)"},
          "40%": {transform: "translateX(4px)"},
          "60%": {transform: "translateX(-4px)"},
          "80%": {transform: "translateX(4px)"},
        },
        fadeIn: {
          from: {opacity: 0, transform: "scale(0.95)"},
          to: {opacity: 0, transform: "scale(1)"},
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
