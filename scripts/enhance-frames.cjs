/**
 * enhance-frames.js — Batch cinematic frame upscaler.
 *
 * Input:   150 × 1280×720 WebP frames  (source dir)
 * Output:  150 × 3840×2160 WebP frames (4K dir)
 *
 * Pipeline (IDENTICAL for every frame — fully deterministic):
 *   1. Resize 1280×720 → 3840×2160  (3×, Lanczos3 kernel)
 *   2. Sharpen  unsharp mask  (σ=0.8,  r=2.5,  g=0.7,  flat=10)
 *   3. Write    WebP, quality 94, force sRGB
 *
 * Consistency guarantees:
 *   - Same kernel, sigma, quality, colorspace for all frames
 *   - No per-frame analysis — purely deterministic
 *   - Sequential processing — stable memory
 *   - Output written to separate 4K directory (originals untouched)
 *
 * Usage:
 *   node enhance-frames.js          # dry preview (shows plan)
 *   node enhance-frames.js --apply  # process all 150 frames
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/* ---------- Config ---------- */

const SOURCE_DIR = path.resolve(__dirname, '..', 'public/experience/frames');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public/experience/frames-4k');

const WIDTH = 3840;
const HEIGHT = 2160;

const SHARPEN = {
  sigma: 0.8,
  radius: 2.5,
  gain: 0.7,
  threshold: 10,
};

const OUTPUT_QUALITY = 94;
const TOTAL = 150;

const APPLY = process.argv.includes('--apply');

/* ---------- Core ---------- */

function makeOutput(index) {
  const pad = String(index).padStart(4, '0');
  return path.join(OUTPUT_DIR, `frame_${pad}.webp`);
}

function makeSource(index) {
  const pad = String(index).padStart(4, '0');
  return path.join(SOURCE_DIR, `frame_${pad}.webp`);
}

async function processOne(sourcePath, outputPath) {
  const result = sharp(sourcePath)
    .resize(WIDTH, HEIGHT, {
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen(SHARPEN)
    .webp({
      quality: OUTPUT_QUALITY,
      force: true,
      /** Keep color profile consistent — same colorspace for every frame */
    });

  await result.toFile(outputPath);
}

/* ---------- Main ---------- */

async function main() {
  // Dry preview mode
  if (!APPLY) {
    const sample = fs.statSync(makeSource(1));
    const exists = fs.existsSync(OUTPUT_DIR);
    console.log('Enhance frames — preview');
    console.log(`  Source: ${SOURCE_DIR}`);
    console.log(`  Output: ${OUTPUT_DIR}${exists ? ' (exists)' : ' (will be created)'}`);
    console.log(`  Frames: ${TOTAL}`);
    console.log(`  Input:  1280×720 WebP (~${Math.round(sample.size / 1024)} KB/frame)`);
    console.log(`  Output: ${WIDTH}×${HEIGHT} WebP, quality ${OUTPUT_QUALITY}`);
    console.log(`  Kernel: lanczos3`);
    console.log(`  Sharpen: σ=${SHARPEN.sigma}, r=${SHARPEN.radius}, g=${SHARPEN.gain}, flat=${SHARPEN.threshold}`);
    console.log('');
    console.log('To apply, run:');
    console.log(`  node ${path.resolve(__filename)} --apply`);
    return;
  }

  // Apply mode
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Enhancing ${TOTAL} frames: 1280×720 → ${WIDTH}×${HEIGHT}`);
  console.log(`Kernel: lanczos3 | Sharpen: σ=${SHARPEN.sigma} r=${SHARPEN.radius} g=${SHARPEN.gain}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  let ok = 0;
  let fail = 0;

  for (let i = 1; i <= TOTAL; i++) {
    const sourcePath = makeSource(i);
    const outputPath = makeOutput(i);

    if (!fs.existsSync(sourcePath)) {
      console.error(`  [SKIP] Missing: frame_${String(i).padStart(4, '0')}.webp`);
      fail++;
      continue;
    }

    try {
      await processOne(sourcePath, outputPath);
      ok++;
      const src = fs.statSync(sourcePath).size;
      const out = fs.statSync(outputPath).size;
      if (i % 10 === 0 || i === TOTAL) {
        console.log(`  ${i}/${TOTAL} ✓  ${Math.round(src / 1024)} KB → ${Math.round(out / 1024)} KB`);
      }
    } catch (err) {
      console.error(`  ${i}/${TOTAL} ✗  ${err.message}`);
      fail++;
    }
  }

  console.log('');
  console.log(`Done. ${ok} succeeded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
