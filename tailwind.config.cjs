const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        color_1: "#70367c",
        color_2: "#95cfd5",
        color_3: "#fd7e50",
        black: "#310e3a",
        debug: colors.red[400]
      }
    },

  },
  plugins: [],
}