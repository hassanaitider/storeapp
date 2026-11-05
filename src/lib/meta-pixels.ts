import type { CountryCode } from "@/lib/types";

/** Both pixels receive every event — Arab markets and LATAM alike. */
export const LATAM_PIXEL_ID = "964436486676478";
export const ARAB_PIXEL_ID = "2098415630739868";
export const ALL_PIXEL_IDS = [LATAM_PIXEL_ID, ARAB_PIXEL_ID];

export function pixelIdsForCountry(_country: CountryCode): string[] {
  return [...ALL_PIXEL_IDS];
}

let activePixelIds: string[] | null = null;

export function setActivePixelCountry(_country: CountryCode): void {
  activePixelIds = [...ALL_PIXEL_IDS];
}

export function getActivePixelIds(): string[] {
  // Never skip Purchase: if country wasn't set yet, fire both pixels.
  return activePixelIds ?? [...ALL_PIXEL_IDS];
}
