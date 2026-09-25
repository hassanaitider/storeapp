import type { CountryCode } from "./types";

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
export { geoTreeForLatamCod } from "./latam-cod-geo";

/** Label only — no geo JSON. */
export function codFormLabel(country: CountryCode): string {
  if (country === "GT") return "COD FORM GUATEMALA";
  if (country === "CR") return "COD FORM COSTA RICA";
  if (country === "HN") return "COD FORM HONDURAS";
  if (country === "SV") return "COD FORM SALVADOR";
  if (country === "NI") return "COD FORM NICARAGUA";
  if (country === "AR") return "COD FORM ARGENTINA";
  return "COD FORM";
}
