import { GEO_NI } from "./geo-ni";

export { usesNicaraguaCodCheckout } from "./cod-markets";

/** Nicaragua — exclusive COD checkout (not shared with other markets). */

export function nicaraguaDepartamentos(): string[] {
  return Object.keys(GEO_NI).sort((a, b) => a.localeCompare(b, "es"));
}

export function nicaraguaMunicipios(departamento: string): string[] {
  return Object.keys(GEO_NI[departamento] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

/** Barrio / Sector options from the GEO_NI poblado list. */
export function nicaraguaBarrios(
  departamento: string,
  municipio: string
): string[] {
  return [...(GEO_NI[departamento]?.[municipio] ?? [])].sort((a, b) =>
    a.localeCompare(b, "es")
  );
}
