/**
 * Build short Ken-Burns style GIFs from product stills for the gallery.
 * Run: node scripts/make-product-gifs.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import gifenc from "gifenc";
const { GIFEncoder, quantize, applyPalette } = gifenc;

const ROOT = path.resolve("public/products");
const SIZE = 720;
const FRAMES = 16;
const DELAY = 90;

const JOBS = [
  { src: "car-vacuum.png", out: "car-vacuum-demo.gif" },
  { src: "baby-washer.png", out: "baby-washer-demo.gif" },
  { src: "smart-sunglasses.png", out: "smart-sunglasses-demo.gif" },
  { src: "wireless-clock-1.png", out: "wireless-clock-demo.gif" },
  { src: "neck-massager.webp", out: "neck-massager-demo.gif" },
  { src: "air-bed.png", out: "air-bed-demo.gif" },
  { src: "rolling-cart-4.png", out: "rolling-cart-demo.gif" },
];

async function frameBuffer(inputPath, t) {
  // t: 0 → 1, gentle zoom + slight pan
  const zoom = 1 + t * 0.12;
  const base = SIZE * zoom;
  const left = Math.round((base - SIZE) * (0.35 + t * 0.3));
  const top = Math.round((base - SIZE) * (0.25 + t * 0.2));

  const { data, info } = await sharp(inputPath)
    .resize(Math.round(base), Math.round(base), { fit: "cover", position: "centre" })
    .extract({
      left: Math.min(left, Math.round(base) - SIZE),
      top: Math.min(top, Math.round(base) - SIZE),
      width: SIZE,
      height: SIZE,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height };
}

async function makeGif(srcName, outName) {
  const input = path.join(ROOT, srcName);
  const output = path.join(ROOT, outName);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", srcName);
    return;
  }

  const frames = [];
  for (let i = 0; i < FRAMES; i++) {
    const t = i / (FRAMES - 1);
    frames.push(await frameBuffer(input, t));
  }

  const gif = GIFEncoder();
  for (const f of frames) {
    const palette = quantize(f.data, 256);
    const index = applyPalette(f.data, palette);
    gif.writeFrame(index, f.width, f.height, { palette, delay: DELAY });
  }
  gif.finish();
  fs.writeFileSync(output, Buffer.from(gif.bytes()));
  console.log("wrote", outName, `(${fs.statSync(output).size} bytes)`);
}

for (const job of JOBS) {
  await makeGif(job.src, job.out);
}
