import type { CountryCode } from "./types";
import type { LatamGeoTree } from "./latam-geo-types";
import { GEO_CR } from "./geo-cr";
import { GEO_GT } from "./geo-gt";

/** GT / CR trees for shared LatamCodCheckout — does not pull HN/SV/NI. */
export function geoTreeForLatamCod(country: CountryCode): LatamGeoTree | null {
  if (country === "GT") return GEO_GT;
  if (country === "CR") return GEO_CR;
  return null;
}
