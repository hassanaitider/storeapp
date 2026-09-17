import type { CountryCode, CurrencyCode, Locale } from "./types";

export interface CountryInfo {
  code: CountryCode;
  nameAr: string;
  nameEn: string;
  nameEs?: string;
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
    nameEs: "Marruecos",
    currency: "MAD",
    flag: "🇲🇦",
    dial: "+212",
  },
  {
    code: "SA",
    nameAr: "السعودية",
    nameEn: "Saudi Arabia",
    nameEs: "Arabia Saudita",
    currency: "SAR",
    flag: "🇸🇦",
    dial: "+966",
  },
  {
    code: "AE",
    nameAr: "الإمارات",
    nameEn: "United Arab Emirates",
    nameEs: "Emiratos Árabes Unidos",
    currency: "AED",
    flag: "🇦🇪",
    dial: "+971",
  },
  {
    code: "OM",
    nameAr: "عُمان",
    nameEn: "Oman",
    nameEs: "Omán",
    currency: "OMR",
    flag: "🇴🇲",
    dial: "+968",
  },
  {
    code: "IQ",
    nameAr: "العراق",
    nameEn: "Iraq",
    nameEs: "Irak",
    currency: "IQD",
    flag: "🇮🇶",
    dial: "+964",
  },
  {
    code: "LY",
    nameAr: "ليبيا",
    nameEn: "Libya",
    nameEs: "Libia",
    currency: "LYD",
    flag: "🇱🇾",
    dial: "+218",
  },
  {
    code: "LB",
    nameAr: "لبنان",
    nameEn: "Lebanon",
    nameEs: "Líbano",
    currency: "LBP",
    flag: "🇱🇧",
    dial: "+961",
  },
  {
    code: "MX",
    nameAr: "المكسيك",
    nameEn: "Mexico",
    nameEs: "México",
    currency: "MXN",
    flag: "🇲🇽",
    dial: "+52",
  },
  {
    code: "AR",
    nameAr: "الأرجنتين",
    nameEn: "Argentina",
    nameEs: "Argentina",
    currency: "ARS",
    flag: "🇦🇷",
    dial: "+54",
  },
  {
    code: "CR",
    nameAr: "كوستاريكا",
    nameEn: "Costa Rica",
    nameEs: "Costa Rica",
    currency: "CRC",
    flag: "🇨🇷",
    dial: "+506",
  },
  {
    code: "EC",
    nameAr: "الإكوادور",
    nameEn: "Ecuador",
    nameEs: "Ecuador",
    // Ecuador uses the US dollar
    currency: "USD",
    flag: "🇪🇨",
    dial: "+593",
  },
  {
    code: "GT",
    nameAr: "غواتيمالا",
    nameEn: "Guatemala",
    nameEs: "Guatemala",
    currency: "GTQ",
    flag: "🇬🇹",
    dial: "+502",
  },
  {
    code: "HN",
    nameAr: "هندوراس",
    nameEn: "Honduras",
    nameEs: "Honduras",
    currency: "HNL",
    flag: "🇭🇳",
    dial: "+504",
  },
  {
    code: "SV",
    nameAr: "السلفادور",
    nameEn: "El Salvador",
    nameEs: "El Salvador",
    // El Salvador uses the US dollar
    currency: "USD",
    flag: "🇸🇻",
    dial: "+503",
  },
  {
    code: "NI",
    nameAr: "نيكاراغوا",
    nameEn: "Nicaragua",
    nameEs: "Nicaragua",
    currency: "NIO",
    flag: "🇳🇮",
    dial: "+505",
  },
  {
    code: "DO",
    nameAr: "الدومينيكان",
    nameEn: "Dominican Republic",
    nameEs: "República Dominicana",
    currency: "DOP",
    flag: "🇩🇴",
    dial: "+1809",
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
export const STORE_MARKET_CODES: CountryCode[] = [
  "MA",
  "SA",
  "AE",
  "OM",
  "IQ",
  "LY",
  "LB",
  "MX",
  "AR",
  "CR",
  "EC",
  "GT",
  "HN",
  "SV",
  "NI",
  "DO",
];

/** Markets where the storefront defaults to Spanish */
export const SPANISH_MARKET_CODES: CountryCode[] = [
  "MX",
  "AR",
  "CR",
  "EC",
  "GT",
  "HN",
  "SV",
  "NI",
  "DO",
];

/**
 * South America Spanish markets — COD upsell shows 3 quantity packs.
 * (Central America / MX / DO stay at 2 packs.)
 */
export const SOUTH_AMERICA_MARKET_CODES: CountryCode[] = ["AR", "EC"];

export function isSpanishMarket(code: string): boolean {
  return SPANISH_MARKET_CODES.includes(code.toUpperCase() as CountryCode);
}

export function isSouthAmericaMarket(code: string): boolean {
  return SOUTH_AMERICA_MARKET_CODES.includes(
    code.toUpperCase() as CountryCode
  );
}

/** Language a market opens in before the visitor picks one themselves */
export function localeForCountry(code: CountryCode): Locale {
  return isSpanishMarket(code) ? "es" : "ar";
}

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
  if (tz.includes("tripoli") || tz === "africa/tripoli") return "LY";
  if (tz.includes("riyadh") || tz === "asia/riyadh") return "SA";
  if (tz.includes("dubai") || tz === "asia/dubai") return "AE";
  if (tz.includes("muscat") || tz === "asia/muscat") return "OM";
  if (tz.includes("baghdad") || tz === "asia/baghdad") return "IQ";
  if (tz.includes("beirut") || tz === "asia/beirut") return "LB";

  if (tz.includes("mexico_city") || tz.includes("monterrey") || tz.includes("cancun")) {
    return "MX";
  }
  if (tz.includes("argentina") || tz.includes("buenos_aires")) return "AR";
  if (tz.includes("costa_rica")) return "CR";
  if (tz.includes("guayaquil") || tz.includes("galapagos")) return "EC";
  if (tz.includes("guatemala")) return "GT";
  if (tz.includes("tegucigalpa")) return "HN";
  if (tz.includes("el_salvador")) return "SV";
  if (tz.includes("managua")) return "NI";
  if (tz.includes("santo_domingo")) return "DO";

  const langs = languages ?? [];
  for (const lang of langs) {
    const l = lang.toLowerCase();
    if (l === "ar-ma" || l.endsWith("-ma") || l.includes("ma-")) return "MA";
    if (l === "ar-sa" || l.endsWith("-sa")) return "SA";
    if (l === "ar-ae" || l.endsWith("-ae")) return "AE";
    if (l === "ar-om" || l.endsWith("-om")) return "OM";
    if (l === "ar-iq" || l.endsWith("-iq")) return "IQ";
    if (l === "ar-ly" || l.endsWith("-ly")) return "LY";
    if (l === "ar-lb" || l.endsWith("-lb")) return "LB";
    if (l === "es-mx") return "MX";
    if (l === "es-ar") return "AR";
    if (l === "es-cr") return "CR";
    if (l === "es-ec") return "EC";
    if (l === "es-gt") return "GT";
    if (l === "es-hn") return "HN";
    if (l === "es-sv") return "SV";
    if (l === "es-ni") return "NI";
    if (l === "es-do") return "DO";
  }

  return null;
}

