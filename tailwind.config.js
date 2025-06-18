/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom green from screenshot
        'teal-green': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Main teal-green color
          600: '#0d9488',
          700: '#0f766e', // The green from your screenshot
          800: '#115e59',
          900: '#134e4a',
        },
        // Enhanced purple palette
        'royal-purple': {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9ddff',
          300: '#d6c1ff',
          400: '#bc9aff',
          500: '#a370f7',
          600: '#9155fd', // Enhanced purple
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Accent coral for contrast
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
        // New gradient combinations
        'hero-gradient': 'linear-gradient(135deg, #0f766e 0%, #9155fd 50%, #ec5f5f 100%)',
        'card-gradient': 'linear-gradient(135deg, #14b8a6 0%, #a370f7 100%)',
        'accent-gradient': 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
    },
  },
  plugins: [],
}