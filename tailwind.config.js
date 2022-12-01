const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
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
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      letterSpacing: {
        sm: '-0.4px',
        md: '-0.8px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
