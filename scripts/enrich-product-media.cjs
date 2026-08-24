/**
 * Enrich product media: 1 demo GIF + 3 still crops from a source image.
 * Usage: node scripts/enrich-product-media.mjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const GIFEncoder = require("gif-encoder-2");

const ROOT = path.join(__dirname, "..", "public", "products");

/** base name without extension → source file */
const JOBS = [
  { id: "iphone13-battery-case", src: "iphone13-battery-case.png" },
  { id: "budi-powerbank-20000", src: "budi-powerbank-20000.png" },
  { id: "denx-dx648-earbuds", src: "denx-dx648-earbuds.png" },
  { id: "xiaomi-earbuds-tws", src: "xiaomi-earbuds-tws.png" },
  { id: "car-windshield-umbrella", src: "car-windshield-umbrella.png" },
  { id: "kitchen-3pcs-offer", src: "kitchen-3pcs-offer.png" },
  { id: "dish-drying-rack-sink", src: "dish-drying-rack-sink.png" },
  { id: "konnect-kn101-powerbank", src: "konnect-kn101-powerbank.png" },
  { id: "solar-camera", src: "solar-camera-1.png" },
  { id: "solar-powerbank", src: "solar-powerbank-1.png" },
  { id: "fashion-sling", src: "fashion-sling-1.png" },
];

async function frameRgba(srcPath, size, zoom = 1, offsetX = 0, offsetY = 0) {
  const meta = await sharp(srcPath).metadata();
  const w = meta.width || size;
  const h = meta.height || size;
  const cropW = Math.max(32, Math.floor(w / zoom));
  const cropH = Math.max(32, Math.floor(h / zoom));
  const left = Math.min(
    Math.max(0, Math.floor((w - cropW) / 2 + offsetX * w)),
    Math.max(0, w - cropW)
  );
  const top = Math.min(
    Math.max(0, Math.floor((h - cropH) / 2 + offsetY * h)),
    Math.max(0, h - cropH)
  );
  return sharp(srcPath)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(size, size, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

async function makeGif(srcPath, outPath) {
  const size = 480;
  const zooms = [
    [1.0, 0, 0],
    [1.08, 0.02, -0.02],
    [1.15, -0.02, 0.02],
    [1.08, 0.01, 0.01],
    [1.0, 0, 0],
  ];
  const encoder = new GIFEncoder(size, size);
  encoder.setDelay(180);
  encoder.start();
  for (const [z, ox, oy] of zooms) {
    const { data, info } = await frameRgba(srcPath, size, z, ox, oy);
    encoder.addFrame(data);
    void info;
  }
  encoder.finish();
  fs.writeFileSync(outPath, encoder.out.getData());
}

async function makeStills(srcPath, id) {
  const meta = await sharp(srcPath).metadata();
  const w = meta.width || 1000;
  const h = meta.height || 1000;
  const out = [];

  const specs = [
    { name: `${id}-g1.png`, left: 0, top: 0, width: w, height: h },
    {
      name: `${id}-g2.png`,
      left: Math.floor(w * 0.08),
      top: Math.floor(h * 0.05),
      width: Math.floor(w * 0.84),
      height: Math.floor(h * 0.75),
    },
    {
      name: `${id}-g3.png`,
      left: Math.floor(w * 0.15),
      top: Math.floor(h * 0.2),
      width: Math.floor(w * 0.7),
      height: Math.floor(h * 0.7),
    },
  ];

  for (const s of specs) {
    const dest = path.join(ROOT, s.name);
    await sharp(srcPath)
      .extract({
        left: Math.max(0, s.left),
        top: Math.max(0, s.top),
        width: Math.min(s.width, w - s.left),
        height: Math.min(s.height, h - s.top),
      })
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(dest);
    out.push(`/products/${s.name}`);
  }
  return out;
}

async function run() {
  for (const job of JOBS) {
    const srcPath = path.join(ROOT, job.src);
    if (!fs.existsSync(srcPath)) {
      console.warn("skip missing", job.src);
      continue;
    }
    const gifPath = path.join(ROOT, `${job.id}-demo.gif`);
    console.log("GIF", job.id);
    await makeGif(srcPath, gifPath);
    console.log("stills", job.id);
    await makeStills(srcPath, job.id);
  }
  console.log("done");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
