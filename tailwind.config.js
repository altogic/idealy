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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-multi-theme'),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin')
  ]
};
