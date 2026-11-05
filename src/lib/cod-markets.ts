import type { CountryCode } from "./types";

/**
 * Tiny market switches for COD UI — keep these free of geo JSON so product
 * pages do not pull megabyte trees into the main bundle.
 */

export const LATAM_COD_CHECKOUT_MARKETS: CountryCode[] = ["GT", "CR"];

export type CodCheckoutKind =
  | "argentina"
  | "mexico"
  | "dominican"
  | "ecuador"
  | "salvador"
  | "honduras"
  | "nicaragua"
  | "latam";

/** Markets with a dedicated geo-aware COD form; every other market uses the quick form. */
const COD_CHECKOUT_KIND_BY_MARKET: Partial<Record<CountryCode, CodCheckoutKind>> = {
  AR: "argentina",
  MX: "mexico",
  DO: "dominican",
  EC: "ecuador",
  SV: "salvador",
  HN: "honduras",
  NI: "nicaragua",
  GT: "latam",
  CR: "latam",
};

export function codCheckoutKind(country: string): CodCheckoutKind | null {
  return COD_CHECKOUT_KIND_BY_MARKET[country.toUpperCase() as CountryCode] ?? null;
}

export function usesLatamCodCheckout(country: string): boolean {
  return LATAM_COD_CHECKOUT_MARKETS.includes(
    country.toUpperCase() as CountryCode
  );
}

export function usesArgentinaCodCheckout(country: string): boolean {
  return country.toUpperCase() === "AR";
}

export function usesMexicoCodCheckout(country: string): boolean {
  return country.toUpperCase() === "MX";
}

export function usesDominicanCodCheckout(country: string): boolean {
  return country.toUpperCase() === "DO";
}

export function usesEcuadorCodCheckout(country: string): boolean {
  return country.toUpperCase() === "EC";
}

export function usesSalvadorCodCheckout(country: string): boolean {
  return country.toUpperCase() === "SV";
}

export function usesHondurasCodCheckout(country: string): boolean {
  return country.toUpperCase() === "HN";
}

export function usesNicaraguaCodCheckout(country: string): boolean {
  return country.toUpperCase() === "NI";
}
