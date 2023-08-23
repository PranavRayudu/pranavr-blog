import { colorLuminance } from './utils'

const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

enum LightSourceDirection {
  TOP_RIGHT,
  TOP_LEFT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

enum BoxShape {
  FLAT,
  CONCAVE,
  CONVEX,
  INSET,
}

function generateNeumorphicStyles(
  color: string,
  colorDifference: number,
  distance: number,
  activeLightSource: LightSourceDirection = LightSourceDirection.TOP_LEFT,
  shape: BoxShape = BoxShape.FLAT
) {
  let angle: number, positionX: number, positionY: number
  const darkColor = colorLuminance(color, colorDifference * -1)
  const lightColor = colorLuminance(color, colorDifference)
  const gradient = shape in [BoxShape.CONCAVE, BoxShape.CONVEX]
  const blur = distance * 2
  const firstGradientColor = gradient
    ? colorLuminance(color, shape === BoxShape.CONVEX ? 0.07 : -0.1)
    : color
  const secondGradientColor = gradient
    ? colorLuminance(color, shape === BoxShape.CONCAVE ? 0.07 : -0.1)
    : color

  switch (activeLightSource) {
    case LightSourceDirection.TOP_RIGHT:
      positionX = distance
      positionY = distance * -1
      angle = 45
      break
    case LightSourceDirection.TOP_LEFT:
      positionX = distance
      positionY = distance
      angle = 145
      break
    case LightSourceDirection.BOTTOM_LEFT:
      positionX = distance * -1
      positionY = distance
      angle = 225
      break
    case LightSourceDirection.BOTTOM_RIGHT:
      positionX = distance * -1
      positionY = distance * -1
      angle = 315
      break
  }

  const background = gradient
    ? `linear-gradient(${angle}deg, ${firstGradientColor}, ${secondGradientColor})`
    : `${color}`
  const boxShadowPosition = shape === BoxShape.INSET ? 'inset' : ''
  const firstBoxShadow = `${boxShadowPosition} ${positionX}px ${positionY}px ${blur}px ${darkColor}`
  const secondBoxShadow = `${boxShadowPosition} ${-positionX}px ${-positionY}px ${blur}px ${lightColor};`

  // return { background: `${background}`, shadow: `${firstBoxShadow}, ${secondBoxShadow}` }
  return `${firstBoxShadow}, ${secondBoxShadow}`
}

const DARK = 0.5
const LIGHT = 0.3

const sizes = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xl2: 32,
  xl3: 64,
}
export default plugin(({ matchUtilities, theme }) => {
  const light_shadows = Object.fromEntries(
    Object.entries(sizes).map(([sizeName, sizeVal]) => [
      `raised-${sizeName}`,
      (color: string) => ({ boxShadow: generateNeumorphicStyles(color, LIGHT, sizeVal) }),
    ])
  )

  const dark_shadows = Object.fromEntries(
    Object.entries(sizes).map(([sizeName, sizeVal]) => [
      `raised-intense-${sizeName}`,
      (color: string) => ({ boxShadow: generateNeumorphicStyles(color, DARK, sizeVal) }),
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
