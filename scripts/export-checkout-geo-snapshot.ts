import { writeFileSync, mkdirSync } from "fs";
import { GEO_GT, GEO_CR, GEO_HN, GEO_SV, GEO_NI } from "../src/lib/latam-geo";
import { GEO_MX } from "../src/lib/mexico-geo";
import { GEO_AR } from "../src/lib/argentina-geo";
import { GEO_DO } from "../src/lib/dominican-geo";
import { GEO_EC } from "../src/lib/ecuador-geo";

type Tree = Record<string, Record<string, string[] | Record<string, unknown>>>;

function exportTree(tree: Tree) {
  const out: Record<string, Record<string, string[]>> = {};
  for (const [l1, l2] of Object.entries(tree)) {
    out[l1] = {};
    for (const [m, v] of Object.entries(l2 || {})) {
      if (Array.isArray(v)) out[l1][m] = v;
      else if (v && typeof v === "object") out[l1][m] = Object.keys(v);
      else out[l1][m] = [];
    }
  }
  return out;
}

const markets = {
  MX: {
    file: "src/lib/mexico-geo.ts",
    export: "GEO_MX",
    checkout: "MexicoCodCheckout",
    hierarchyUI: ["Estado", "Delegación / Municipio", "Colonia"],
    tree: exportTree(GEO_MX as Tree),
  },
  AR: {
    file: "src/lib/argentina-geo.ts",
    export: "GEO_AR",
    checkout: "ArgentinaCodCheckout",
    hierarchyUI: ["Provincia", "localidad"],
    tree: exportTree(GEO_AR as Tree),
  },
  DO: {
    file: "src/lib/dominican-geo.ts",
    export: "GEO_DO",
    checkout: "DominicanCodCheckout",
    hierarchyUI: ["Provincia", "Municipio/Ciudad"],
    tree: exportTree(GEO_DO as Tree),
  },
  EC: {
    file: "src/lib/ecuador-geo.ts",
    export: "GEO_EC",
    checkout: "EcuadorCodCheckout",
    hierarchyUI: ["Provincia", "Ciudad (parroquias)"],
    tree: exportTree(GEO_EC as Tree),
  },
  GT: {
    file: "src/lib/latam-geo.ts",
    export: "GEO_GT",
    checkout: "LatamCodCheckout",
    hierarchyUI: ["Departamento", "Municipio", "Poblado"],
    tree: exportTree(GEO_GT as Tree),
  },
  CR: {
    file: "src/lib/latam-geo.ts",
    export: "GEO_CR",
    checkout: "LatamCodCheckout",
    hierarchyUI: ["Provincia", "Cantón", "Distrito/Poblado"],
    tree: exportTree(GEO_CR as Tree),
  },
  HN: {
    file: "src/lib/latam-geo.ts",
    export: "GEO_HN",
    checkout: "HondurasCodCheckout",
    hierarchyUI: ["Departamento", "Ciudad/Municipio"],
    tree: exportTree(GEO_HN as Tree),
  },
  SV: {
    file: "src/lib/latam-geo.ts",
    export: "GEO_SV",
    checkout: "SalvadorCodCheckout",
    hierarchyUI: ["Provincia(=Departamento)", "Ciudad/Municipio"],
    tree: exportTree(GEO_SV as Tree),
  },
  NI: {
    file: "src/lib/latam-geo.ts",
    export: "GEO_NI",
    checkout: "NicaraguaCodCheckout",
    hierarchyUI: ["Departamento", "Municipio", "Barrio/Sector"],
    tree: exportTree(GEO_NI as Tree),
  },
} as const;

const compact: Record<string, unknown> = {
  generatedAt: new Date().toISOString(),
  markets: {} as Record<string, unknown>,
};

for (const [code, m] of Object.entries(markets)) {
  const l1 = Object.keys(m.tree).sort((a, b) => a.localeCompare(b, "es"));
  let l2 = 0;
  let l3 = 0;
  let stubCentro = 0;
  for (const d of l1) {
    const munis = Object.keys(m.tree[d]);
    l2 += munis.length;
    for (const x of munis) {
      const arr = m.tree[d][x] || [];
      l3 += arr.length;
      if (arr.length === 1 && arr[0] === "Centro") stubCentro++;
    }
  }
  (compact.markets as Record<string, unknown>)[code] = {
    file: m.file,
    export: m.export,
    checkout: m.checkout,
    hierarchyUI: m.hierarchyUI,
    counts: {
      level1: l1.length,
      level2: l2,
      level3: l3,
      stubCentroOnly: stubCentro,
    },
    level1: l1,
  };
}

mkdirSync("prompts", { recursive: true });
writeFileSync(
  "prompts/checkout-geo-snapshot.json",
  JSON.stringify(compact, null, 2)
);
console.log("wrote prompts/checkout-geo-snapshot.json");
console.log(JSON.stringify(compact, null, 2));
