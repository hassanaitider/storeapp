/**
 * Upload lampe-multifonction image to Vercel Blob
 */
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

function loadEnvLocal() {
  const p = path.resolve(".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN missing");
  process.exit(1);
}

const file = path.resolve("public/products/lampe-multifonction-800.png");
const blob = await put(
  "ads/lampe-multifonction-800.png",
  fs.readFileSync(file),
  {
    access: "public",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "image/png",
  }
);
console.log(blob.url);
