/**
 * Compact ad GIF for hammer torch (~1MB target for Meta ads)
 * Run: node scripts/make-hammer-torch-gif.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import gifenc from "gifenc";

const { GIFEncoder, quantize, applyPalette } = gifenc;

const ASSETS = path.resolve(
  "C:/Users/ADM/.cursor/projects/c-Users-ADM-store-cargolf/assets"
);
const OUT_DIR = path.resolve("public/products");
const SIZE = 400;
const COLORS = 96;
const DELAY = 140;

const SRC_PRODUCT = path.join(
  ASSETS,
  "c__Users_ADM_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_imgi_65_12613254_6-in-1-Rechargeable-Hammer-Torch-6aa-d2be6a20-1218-4934-a942-f72a1068e6ef.png"
);
const SRC_BEAM = path.join(
  ASSETS,
  "c__Users_ADM_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_imgi_99_71QpHXx6TjL._AC_SL1000_-2db200c3-b89b-4f71-bd7f-abbbd8851752.png"
);

const OUT_GIF = path.join(OUT_DIR, "hammer-torch-demo.gif");
const OUT_STILL_A = path.join(OUT_DIR, "hammer-torch-1.png");
const OUT_STILL_B = path.join(OUT_DIR, "hammer-torch-2.png");

async function frame(inputPath, t = 0, brightness = 1) {
  const zoom = 1 + t * 0.06;
  const base = Math.round(SIZE * zoom);
  const maxOff = Math.max(0, base - SIZE);
  const left = Math.round(maxOff * (0.25 + t * 0.4));
  const top = Math.round(maxOff * (0.2 + t * 0.35));

  let pipeline = sharp(inputPath)
    .resize(base, base, { fit: "cover", position: "centre" })
    .extract({
      left: Math.min(left, maxOff),
      top: Math.min(top, maxOff),
      width: SIZE,
      height: SIZE,
    });

  if (brightness < 1) {
    pipeline = pipeline.modulate({ brightness });
  }

  const { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height };
}

function blend(a, b, t) {
  const out = Buffer.alloc(a.length);
  for (let i = 0; i < a.length; i += 4) {
    out[i] = (a[i] * (1 - t) + b[i] * t) | 0;
    out[i + 1] = (a[i + 1] * (1 - t) + b[i + 1] * t) | 0;
    out[i + 2] = (a[i + 2] * (1 - t) + b[i + 2] * t) | 0;
    out[i + 3] = 255;
  }
  return out;
}

if (!fs.existsSync(SRC_PRODUCT) || !fs.existsSync(SRC_BEAM)) {
  console.error("Source images missing");
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

await sharp(SRC_PRODUCT)
  .resize(1000, 1000, { fit: "cover", position: "centre" })
  .png()
  .toFile(OUT_STILL_A);
await sharp(SRC_BEAM)
  .resize(1000, 1000, { fit: "cover", position: "centre" })
  .png()
  .toFile(OUT_STILL_B);

const frames = [];

// Dark → light (beam on)
for (const b of [0.2, 0.45, 0.7, 1]) {
  frames.push(await frame(SRC_BEAM, 0.1, b));
}
// Hold beam
frames.push(await frame(SRC_BEAM, 0.25));
frames.push(await frame(SRC_BEAM, 0.4));
frames.push(await frame(SRC_BEAM, 0.55));

// Crossfade to product
const beamEnd = await frame(SRC_BEAM, 0.6);
const prodStart = await frame(SRC_PRODUCT, 0.1);
for (const t of [0.35, 0.7, 1]) {
  frames.push({
    data: blend(beamEnd.data, prodStart.data, t),
    width: SIZE,
    height: SIZE,
  });
}

// Hold product
frames.push(await frame(SRC_PRODUCT, 0.2));
frames.push(await frame(SRC_PRODUCT, 0.35));
frames.push(await frame(SRC_PRODUCT, 0.5));

// Fade back for loop
const prodEnd = await frame(SRC_PRODUCT, 0.5);
const beamLoop = await frame(SRC_BEAM, 0.15);
for (const t of [0.5, 1]) {
  frames.push({
    data: blend(prodEnd.data, beamLoop.data, t),
    width: SIZE,
    height: SIZE,
  });
}

const gif = GIFEncoder();
for (const f of frames) {
  const palette = quantize(f.data, COLORS);
  const index = applyPalette(f.data, palette);
  gif.writeFrame(index, f.width, f.height, { palette, delay: DELAY });
}
gif.finish();
fs.writeFileSync(OUT_GIF, Buffer.from(gif.bytes()));

const kb = Math.round(fs.statSync(OUT_GIF).size / 1024);
console.log(`wrote ${OUT_GIF} (${kb} KB, ${frames.length} frames)`);
