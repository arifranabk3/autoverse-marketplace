/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        autoverse: {
          bg: '#0B0D10',
          secondary: '#14181E',
          card: '#1B2028',
          border: '#2A3039',
          accent: '#FF6B00',
          accentHover: '#E55F00',
          textMuted: '#A1A8B3',
          textLight: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
