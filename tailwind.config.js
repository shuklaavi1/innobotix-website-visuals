/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'neon-green': '#00ff88',
        'neon-blue': '#00b4ff',
        'dark-bg': '#0d0d0d',
        'dark-surface': '#1a1a1a',
      },
      animation: {
        'glow-text': 'glow-text 3s ease-in-out infinite alternate',
        'slideIn': 'slideIn 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        'glow-text': {
          '0%': { textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
          '100%': { textShadow: '0 0 30px rgba(0, 255, 136, 0.6)' }
        },
        'slideIn': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'shake': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}