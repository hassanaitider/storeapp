import { SPANISH_MARKET_CODES } from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

/** Each pixel only ever receives events from its own markets — never both. */
export const PIXEL_ARAB = "964436486676478";
export const PIXEL_LATAM = "964436486676478";
export const ALL_PIXEL_IDS = [PIXEL_LATAM, PIXEL_ARAB];

export function pixelForCountry(country: string | null | undefined): string {
  return country && (SPANISH_MARKET_CODES as string[]).includes(country)
    ? PIXEL_LATAM
    : PIXEL_ARAB;
}

/** Market of the page being viewed; set on <html data-market> by the layout and StoreProvider. */
export function currentPixelId(): string {
  if (typeof document === "undefined") return PIXEL_ARAB;
  return pixelForCountry(document.documentElement.dataset.market);
}

export function setPixelMarket(country: CountryCode) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.market = country;
}
