import { GEO_HN } from "./latam-geo";

/** Honduras — exclusive COD checkout (not shared with other markets). */
export function usesHondurasCodCheckout(country: string): boolean {
  return country.toUpperCase() === "HN";
}

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
