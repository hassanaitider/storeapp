import { GEO_HN } from "./geo-hn";

export { usesHondurasCodCheckout } from "./cod-markets";

/** Honduras — exclusive COD checkout (not shared with other markets). */

/** Departamento (shown as Provincia in the COD form). */
export function hondurasProvincias(): string[] {
  return Object.keys(GEO_HN).sort((a, b) => a.localeCompare(b, "es"));
}

/** Municipio within a departamento. */
export function hondurasMunicipios(provincia: string): string[] {
  return Object.keys(GEO_HN[provincia] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}
