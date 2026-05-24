const fs = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')

const projectRoot = path.resolve(__dirname, '..')
const inputDir = path.resolve(projectRoot, process.argv[2] || 'public/assets/furniture')
const outputDir = path.resolve(projectRoot, process.argv[3] || 'public/assets/furniture-trimmed')
const reportPath = path.join(outputDir, 'trim-report.json')
const alphaThreshold = 0

function cropFromBounds(bounds) {
  return {
    left: bounds.minX,
    top: bounds.minY,
    width: bounds.maxX - bounds.minX + 1,
    height: bounds.maxY - bounds.minY + 1,
  }
}

function findAlphaBounds(buffer, width, height, channels) {
  if (channels < 4) return null

  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y += 1) {
    const rowStart = y * width * channels
    for (let x = 0; x < width; x += 1) {
      const alpha = buffer[rowStart + x * channels + 3]
      if (alpha > alphaThreshold) {
        if (x < minX) minX = x
        if (y < minY) minY = y
        if (x > maxX) maxX = x
        if (y > maxY) maxY = y
      }
    }
  }

  if (maxX < 0 || maxY < 0) return null
  return { minX, minY, maxX, maxY }
}

async function copyOriginal(inputPath, outputPath) {
  await fs.copyFile(inputPath, outputPath)
}

async function trimPng(filename) {
  const inputPath = path.join(inputDir, filename)
  const outputPath = path.join(outputDir, filename)
  const image = sharp(inputPath, { limitInputPixels: false })
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const bounds = findAlphaBounds(data, info.width, info.height, info.channels)

  if (!bounds) {
    await copyOriginal(inputPath, outputPath)
    console.log(`[copy] ${filename}: no non-transparent pixels found`)
    return {
      file: filename,
      original: { width: info.width, height: info.height },
      trimmed: { width: info.width, height: info.height },
      trim: { top: 0, right: 0, bottom: 0, left: 0 },
      copied: true,
      reason: 'no non-transparent pixels found',
    }
  }

  const crop = cropFromBounds(bounds)
  const trim = {
    top: crop.top,
    right: info.width - crop.left - crop.width,
    bottom: info.height - crop.top - crop.height,
    left: crop.left,
  }
  const hasTrim = trim.top || trim.right || trim.bottom || trim.left

  if (!hasTrim) {
    await copyOriginal(inputPath, outputPath)
    console.log(`[copy] ${filename}: no transparent border to trim`)
  } else {
    await sharp(inputPath, { limitInputPixels: false })
      .extract(crop)
      .png()
      .toFile(outputPath)
    console.log(
      `[trim] ${filename}: ${info.width}x${info.height} -> ${crop.width}x${crop.height}`
    )
  }

  return {
    file: filename,
    original: { width: info.width, height: info.height },
    trimmed: { width: crop.width, height: crop.height },
    trim,
    copied: !hasTrim,
    reason: hasTrim ? 'trimmed transparent border' : 'no transparent border to trim',
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true })

  const entries = await fs.readdir(inputDir, { withFileTypes: true })
  const pngFiles = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.png'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

  if (!pngFiles.length) {
    throw new Error(`No PNG files found in ${inputDir}`)
  }

  const report = {
    inputDir: path.relative(projectRoot, inputDir),
    outputDir: path.relative(projectRoot, outputDir),
    alphaThreshold,
    generatedAt: new Date().toISOString(),
    files: [],
  }

  for (const filename of pngFiles) {
    report.files.push(await trimPng(filename))
  }

  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`\nWrote ${path.relative(projectRoot, reportPath)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
