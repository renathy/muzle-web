const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['active'],
      backgroundColor: [
        'hover',
        'focus',
        'active',
        'odd',
      ],
      display: ['responsive'],
      textColor: [
        'focus-within',
        'hover',
        'active',
      ],
      placeholderColor: ['focus'],
      borderColor: ['focus', 'hover', 'active'],
      boxShadow: ['focus',],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
