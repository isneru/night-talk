/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.tsx"],
  theme: {
    extend: {
      animation: {
        scroll: "scroll 5s linear infinite"
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(150%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-150%)" }
        }
      },
      colors: {
        white: "#FFFFFF",
        mainbg: "#121214",
        neon: {
          yellow: "#FAEA48",
          pink: "#F637EC",
          blue: "#0096FF"
        }
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
}
