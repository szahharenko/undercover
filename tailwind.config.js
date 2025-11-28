/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC', // Warm Neutrals
        beige: '#F5F5DC', // Alias for cream as per description
        coffee: '#6F4E37', // Soft Browns
        'sage-green': '#8A9A5B', // Sage Green accents
        charcoal: '#36454F', // Charcoal for text
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
