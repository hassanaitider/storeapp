import type { CountryCode } from "@/lib/types";

/** Both pixels receive every event — Arab markets and LATAM alike. */
export const PIXEL_ARAB = "2098415630739868";
export const PIXEL_LATAM = "964436486676478";
export const ALL_PIXEL_IDS = [PIXEL_LATAM, PIXEL_ARAB];

export function pixelsForCountry(_country: string | null | undefined): string[] {
  return [...ALL_PIXEL_IDS];
}

/** Market of the page being viewed; set on <html data-market> by the layout and StoreProvider. */
export function currentPixelIds(): string[] {
  return [...ALL_PIXEL_IDS];
}

export function setPixelMarket(country: CountryCode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.market = country;
}
