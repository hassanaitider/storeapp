/** Resize large still WebPs for storefront (max 1400px, q=82). Skip *-demo.webp. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "public", "products");

async function main() {
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".webp") && !f.includes("-demo"));
  for (const name of files) {
    const file = path.join(DIR, name);
    const before = fs.statSync(file).size;
    if (before < 120 * 1024) continue;
    const meta = await sharp(file, { limitInputPixels: false }).metadata();
    if ((meta.pages || 1) > 1) continue; // animated
    const buf = await sharp(file, { limitInputPixels: false })
      .rotate()
      .resize({
        width: 1400,
        height: 1400,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toBuffer();
    if (buf.length < before * 0.92) {
      const tmp = file + ".opt.tmp";
      fs.writeFileSync(tmp, buf);
      try {
        fs.unlinkSync(file);
        fs.renameSync(tmp, file);
      } catch {
        try {
          fs.copyFileSync(tmp, file);
          fs.unlinkSync(tmp);
        } catch (e2) {
          console.warn("skip locked", name);
          try {
            fs.unlinkSync(tmp);
          } catch {
            /* */
          }
          continue;
        }
      }
      console.log(
        `${name}: ${(before / 1024).toFixed(0)}→${(buf.length / 1024).toFixed(0)}KB`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
