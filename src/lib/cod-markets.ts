import type { CountryCode } from "./types";

/**
 * Tiny market switches for COD UI — keep these free of geo JSON so product
 * pages do not pull megabyte trees into the main bundle.
 */

export const LATAM_COD_CHECKOUT_MARKETS: CountryCode[] = ["GT", "CR"];

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
