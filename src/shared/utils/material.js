export const layerLabels = {
  FEET: '발밑',
  BODY: '몸높이',
  HEAD: '머리위',
}

export function compactMaterial(material) {
  if (!material || material === 'UNLOADED') {
    return '--'
  }

  const segments = material.split('_')
  if (segments.length === 1) {
    return segments[0].slice(0, 2)
  }

  return `${segments[0][0]}${segments[segments.length - 1][0]}`
}

export function getMaterialColor(material, loaded, highlighted) {
  if (!loaded || material === 'UNLOADED' || material === 'OUT_OF_WORLD') {
    return 'linear-gradient(135deg, #626c7a, #3b4250)'
  }

  if (highlighted) {
    return 'linear-gradient(135deg, #ffcf6e, #f28b32)'
  }

  if (material.includes('AIR')) {
    return 'linear-gradient(135deg, rgba(223, 236, 245, 0.48), rgba(198, 214, 226, 0.82))'
  }

  if (material.includes('WATER')) {
    return 'linear-gradient(135deg, #4d93d4, #2b5f9b)'
  }

  if (material.includes('LAVA')) {
    return 'linear-gradient(135deg, #ff9f43, #c84d18)'
  }

  if (
    material.includes('GRASS') ||
    material.includes('LEAF') ||
    material.includes('LEAVES') ||
    material.includes('MOSS') ||
    material.includes('VINE')
  ) {
    return 'linear-gradient(135deg, #60a862, #2f6d3d)'
  }

  if (
    material.includes('LOG') ||
    material.includes('WOOD') ||
    material.includes('PLANK') ||
    material.includes('CHEST')
  ) {
    return 'linear-gradient(135deg, #b18252, #6d4a2f)'
  }

  if (material.includes('SAND') || material.includes('DIRT')) {
    return 'linear-gradient(135deg, #bca17c, #8b6d48)'
  }

  if (
    material.includes('DIAMOND') ||
    material.includes('EMERALD') ||
    material.includes('REDSTONE') ||
    material.includes('GOLD') ||
    material.includes('AMETHYST')
  ) {
    return 'linear-gradient(135deg, #6dd8d1, #0e8b95)'
  }

  return 'linear-gradient(135deg, #8d95a4, #5a6170)'
}
