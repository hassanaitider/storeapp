/** Delete originals that already have a .webp sibling; re-encode inflated WebPs. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC = path.join(__dirname, "..", "public");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

async function main() {
  // 1) Remove leftovers
  let deleted = 0;
  for (const file of walk(PUBLIC)) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;
    const webp = file.slice(0, -ext.length) + ".webp";
    if (!fs.existsSync(webp)) {
      console.log("MISSING webp for", file);
      continue;
    }
    try {
      fs.unlinkSync(file);
      deleted++;
      console.log("deleted", path.basename(file));
    } catch (e) {
      console.warn("busy, retry later:", path.basename(file), e.code);
    }
  }
  console.log("deleted", deleted);

  // 2) Re-encode any webp larger than a stored original map… we no longer have originals.
  // Re-encode known inflated ones from current webp with quality 85 (still high).
  // Instead: find webps that look oversized vs typical — skip.
  // Re-convert from webp→webp at q=85 only if > 300KB and was listed as inflated in first run.
  const inflated = [
    "bed-sheet-tucker-1.webp",
    "bed-sheet-tucker-2.webp",
    "bed-sheet-tucker-3.webp",
    "bed-sheet-tucker-4.webp",
    "bed-sheet-tucker-5.webp",
    "bed-sheet-tucker-6.webp",
    "fashion-sling-1.webp",
    "fashion-sling-5.webp",
    "retrolab-console-1.webp",
    "wireless-clock-2.webp",
    "wireless-clock-3.webp",
    "omni-cob-light.webp",
    "rolling-cart-3.webp",
  ];
  for (const name of inflated) {
    const file = path.join(PUBLIC, "products", name);
    if (!fs.existsSync(file)) continue;
    const before = fs.statSync(file).size;
    const tmp = file + ".tmp.webp";
    await sharp(file, { limitInputPixels: false })
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toFile(tmp);
    const after = fs.statSync(tmp).size;
    if (after < before) {
      fs.renameSync(tmp, file);
      console.log(
        `repack ${name}: ${(before / 1024).toFixed(0)}→${(after / 1024).toFixed(0)}KB`
      );
    } else {
      fs.unlinkSync(tmp);
      console.log(`keep ${name} (${(before / 1024).toFixed(0)}KB)`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
