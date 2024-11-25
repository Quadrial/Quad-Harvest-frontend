/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        Heading1: "#2E865F",
        Heading2: "#5C9456",
        Text1: "#449999",
        Text2: "#666666",
        Text3: "#886666",

        gradient:{
          sunrise:["#FFC107", "#FF9800"],
          ocean:["#45AA0E6", "#24A2D3"]
        }

      }
    },
  },
  plugins: [],
}