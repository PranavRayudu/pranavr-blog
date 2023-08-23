// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(--font-sans-serif)`, ...fontFamily.sans],
        serif: [`var(--font-serif)`, ...fontFamily.serif],
      },
      colors: {
        primary: colors.rose,
        gray: colors.stone,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              color: theme('colors.primary.600'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3': {
              fontFamily: [`var(--font-serif)`],
            },
            code: {
              color: theme('colors.indigo.600'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.500') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.indigo.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('./plugins/glow'),
    require('./plugins/text-effects'),
    require('./plugins/raised'),
  ],
}
