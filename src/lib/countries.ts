import type { CountryCode, CurrencyCode } from "./types";

export interface CountryInfo {
  code: CountryCode;
  nameAr: string;
  nameEn: string;
  currency: CurrencyCode;
  flag: string;
  /** Phone dial hint for checkout */
  dial: string;
}

export const COUNTRIES: CountryInfo[] = [
  {
    code: "MA",
    nameAr: "المغرب",
    nameEn: "Morocco",
    currency: "MAD",
    flag: "🇲🇦",
    dial: "+212",
  },
  {
    code: "SA",
    nameAr: "السعودية",
    nameEn: "Saudi Arabia",
    currency: "SAR",
    flag: "🇸🇦",
    dial: "+966",
  },
  {
    code: "AE",
    nameAr: "الإمارات",
    nameEn: "United Arab Emirates",
    currency: "AED",
    flag: "🇦🇪",
    dial: "+971",
  },
  {
    code: "OM",
    nameAr: "عُمان",
    nameEn: "Oman",
    currency: "OMR",
    flag: "🇴🇲",
    dial: "+968",
  },
  {
    code: "IQ",
    nameAr: "العراق",
    nameEn: "Iraq",
    currency: "IQD",
    flag: "🇮🇶",
    dial: "+964",
  },
  {
    code: "KW",
    nameAr: "الكويت",
    nameEn: "Kuwait",
    currency: "KWD",
    flag: "🇰🇼",
    dial: "+965",
  },
  {
    code: "BH",
    nameAr: "البحرين",
    nameEn: "Bahrain",
    currency: "BHD",
    flag: "🇧🇭",
    dial: "+973",
  },
  {
    code: "QA",
    nameAr: "قطر",
    nameEn: "Qatar",
    currency: "QAR",
    flag: "🇶🇦",
    dial: "+974",
  },
  {
    code: "EG",
    nameAr: "مصر",
    nameEn: "Egypt",
    currency: "EGP",
    flag: "🇪🇬",
    dial: "+20",
  },
  {
    code: "US",
    nameAr: "الولايات المتحدة",
    nameEn: "United States",
    currency: "USD",
    flag: "🇺🇸",
    dial: "+1",
  },
];

export const DEFAULT_COUNTRY: CountryCode = "SA";

/** Active store markets — these categories appear in the shop */
export const STORE_MARKET_CODES: CountryCode[] = ["MA", "SA", "AE", "OM"];

export const STORE_MARKETS: CountryInfo[] = COUNTRIES.filter((c) =>
  STORE_MARKET_CODES.includes(c.code)
);

export function getCountry(code: string): CountryInfo {
  return (
    COUNTRIES.find((c) => c.code === code.toUpperCase()) ??
    COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY)!
  );
}

export function currencyForCountry(code: CountryCode): CurrencyCode {
  return getCountry(code).currency;
}

export function isValidCountry(code: string): code is CountryCode {
  return COUNTRIES.some((c) => c.code === code.toUpperCase());
}

export function isStoreMarket(code: string): boolean {
  return STORE_MARKET_CODES.includes(code.toUpperCase() as CountryCode);
}

/**
 * Infer store market from browser timezone / locale when IP geo is unavailable
 * (common on localhost / home networks).
 */
export function countryFromLocationSettings(
  timeZone?: string,
  languages?: readonly string[]
): CountryCode | null {
  const tz = (timeZone || "").toLowerCase();

  if (
    tz.includes("casablanca") ||
    tz === "africa/casablanca" ||
    tz.includes("el_aaiun")
  ) {
    return "MA";
  }
  if (tz.includes("riyadh") || tz === "asia/riyadh") return "SA";
  if (tz.includes("dubai") || tz === "asia/dubai") return "AE";
  if (tz.includes("muscat") || tz === "asia/muscat") return "OM";

  const langs = languages ?? [];
  for (const lang of langs) {
    const l = lang.toLowerCase();
    if (l === "ar-ma" || l.endsWith("-ma") || l.includes("ma-")) return "MA";
    if (l === "ar-sa" || l.endsWith("-sa")) return "SA";
    if (l === "ar-ae" || l.endsWith("-ae")) return "AE";
    if (l === "ar-om" || l.endsWith("-om")) return "OM";
  }

  return null;
}

