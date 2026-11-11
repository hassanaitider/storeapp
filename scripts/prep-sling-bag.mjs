import sharp from "sharp";
import fs from "fs";
import path from "path";

const font = "C:/Windows/Fonts/tahoma.ttf".replace(/\\/g, "/");
const srcDir = "C:/Users/ADM/.cursor/projects/c-Users-ADM-store-cargolf/assets";
const outDir = "public/products";

const inputs = [
  {
    src: "image_20261026_182046-hadok-lfo9aniyin-li-ktebti-b-anglais-ktebhom-b-ara-fdb561b8-1b18-4d7d-814f-ab617108e446.jpg",
    out: "sling-bag-1-offer.webp",
  },
  {
    src: "sac_3_high_quality-45ba637f-9e44-44d5-9e76-668f93103af8.webp",
    out: "sling-bag-2-offer.webp",
  },
  {
    src: "sac4-3635bb98-2c8e-440d-abe9-7109760055dd.jpg",
    out: "sling-bag-3-offer.webp",
  },
  {
    src: "sac_1-eb92752d-3263-4f25-81af-7f5d48208dd0.png",
    out: "sling-bag-4-offer.webp",
  },
  {
    src: "imgi_560_H4786550ba85f42a880e11455731ce2b6E-e8b847d8-6418-4cf0-926b-5e4857c43f09.webp",
    out: "sling-bag-5-offer.webp",
  },
  {
    src: "imgi_569_Hd89f5aa62262429f92228704a4-6346037a-93d1-40b8-99ef-e4133617f989.webp",
    out: "sling-bag-6-offer.webp",
  },
  {
    src: "imgi_357_Hfe86e57237564c1d844c606b238bbbeed-585323e4-9aa0-4e13-9ad2-f97c4c370011.webp",
    out: "sling-bag-7-offer.webp",
  },
  {
    src: "imgi_579_Hbe1092e08f0a43dbaf12178104-33b65573-0ba2-480a-9a48-954eb0fac201.webp",
    out: "sling-bag-8-offer.webp",
  },
  {
    src: "imgi_200_Ha91819f7b353435fa1e04c896cf75cce9-005476b7-db65-4d5b-ad47-2c46b51372a1.webp",
    out: "sling-bag-9-offer.webp",
  },
];

function badgeSvg(w, h) {
  const bw = Math.round(Math.min(w, h) * 0.44);
  const bh = Math.round(Math.min(w, h) * 0.12);
  const fsPx = Math.round(bh * 0.5);
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'Ar'; src: url('file:///${font}'); }
    </style>
  </defs>
  <rect x="14" y="14" rx="14" ry="14" width="${bw}" height="${bh}" fill="#c2185b"/>
  <text x="${14 + bw / 2}" y="${14 + bh / 2 + fsPx * 0.35}" text-anchor="middle"
    font-family="Ar, Tahoma, Arial" font-size="${fsPx}" font-weight="700"
    fill="#ffffff" direction="rtl">عرض محدود</text>
</svg>`);
}

for (const item of inputs) {
  const input = path.join(srcDir, item.src);
  const output = path.join(outDir, item.out);
  const buf = await sharp(input)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  await sharp(buf)
    .composite([{ input: badgeSvg(meta.width, meta.height), top: 0, left: 0 }])
    .webp({ quality: 86 })
    .toFile(output);
  console.log("ok", item.out, `${meta.width}x${meta.height}`);
}

// GIF demo — keep animated, no badge overlay
const gifSrc = path.join(
  srcDir,
  "Gif3-ezgif_1-ab602cec-8608-4cf1-969a-753616672a2c.gif"
);
const gifOut = path.join(outDir, "sling-bag-demo.gif");
fs.copyFileSync(gifSrc, gifOut);
console.log("ok sling-bag-demo.gif");
