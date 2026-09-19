import { GEO_HN } from "./latam-geo";
import { mergePlaceOptions } from "./latam-neighborhoods";

/** Honduras — exclusive COD checkout (not shared with other markets). */
export function usesHondurasCodCheckout(country: string): boolean {
  return country.toUpperCase() === "HN";
}

/** Departamento. */
export function hondurasProvincias(): string[] {
  return Object.keys(GEO_HN).sort((a, b) => a.localeCompare(b, "es"));
}

/** Municipio within a departamento. */
export function hondurasMunicipios(provincia: string): string[] {
  return Object.keys(GEO_HN[provincia] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

/** Barrio / colonia within a municipio. */
export function hondurasBarrios(departamento: string, municipio: string): string[] {
  return mergePlaceOptions(
    "HN",
    departamento,
    municipio,
    GEO_HN[departamento]?.[municipio] ?? []
  );
}
