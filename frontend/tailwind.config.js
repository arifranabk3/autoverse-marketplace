/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        autoverse: {
          bg: '#F5F7FA',            // Main background
          card: '#FFFFFF',          // Card background
          secondary: '#F0F4F8',     // Subtle backgrounds
          border: '#E8EDF3',        // Borders
          primary: '#14243A',       // Primary text
          textMuted: '#64748B',     // Secondary text
          accent: '#F36B32',        // Brand accent
          accentHover: '#DE561D',   // Brand accent hover
          dark: '#0B1524',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(20, 36, 58, 0.06), 0 4px 20px -2px rgba(20, 36, 58, 0.04)',
        'card-hover': '0 12px 32px -4px rgba(20, 36, 58, 0.12), 0 4px 16px -2px rgba(20, 36, 58, 0.06)',
        'elevated': '0 20px 40px -8px rgba(20, 36, 58, 0.14)',
      }
    },
  },
  plugins: [],
}
