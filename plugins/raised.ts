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
function colorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  // convert to decimal and change luminosity
  let rgb = '#'
  let c: number
  for (let i = 0; i < 3; i++) {
    c = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
    const c16 = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ('00' + c16).substring(c16.length)
  }

  return rgb
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
  // const light_shadows = Object.fromEntries(
  //   Object.entries(sizes).map(([sizeName, sizeVal]) => [
  //     `raised-${sizeName}`,
  //     (color) => ({ boxShadow: generateNeumorphicStyles(color, LIGHT, sizeVal) }),
  //   ])
  // )
  //
  // const dark_shadows = Object.fromEntries(
  //   Object.entries(sizes).map(([sizeName, sizeVal]) => [
  //     `raised-intense-${sizeName}`,
  //     (color) => ({ boxShadow: generateNeumorphicStyles(color, DARK, sizeVal) }),
  //   ])
  // )

  matchUtilities(
    {
      // ...light_shadows,
      // ...dark_shadows,
      'raised-sm': (val: string) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.sm) }),
      'raised-md': (val) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.md) }),
      'raised-lg': (val) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.lg) }),
      'raised-xl': (val) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.xl) }),
      'raised-xl2': (val) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.xl2) }),
      'raised-xl3': (val) => ({ boxShadow: generateNeumorphicStyles(val, LIGHT, sizes.xl3) }),

      'raised-intense-sm': (val) => ({ boxShadow: generateNeumorphicStyles(val, DARK, sizes.sm) }),
      'raised-intense-md': (val) => ({ boxShadow: generateNeumorphicStyles(val, DARK, sizes.md) }),
      'raised-intense-lg': (val) => ({ boxShadow: generateNeumorphicStyles(val, DARK, sizes.lg) }),
      'raised-intense-xl': (val) => ({ boxShadow: generateNeumorphicStyles(val, DARK, sizes.xl) }),
      'raised-intense-xl2': (val) => ({
        boxShadow: generateNeumorphicStyles(val, DARK, sizes.xl2),
      }),
      'raised-intense-xl3': (val) => ({
        boxShadow: generateNeumorphicStyles(val, DARK, sizes.xl3),
      }),
    },
    {
      values: flattenColorPalette(theme('colors')),
      type: 'color',
    }
  )
})
