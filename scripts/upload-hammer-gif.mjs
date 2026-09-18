/**
 * Upload hammer-torch GIF to Vercel Blob and print public URL.
 * Usage: node scripts/upload-hammer-gif.mjs
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

const file = path.resolve("public/products/hammer-torch-demo.gif");
if (!fs.existsSync(file)) {
  console.error("GIF not found:", file);
  process.exit(1);
}

const blob = await put("ads/hammer-torch-demo.gif", fs.readFileSync(file), {
  access: "public",
  token,
  addRandomSuffix: false,
  allowOverwrite: true,
  contentType: "image/gif",
});

console.log(blob.url);
