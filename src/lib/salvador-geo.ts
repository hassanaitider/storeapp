import { GEO_SV } from "./latam-geo";

/** El Salvador — Provincia (departamento) → Ciudad/Municipio[] */
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
