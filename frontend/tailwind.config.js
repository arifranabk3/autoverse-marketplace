/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        autoverse: {
          navy: '#101D2D',          // Deep Navy primary dark
          navySecondary: '#14243A', // Secondary Navy
          surfaceDark: '#1D2D40',   // Dark card surface
          surfaceDarkElevated: '#26384D', // Elevated dark surface
          bgLight: '#F5F7FA',       // Light background
          cardLight: '#FFFFFF',     // Pure White card
          orange: '#F36B32',        // Brand Orange
          orangeHover: '#E85B25',   // Brand Orange Hover
          textDark: '#14243A',      // Main dark text
          textMuted: '#475569',     // Slate body text
          textLight: '#FFFFFF',     // White text for dark surfaces
          textLightSecondary: '#CBD5E1', // Faded light text
          borderLight: '#DCE3EC',   // Light border
          borderDark: '#34465B',    // Dark border
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(16, 29, 45, 0.05), 0 4px 16px -2px rgba(16, 29, 45, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(16, 29, 45, 0.12), 0 4px 12px -2px rgba(16, 29, 45, 0.06)',
        'dark-card': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'floating': '0 20px 45px -10px rgba(16, 29, 45, 0.2)',
      }
    },
  },
  plugins: [],
}
