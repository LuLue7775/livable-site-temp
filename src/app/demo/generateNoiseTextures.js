const fs = require('fs')
const { createCanvas } = require('canvas')

function generateNoiseTexture(width, height, type) {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  const imageData = ctx.createImageData(width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255
    data[i] = value     // R
    data[i + 1] = value // G
    data[i + 2] = value // B
    data[i + 3] = 255   // A
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toBuffer('image/png')
}

// Generate color noise texture
const colorNoise = generateNoiseTexture(512, 512, 'color')
fs.writeFileSync('public/textures/color-noise.png', colorNoise)

// Generate cloud noise texture
const cloudNoise = generateNoiseTexture(512, 512, 'cloud')
fs.writeFileSync('public/textures/cloud-noise.png', cloudNoise) 