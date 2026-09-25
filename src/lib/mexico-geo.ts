import geoMx from "./mexico-geo-data.json";

export { usesMexicoCodCheckout } from "./cod-markets";

/** Mexico — Estado → Municipio → Colonia from Fufills COD coverage. */
export type MexicoGeoTree = Record<string, Record<string, string[]>>;

export const GEO_MX: MexicoGeoTree = geoMx as MexicoGeoTree;

export function mexicoEstados(): string[] {
  return Object.keys(GEO_MX).sort((a, b) => a.localeCompare(b, "es"));
}

export function mexicoMunicipios(estado: string): string[] {
  return Object.keys(GEO_MX[estado] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export function mexicoColonias(estado: string, municipio: string): string[] {
  return GEO_MX[estado]?.[municipio] ?? [];
}
