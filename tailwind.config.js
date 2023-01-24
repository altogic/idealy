const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    themeVariants: ['dark', 'purple'],
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px',
      '4xl': '1681px'
    },
    extend: {
      colors: {
        aa: {
          50: '#F2F2F3',
          100: '#E7E8E8',
          200: '#CDCECF',
          300: '#AFB0B2',
          400: '#8A8C90',
          500: '#575B62',
          600: '#29323E',
          700: '#252C37',
          800: '#202630',
          900: '#1A1F27',
          1000: '#12161C'
        },
        pt: {
          50: '#F5F4F9',
          100: '#ECEBF5',
          200: '#D7D6EA',
          300: '#C0BDDF',
          400: '#A6A2D3',
          500: '#8780C6',
          600: '#6F67B7',
          700: '#635CA4',
          800: '#56508E',
          900: '#464174',
          1000: '#312E52'
        }
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      letterSpacing: {
        sm: '-0.4px',
        md: '-0.8px'
      }
    }
  },
  safelist: [
    'dark:text-red-400',
    'dark:text-blue-400',
    'dark:text-yellow-400',
    'dark:text-green-400',
    'dark:text-pink-400',
    'dark:hover:text-red-400',
    'dark:hover:text-blue-400',
    'dark:hover:text-yellow-400',
    'dark:hover:text-green-400',
    'dark:hover:text-pink-400',
    'dark:hover:bg-red-700',
    'dark:hover:bg-blue-700',
    'dark:hover:bg-yellow-700',
    'dark:hover:bg-green-700',
    'dark:hover:bg-pink-700',
    'purple:hover:bg-red-700',
    'purple:hover:bg-blue-700',
    'purple:hover:bg-yellow-700',
    'purple:hover:bg-green-700',
    'purple:hover:bg-pink-700',
    'hover:bg-red-100',
    'hover:bg-blue-100',
    'hover:bg-yellow-100',
    'hover:bg-green-100',
    'hover:bg-pink-100',
    'hover:text-red-800',
    'hover:text-blue-800',
    'hover:text-yellow-800',
    'hover:text-green-800',
    'hover:text-pink-800',
    'purple:text-red-400',
    'purple:text-blue-400',
    'purple:text-yellow-400',
    'purple:text-green-400',
    'purple:text-pink-400',
    'bg-red-50',
    'bg-blue-50',
    'bg-yellow-50',
    'bg-green-50',
    'bg-pink-50',
    'text-red-500',
    'text-blue-500',
    'text-yellow-500',
    'text-green-500',
    'text-pink-500'
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-multi-theme'),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin')
  ]
};
