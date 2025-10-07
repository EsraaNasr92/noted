import fs from "fs";

// Load JSON file
const tokens = JSON.parse(fs.readFileSync("./src/styles/tokens.json", "utf-8"));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
  },
  plugins: [],
};
