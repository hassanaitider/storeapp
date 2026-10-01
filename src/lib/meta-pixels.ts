import { SPANISH_MARKET_CODES } from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

/** Each pixel only ever receives its own markets' events — never both. */
export const LATAM_PIXEL_ID = "964436486676478";
export const ARAB_PIXEL_ID = "2098415630739868";

export function pixelIdForCountry(country: CountryCode): string {
  return SPANISH_MARKET_CODES.includes(country) ? LATAM_PIXEL_ID : ARAB_PIXEL_ID;
}

let activePixelId: string | null = null;

export function setActivePixelCountry(country: CountryCode): void {
  activePixelId = pixelIdForCountry(country);
}

export function getActivePixelId(): string | null {
  return activePixelId;
}
