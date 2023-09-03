import { generateShadow, rgbWithOpacity } from './utils'
import { light } from '@fortawesome/fontawesome-svg-core/import.macro'

const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

export default plugin(({ matchUtilities, theme }) => {
  const weak_shadow_strength = -0.2
  const strong_shadow_strength = -0.6

  const glow_weak_strength = 0.4
  const shadow_weak_color = theme('colors.gray.200')
  const glow_sizes = {
    xs: [2, 1],
    sm: [4, 2],
    md: [8, 3],
    lg: [16, 5],
    xl: [32, 8],
  }

  const glow_strong_strength = 0.8
  const shadow_strong_color = theme('colors.gray.950')
  const glow_intense_sizes = {
    xs: [2, 1],
    sm: [4, 2],
    md: [8, 3],
    lg: [16, 5],
    xl: [32, 8],
  }

  const light_raised_glow = Object.fromEntries(
    Object.entries(glow_sizes).map(([sizeName, sizeVal]) => [
      `raised-glow-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_weak_strength)}) 
                drop-shadow(${generateShadow(
                  sizeVal[1],
                  shadow_weak_color,
                  weak_shadow_strength
                )})`,
      }),
    ])
  )

  const light_raised_glow_intense = Object.fromEntries(
    Object.entries(glow_sizes).map(([sizeName, sizeVal]) => [
      `raised-glow-intense-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_strong_strength)}) 
                drop-shadow(${generateShadow(
                  sizeVal[1],
                  shadow_weak_color,
                  weak_shadow_strength
                )})`,
      }),
    ])
  )

  const dark_raised_glow = Object.fromEntries(
    Object.entries(glow_intense_sizes).map(([sizeName, sizeVal]) => [
      `dark-raised-glow-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_weak_strength)}) 
                drop-shadow(${generateShadow(
                  sizeVal[1],
                  shadow_strong_color,
                  strong_shadow_strength
                )})`,
      }),
    ])
  )

  const dark_raised_glow_intense = Object.fromEntries(
    Object.entries(glow_intense_sizes).map(([sizeName, sizeVal]) => [
      `dark-raised-glow-intense-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_strong_strength)}) 
                drop-shadow(${generateShadow(
                  sizeVal[1],
                  shadow_strong_color,
                  strong_shadow_strength
                )})`,
      }),
    ])
  )

  const light_glow = Object.fromEntries(
    Object.entries(glow_sizes).map(([sizeName, sizeVal]) => [
      `glow-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_weak_strength)})`,
      }),
    ])
  )

  const dark_glow = Object.fromEntries(
    Object.entries(glow_intense_sizes).map(([sizeName, sizeVal]) => [
      `glow-${sizeName}`,
      (color: string) => ({
        filter: `drop-shadow(0 0 ${sizeVal[0]}px ${rgbWithOpacity(color, glow_strong_strength)})`,
      }),
    ])
  )

  matchUtilities(
    {
      ...light_raised_glow,
      ...light_raised_glow_intense,
      ...dark_raised_glow,
      ...dark_raised_glow_intense,
      ...light_glow,
      ...dark_glow,
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
})
