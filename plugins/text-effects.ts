const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

import { colorLuminance, rgbWithOpacity } from './utils'

const LIGHT = 0.5
const DARK = 0.9

const sizes = {
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
  xl2: 16,
  xl3: 24,
}
export default plugin(({ matchUtilities, theme }) => {
  const light_shadows = Object.fromEntries(
    Object.entries(sizes).map(([sizeName, sizeVal]) => [
      `text-glow-${sizeName}`,
      (color: string) => ({ textShadow: `0 0 ${sizeVal}px ${rgbWithOpacity(color, LIGHT)}` }),
    ])
  )

  const dark_shadows = Object.fromEntries(
    Object.entries(sizes).map(([sizeName, sizeVal]) => [
      `text-glow-intense-${sizeName}`,
      (color: string) => ({ textShadow: `0 0 ${sizeVal}px ${rgbWithOpacity(color, DARK)}` }),
    ])
  )

  matchUtilities(
    {
      ...light_shadows,
      ...dark_shadows,
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
})
