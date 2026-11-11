import sharp from "sharp";
import fs from "fs";
import path from "path";

const font = "C:/Windows/Fonts/tahoma.ttf".replace(/\\/g, "/");
const dir = "public/products";
const files = [
  "watch-gift-set-1.webp",
  "watch-gift-set-2.webp",
  "watch-gift-set-3.webp",
  "watch-gift-set-4.webp",
  "watch-gift-set-5.webp",
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

for (const name of files) {
  const file = path.join(dir, name);
  const out = path.join(dir, name.replace(".webp", "-offer.webp"));
  const meta = await sharp(file).metadata();
  await sharp(file)
    .composite([{ input: badgeSvg(meta.width, meta.height), top: 0, left: 0 }])
    .webp({ quality: 88 })
    .toFile(out);
  console.log("ok", path.basename(out), `${meta.width}x${meta.height}`);
}
