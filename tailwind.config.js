/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}', // Update this path to match your project's structure
    './components/**/*.{js,jsx,ts,tsx}', // Include other relevant directories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
