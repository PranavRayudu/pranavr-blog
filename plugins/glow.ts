import { generateShadow, rgbWithOpacity } from './utils'

const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

export default plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      'glow-xs': (value) => ({
        boxShadow: `0 0 5px ${rgbWithOpacity(value, 0.4)}, ${generateShadow(
          1,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-sm': (value) => ({
        boxShadow: `0 0 10px ${rgbWithOpacity(value, 0.4)}, ${generateShadow(
          2,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-md': (value) => ({
        boxShadow: `0 0 20px ${rgbWithOpacity(value, 0.4)}, ${generateShadow(
          3,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-lg': (value) => ({
        boxShadow: `0 0 30px ${rgbWithOpacity(value, 0.4)}, ${generateShadow(
          5,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-xl': (value) => ({
        boxShadow: `0 0 40px ${rgbWithOpacity(value, 0.4)}, ${generateShadow(
          10,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-intense-xs': (value) => ({
        boxShadow: `0 0 5px ${rgbWithOpacity(value, 0.8)}, ${generateShadow(
          1,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-intense-sm': (value) => ({
        boxShadow: `0 0 10px ${rgbWithOpacity(value, 0.8)}, ${generateShadow(
          2,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-intense-md': (value) => ({
        boxShadow: `0 0 20px ${rgbWithOpacity(value, 0.8)}, ${generateShadow(
          3,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-intense-lg': (value) => ({
        boxShadow: `0 0 30px ${rgbWithOpacity(value, 0.8)}, ${generateShadow(
          5,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
      'glow-intense-xl': (value) => ({
        boxShadow: `0 0 40px ${rgbWithOpacity(value, 0.8)}, ${generateShadow(
          10,
          theme('colors.gray.950'),
          0.1
        )}`,
      }),
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
})
