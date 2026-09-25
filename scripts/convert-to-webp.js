/**
 * Convert public PNG/JPG/JPEG/GIF → WebP at high quality, then rewrite refs.
 * Usage: node scripts/convert-to-webp.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const SRC = path.join(ROOT, "src");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

const QUALITY = 92; // high visual fidelity
const mapping = []; // { from, to, before, after }

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function publicUrl(absFile) {
  const rel = path.relative(PUBLIC, absFile).split(path.sep).join("/");
  return "/" + rel;
}

async function convertOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXTS.has(ext)) return null;
  const outFile = file.slice(0, -ext.length) + ".webp";
  const before = fs.statSync(file).size;
  const isGif = ext === ".gif";

  let pipeline = sharp(file, isGif ? { animated: true, limitInputPixels: false } : { limitInputPixels: false });
  const meta = await pipeline.metadata();
  // Re-open after metadata (sharp pipelines are single-use after some ops)
  pipeline = sharp(file, isGif ? { animated: true, limitInputPixels: false } : { limitInputPixels: false });

  const webpOpts = {
    quality: QUALITY,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: true,
  };
  // Near-lossless for stills with transparency / small flags
  if (!isGif && (meta.hasAlpha || before < 80 * 1024)) {
    webpOpts.nearLossless = true;
  }

  await pipeline.webp(webpOpts).toFile(outFile);
  const after = fs.statSync(outFile).size;
  const fromUrl = publicUrl(file);
  const toUrl = publicUrl(outFile);
  mapping.push({ from: fromUrl, to: toUrl, before, after, file, outFile });
  console.log(
    `${fromUrl} → ${toUrl}  (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB)`
  );
  return { file, outFile };
}

function rewriteTree(dir) {
  const files = walk(dir).filter((f) =>
    /\.(ts|tsx|js|jsx|json|md|css|html)$/i.test(f)
  );
  // Longest paths first so .jpeg before .jpg collisions are safe
  const pairs = mapping
    .map((m) => [m.from, m.to])
    .sort((a, b) => b[0].length - a[0].length);

  let touched = 0;
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    const orig = text;
    for (const [from, to] of pairs) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
      }
      // also bare filename replacements inside strings without leading path variants already covered
    }
    if (text !== orig) {
      fs.writeFileSync(file, text);
      touched++;
      console.log("updated", path.relative(ROOT, file));
    }
  }
  return touched;
}

async function main() {
  const images = walk(PUBLIC).filter((f) => EXTS.has(path.extname(f).toLowerCase()));
  console.log(`Converting ${images.length} images…`);
  for (const file of images) {
    try {
      await convertOne(file);
    } catch (err) {
      console.error("FAIL", file, err.message);
    }
  }

  const touched = rewriteTree(SRC);
  // site/layout brand refs may live outside src only — also scan root configs
  for (const extra of [
    path.join(ROOT, "next.config.ts"),
    path.join(ROOT, "README.md"),
  ]) {
    if (!fs.existsSync(extra)) continue;
    let text = fs.readFileSync(extra, "utf8");
    const orig = text;
    for (const m of mapping) {
      text = text.split(m.from).join(m.to);
    }
    if (text !== orig) {
      fs.writeFileSync(extra, text);
      console.log("updated", path.relative(ROOT, extra));
    }
  }

  // Delete originals after successful conversion
  let deleted = 0;
  for (const m of mapping) {
    if (fs.existsSync(m.outFile) && fs.existsSync(m.file)) {
      fs.unlinkSync(m.file);
      deleted++;
    }
  }

  const before = mapping.reduce((s, m) => s + m.before, 0);
  const after = mapping.reduce((s, m) => s + m.after, 0);
  console.log(
    `\nDone: ${mapping.length} converted, ${touched} source files updated, ${deleted} originals removed`
  );
  console.log(
    `Payload: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB (−${(
      ((before - after) / before) *
      100
    ).toFixed(1)}%)`
  );

  fs.writeFileSync(
    path.join(ROOT, "scripts/webp-conversion-map.json"),
    JSON.stringify(mapping.map(({ from, to, before, after }) => ({ from, to, before, after })), null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
