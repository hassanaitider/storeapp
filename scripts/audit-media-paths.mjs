import fs from "fs";
import path from "path";

const roots = ["src/lib/seed.ts", "src/lib/site.ts", "src/app/layout.tsx"];
const text = roots.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const re = /["'`](\/[^"'`]+?\.(?:png|jpe?g|webp|gif|svg|avif))(?:\?[^"'`]*)?["'`]/gi;
const paths = new Set();
for (const m of text.matchAll(re)) paths.add(m[1].split("?")[0]);

const missing = [];
const ok = [];
for (const p of [...paths].sort()) {
  const file = path.join("public", p.replace(/^\//, ""));
  if (fs.existsSync(file)) ok.push({ path: p, bytes: fs.statSync(file).size });
  else missing.push(p);
}

const orphanPublic = [];
function walk(dir, base = "") {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = "/" + path.join(base, name).replace(/\\/g, "/");
    if (fs.statSync(full).isDirectory()) walk(full, path.join(base, name));
    else if (/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(name)) {
      if (!paths.has(rel) && !rel.includes("/uploads/")) orphanPublic.push(rel);
    }
  }
}
walk("public");

console.log(
  JSON.stringify(
    {
      referenced: paths.size,
      present: ok.length,
      missing,
      orphanPublicNotInSeed: orphanPublic,
      uploadRoute: fs.existsSync("src/app/api/upload/route.ts"),
      mediaRoute: fs.existsSync("src/app/api/media/[name]/route.ts"),
      uploadsDir: fs.existsSync("public/uploads"),
    },
    null,
    2
  )
);
