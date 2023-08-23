const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i

/**
 * Convert hex color to rgb
 * @param hex
 * @returns {{r: number, b: number, g: number}|null}
 */
function hexToRgb(hex) {
  const result = hexReg.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

function mountRgbaString(rgb: { r: number; g: number; b: number }, a: number) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`
}

function rgbWithOpacity(value: string, opacity: number) {
  return mountRgbaString(hexToRgb(value), opacity)
}
export default plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      'glow-xs': (value) => ({
        boxShadow: `0 0 5px ${rgbWithOpacity(value, 0.4)}, 0 1px 1px ${theme('colors.gray.950')}`,
      }),
      'glow-sm': (value) => ({
        boxShadow: `0 0 10px ${rgbWithOpacity(value, 0.4)}, 0 2px 2px ${theme('colors.gray.950')}`,
      }),
      'glow-md': (value) => ({
        boxShadow: `0 0 20px ${rgbWithOpacity(value, 0.4)}, 0 3px 3px ${theme('colors.gray.950')}`,
      }),
      'glow-lg': (value) => ({
        boxShadow: `0 0 30px ${rgbWithOpacity(value, 0.4)}, 0 5px 5px ${theme('colors.gray.950')}`,
      }),
      'glow-xl': (value) => ({
        boxShadow: `0 0 40px ${rgbWithOpacity(value, 0.4)}, 0 5px 5px ${theme('colors.gray.950')}`,
      }),
      'glow-intense-xs': (value) => ({
        boxShadow: `0 0 5px ${rgbWithOpacity(value, 0.8)}, 0 1px 1px ${theme('colors.gray.950')}`,
      }),
      'glow-intense-sm': (value) => ({
        boxShadow: `0 0 10px ${rgbWithOpacity(value, 0.8)}, 0 2px 2px ${theme('colors.gray.950')}`,
      }),
      'glow-intense-md': (value) => ({
        boxShadow: `0 0 20px ${rgbWithOpacity(value, 0.8)}, 0 3px 3px ${theme('colors.gray.950')}`,
      }),
      'glow-intense-lg': (value) => ({
        boxShadow: `0 0 30px ${rgbWithOpacity(value, 0.8)}, 0 5px 5px ${theme('colors.gray.950')}`,
      }),
      'glow-intense-xl': (value) => ({
        boxShadow: `0 0 40px ${rgbWithOpacity(value, 0.8)}, 0 5px 5px ${theme('colors.gray.950')}`,
      }),
      'text-glow-sm': (value) => ({
        textShadow: `0 0 2px ${rgbWithOpacity(value, 0.5)}`,
      }),
      'text-glow-md': (value) => ({
        textShadow: `0 0 4px ${rgbWithOpacity(value, 0.5)}`,
      }),
      'text-glow-lg': (value) => ({
        textShadow: `0 0 8px ${rgbWithOpacity(value, 0.5)}`,
      }),
      'text-glow-xl': (value) => ({
        textShadow: `0 0 16px ${rgbWithOpacity(value, 0.5)}`,
      }),
      'text-glow-intense-sm': (value) => ({
        textShadow: `0 0 2px ${rgbWithOpacity(value, 0.9)}`,
      }),
      'text-glow-intense-md': (value) => ({
        textShadow: `0 0 4px ${rgbWithOpacity(value, 0.9)}`,
      }),
      'text-glow-intense-lg': (value) => ({
        textShadow: `0 0 8px ${rgbWithOpacity(value, 0.9)}`,
      }),
      'text-glow-intense-xl': (value) => ({
        textShadow: `0 0 16px ${rgbWithOpacity(value, 0.9)}`,
      }),
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
})
