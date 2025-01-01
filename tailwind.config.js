/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Heading1: "#2E865F",
        Heading2: "#5C9456",
        Text1: "#449999",
        Text2: "#666666",
        Text3: "#886666",
      },
      gradientColorStops: {
        sunrise: ["#FFC107", "#FF9800"],
        ocean: ["#45AA0E6", "#24A2D3"],
      },
      keyframes: {
        moveText: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'move-text': 'moveText 20s linear infinite',
      },
    },
  },
  plugins: [],
};
