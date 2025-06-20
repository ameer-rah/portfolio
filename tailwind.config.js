/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Enhanced teal-green for dark theme
        'teal-green': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Enhanced purple palette for dark theme
        'royal-purple': {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9ddff',
          300: '#d6c1ff',
          400: '#bc9aff',
          500: '#a370f7',
          600: '#9155fd',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Accent coral for dark theme
        'coral': {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fdd8d8',
          300: '#fab6b6',
          400: '#f58989',
          500: '#ec5f5f',
          600: '#d84040',
          700: '#b53333',
          800: '#962d2d',
          900: '#7c2b2b',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(145, 85, 253, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}