import type { Locale } from "./types";

/**
 * Catalog entities carry one field per locale (nameAr / nameEn / nameEs).
 * Spanish arrived after the catalog was already in production, so its fields
 * are optional and fall back to English rather than showing Arabic to a
 * Spanish-speaking shopper.
 */
const FALLBACK_ORDER: Record<Locale, readonly Locale[]> = {
  ar: ["ar", "en", "es"],
  en: ["en", "ar", "es"],
  es: ["es", "en", "ar"],
};

const SUFFIX: Record<Locale, string> = {
  ar: "Ar",
  en: "En",
  es: "Es",
};

function readField(source: unknown, key: string): unknown {
  if (!source || typeof source !== "object") return undefined;
  return (source as Record<string, unknown>)[key];
}

/** Localized string for `field`, e.g. pickText(product, "name", "es"). */
export function pickText(
  source: unknown,
  field: string,
  locale: Locale
): string {
  for (const candidate of FALLBACK_ORDER[locale]) {
    const value = readField(source, `${field}${SUFFIX[candidate]}`);
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

/** Localized string list for `field`, e.g. pickList(product, "details", "es"). */
export function pickList(
  source: unknown,
  field: string,
  locale: Locale
): string[] {
  for (const candidate of FALLBACK_ORDER[locale]) {
    const value = readField(source, `${field}${SUFFIX[candidate]}`);
    if (Array.isArray(value) && value.length) {
      return value.filter((item): item is string => typeof item === "string");
    }
  }
  return [];
}
