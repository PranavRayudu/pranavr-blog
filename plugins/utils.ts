export function colorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  // convert to decimal and change luminosity
  let rgb = '#'
  for (let i = 0; i < 3; i++) {
    const c = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
    const c16 = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ('00' + c16).substring(c16.length)
  }

  return rgb
}

/**
 * Convert hex color to rgb
 * @param hex
 * @returns {{r: number, b: number, g: number}|null}
 */
function hexToRgb(hex: string): { r: number; b: number; g: number } {
  const hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i
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

export function rgbWithOpacity(value: string, opacity: number) {
  return mountRgbaString(hexToRgb(value), opacity)
}

export function generateShadow(distance: number, color: string, darkness = -0.1) {
  return `0px ${distance}px ${colorLuminance(color, darkness)}`
}
