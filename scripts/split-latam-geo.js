const fs = require("fs");
const path = "c:/Users/ADM/store cargolf/src/lib/latam-geo.ts";
const src = fs.readFileSync(path, "utf8");
const lines = src.split(/\r?\n/);
const markers = [
  { name: "GT", start: "export const GEO_GT" },
  { name: "CR", start: "export const GEO_CR" },
  { name: "HN", start: "export const GEO_HN" },
  { name: "SV", start: "export const GEO_SV" },
  { name: "NI", start: "export const GEO_NI" },
];
function findLine(prefix) {
  const i = lines.findIndex((l) => l.startsWith(prefix));
  if (i < 0) throw new Error("missing " + prefix);
  return i;
}
const idxs = markers.map((m) => findLine(m.start));
const applyIdx = lines.findIndex((l) => l.startsWith("applyNicaraguaFufills"));
const geoTreeIdx = lines.findIndex((l) =>
  l.startsWith("export function geoTreeForCountry")
);
if (applyIdx < 0 || geoTreeIdx < 0) throw new Error("markers missing");
const outDir = "c:/Users/ADM/store cargolf/src/lib";
const header =
  'import type { LatamGeoTree } from "./latam-geo-types";\n\n';
for (let i = 0; i < markers.length; i++) {
  const start = idxs[i];
  let body;
  if (markers[i].name === "NI") {
    body = lines.slice(start, geoTreeIdx).join("\n").trimEnd() + "\n";
  } else {
    const end = idxs[i + 1];
    body = lines.slice(start, end).join("\n").trimEnd() + "\n";
  }
  const file = `${outDir}/geo-${markers[i].name.toLowerCase()}.ts`;
  fs.writeFileSync(file, header + body);
  console.log("wrote", file, "lines", body.split(/\n/).length);
}
fs.writeFileSync(
  `${outDir}/latam-geo-types.ts`,
  "/** Cascading location tree: Departamento → Municipio → Poblado[] */\nexport type LatamGeoTree = Record<string, Record<string, string[]>>;\n"
);
const barrel = `import type { CountryCode } from "./types";
import type { LatamGeoTree } from "./latam-geo-types";

export type { LatamGeoTree } from "./latam-geo-types";
export {
  LATAM_COD_CHECKOUT_MARKETS,
  usesArgentinaCodCheckout,
  usesLatamCodCheckout,
} from "./cod-markets";

export { GEO_GT } from "./geo-gt";
export { GEO_CR } from "./geo-cr";
export { GEO_HN } from "./geo-hn";
export { GEO_SV } from "./geo-sv";
export { GEO_NI } from "./geo-ni";

import { GEO_GT } from "./geo-gt";
import { GEO_CR } from "./geo-cr";
import { GEO_HN } from "./geo-hn";
import { GEO_SV } from "./geo-sv";
import { GEO_NI } from "./geo-ni";

export function geoTreeForCountry(country: CountryCode): LatamGeoTree | null {
  if (country === "GT") return GEO_GT;
  if (country === "CR") return GEO_CR;
  if (country === "HN") return GEO_HN;
  if (country === "SV") return GEO_SV;
  if (country === "NI") return GEO_NI;
  return null;
}

export function codFormLabel(country: CountryCode): string {
  if (country === "GT") return "COD FORM GUATEMALA";
  if (country === "CR") return "COD FORM COSTA RICA";
  if (country === "HN") return "COD FORM HONDURAS";
  if (country === "SV") return "COD FORM SALVADOR";
  if (country === "NI") return "COD FORM NICARAGUA";
  if (country === "AR") return "COD FORM ARGENTINA";
  return "COD FORM";
}
`;
fs.writeFileSync(`${outDir}/latam-geo.ts`, barrel);
console.log("rewrote latam-geo.ts barrel");
