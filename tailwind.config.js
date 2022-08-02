/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'secondary-color': '#ffeba7',
    },
  },
  plugins: [require("daisyui")],
}