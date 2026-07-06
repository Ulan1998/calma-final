import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, basename, extname } from 'path'

const RAW_DIR = './raw-mascots'
const OUT_DIR = './public/mascots'
const SIZE    = 512
const QUALITY = 85

// Props baked INTO character images — no separate props layer
const CHARS = {
  leo:  ['idle', 'open-box', 'carry-tray', 'inspect', 'knead'],
  max:  ['walk', 'push', 'pull-rope', 'carry-box'],
  luna: ['idle', 'point', 'tag', 'qr-stand'],
}

// Full-scene illustrations (Hero, Footer)
const SCENES = ['hero', 'footer']
const SCENE_MAX = 1200

async function fmtBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} kb`
}

async function processFile(inputPath, outputPath, size) {
  const before = (await stat(inputPath)).size
  await sharp(inputPath)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: QUALITY })
    .toFile(outputPath)
  const after = (await stat(outputPath)).size
  console.log(`  ✓ ${basename(outputPath)}  ${await fmtBytes(before)} → ${await fmtBytes(after)}`)
}

async function processDir(rawDir, outDir, allowedNames, size) {
  if (!existsSync(rawDir)) return 0
  await mkdir(outDir, { recursive: true })
  const files = await readdir(rawDir)
  let n = 0
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue
    const name = basename(file, ext)
    if (allowedNames && !allowedNames.includes(name)) {
      console.log(`  ⚠ пропущен: ${file} (нет в списке)`)
      continue
    }
    await processFile(join(rawDir, file), join(outDir, `${name}.webp`), size)
    n++
  }
  return n
}

async function run() {
  if (!existsSync(RAW_DIR)) {
    console.error(`raw-mascots/ не найден. Создай и положи:
  raw-mascots/leo/idle.png
  raw-mascots/max/push.png
  raw-mascots/luna/tag.png
  raw-mascots/scenes/hero.png`)
    process.exit(1)
  }

  let total = 0

  console.log('\n── Персонажи (characters/) ──')
  for (const [char, actions] of Object.entries(CHARS)) {
    console.log(`\n  ${char}/`)
    total += await processDir(
      join(RAW_DIR, char),
      join(OUT_DIR, 'characters', char),
      actions,
      SIZE,
    )
  }

  console.log('\n── Сцены (scenes/) ──')
  total += await processDir(
    join(RAW_DIR, 'scenes'),
    join(OUT_DIR, 'scenes'),
    SCENES,
    SCENE_MAX,
  )

  console.log(`\n✅ Готово — ${total} файлов → public/mascots/`)
}

run().catch(err => { console.error(err); process.exit(1) })
