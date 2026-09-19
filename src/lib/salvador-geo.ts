import { GEO_SV } from "./latam-geo";
import { mergePlaceOptions } from "./latam-neighborhoods";

/** El Salvador — Departamento → Municipio / Distrito. */
export function usesSalvadorCodCheckout(country: string): boolean {
  return country.toUpperCase() === "SV";
}

export function salvadorProvincias(): string[] {
  return Object.keys(GEO_SV).sort((a, b) => a.localeCompare(b, "es"));
}

export function salvadorMunicipios(provincia: string): string[] {
  return Object.keys(GEO_SV[provincia] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export function salvadorColonias(departamento: string, municipio: string): string[] {
  return mergePlaceOptions(
    "SV",
    departamento,
    municipio,
    GEO_SV[departamento]?.[municipio] ?? []
  );
}
