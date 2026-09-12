import type { CurrencyCode, CurrencyInfo, Locale } from "./types";

/** Default retail FX rates relative to USD (admin can override) */
export const DEFAULT_CURRENCY_RATES: Record<CurrencyCode, number> = {
  SAR: 3.75,
  AED: 3.67,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.38,
  QAR: 3.64,
  IQD: 1310,
  LYD: 5.5,
  EGP: 49.5,
  MAD: 10.0,
  USD: 1,
  MXN: 18.5,
  ARS: 1050,
  CRC: 510,
  GTQ: 7.75,
  HNL: 25.5,
  NIO: 36.8,
  DOP: 60.5,
};

/** Approximate retail FX rates relative to USD (display) */
export const CURRENCIES: CurrencyInfo[] = [
  {
    code: "SAR",
    nameAr: "ريال سعودي",
    nameEn: "Saudi Riyal",
    symbol: "ر.س",
    rate: DEFAULT_CURRENCY_RATES.SAR,
    region: "gulf",
  },
  {
    code: "AED",
    nameAr: "درهم إماراتي",
    nameEn: "UAE Dirham",
    symbol: "د.إ",
    rate: DEFAULT_CURRENCY_RATES.AED,
    region: "gulf",
  },
  {
    code: "KWD",
    nameAr: "دينار كويتي",
    nameEn: "Kuwaiti Dinar",
    symbol: "د.ك",
    rate: DEFAULT_CURRENCY_RATES.KWD,
    region: "gulf",
  },
  {
    code: "BHD",
    nameAr: "دينار بحريني",
    nameEn: "Bahraini Dinar",
    symbol: "د.ب",
    rate: DEFAULT_CURRENCY_RATES.BHD,
    region: "gulf",
  },
  {
    code: "OMR",
    nameAr: "ريال عماني",
    nameEn: "Omani Rial",
    symbol: "ر.ع",
    rate: DEFAULT_CURRENCY_RATES.OMR,
    region: "gulf",
  },
  {
    code: "QAR",
    nameAr: "ريال قطري",
    nameEn: "Qatari Riyal",
    symbol: "ر.ق",
    rate: DEFAULT_CURRENCY_RATES.QAR,
    region: "gulf",
  },
  {
    code: "IQD",
    nameAr: "دينار عراقي",
    nameEn: "Iraqi Dinar",
    symbol: "د.ع",
    rate: DEFAULT_CURRENCY_RATES.IQD,
    region: "mena",
  },
  {
    code: "LYD",
    nameAr: "دينار ليبي",
    nameEn: "Libyan Dinar",
    symbol: "د.ل",
    rate: DEFAULT_CURRENCY_RATES.LYD,
    region: "mena",
  },
  {
    code: "EGP",
    nameAr: "جنيه مصري",
    nameEn: "Egyptian Pound",
    symbol: "ج.م",
    rate: DEFAULT_CURRENCY_RATES.EGP,
    region: "mena",
  },
  {
    code: "MAD",
    nameAr: "درهم مغربي",
    nameEn: "Moroccan Dirham",
    symbol: "د.م",
    rate: DEFAULT_CURRENCY_RATES.MAD,
    region: "morocco",
  },
  {
    code: "USD",
    nameAr: "دولار أمريكي",
    nameEn: "US Dollar",
    nameEs: "Dólar estadounidense",
    symbol: "$",
    rate: DEFAULT_CURRENCY_RATES.USD,
    region: "usa",
  },
  {
    code: "MXN",
    nameAr: "بيزو مكسيكي",
    nameEn: "Mexican Peso",
    nameEs: "Peso mexicano",
    // "MX$" rather than "$" so it never reads as USD in a multi-market store
    symbol: "MX$",
    rate: DEFAULT_CURRENCY_RATES.MXN,
    region: "latam",
  },
  {
    code: "ARS",
    nameAr: "بيزو أرجنتيني",
    nameEn: "Argentine Peso",
    nameEs: "Peso argentino",
    symbol: "AR$",
    rate: DEFAULT_CURRENCY_RATES.ARS,
    region: "latam",
  },
  {
    code: "CRC",
    nameAr: "كولون كوستاريكي",
    nameEn: "Costa Rican Colón",
    nameEs: "Colón costarricense",
    symbol: "₡",
    rate: DEFAULT_CURRENCY_RATES.CRC,
    region: "latam",
  },
  {
    code: "GTQ",
    nameAr: "كيتزال غواتيمالي",
    nameEn: "Guatemalan Quetzal",
    nameEs: "Quetzal guatemalteco",
    symbol: "Q",
    rate: DEFAULT_CURRENCY_RATES.GTQ,
    region: "latam",
  },
  {
    code: "HNL",
    nameAr: "لمبيرة هندوراسية",
    nameEn: "Honduran Lempira",
    nameEs: "Lempira hondureño",
    symbol: "L",
    rate: DEFAULT_CURRENCY_RATES.HNL,
    region: "latam",
  },
  {
    code: "NIO",
    nameAr: "كوردوبا نيكاراغوية",
    nameEn: "Nicaraguan Córdoba",
    nameEs: "Córdoba nicaragüense",
    symbol: "C$",
    rate: DEFAULT_CURRENCY_RATES.NIO,
    region: "latam",
  },
  {
    code: "DOP",
    nameAr: "بيزو دومينيكاني",
    nameEn: "Dominican Peso",
    nameEs: "Peso dominicano",
    symbol: "RD$",
    rate: DEFAULT_CURRENCY_RATES.DOP,
    region: "latam",
  },
];

/** Runtime overrides from admin / localStorage */
let rateOverrides: Partial<Record<CurrencyCode, number>> = {};

export function setCurrencyRateOverrides(
  overrides: Partial<Record<CurrencyCode, number>> | undefined
) {
  rateOverrides = { ...(overrides ?? {}) };
}

export function getCurrencyRateOverrides(): Partial<
  Record<CurrencyCode, number>
> {
  return { ...rateOverrides };
}

export function getCurrency(code: string): CurrencyInfo {
  const base = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  const override = rateOverrides[base.code];
  if (typeof override === "number" && override > 0) {
    return { ...base, rate: override };
  }
  return base;
}

export function convertFromUSD(amountUSD: number, code: string): number {
  const currency = getCurrency(code);
  return amountUSD * currency.rate;
}

export function convertToUSD(localAmount: number, code: string): number {
  const rate = getCurrency(code).rate || 1;
  return localAmount / rate;
}

/**
 * Rounds an FX-converted amount to a figure that reads like a shelf price.
 * Only for prices with no hand-set market value — USD is already retail.
 */
export function retailRound(amount: number, code: string): number {
  if (code === "USD" || !(amount > 0)) return amount;
  if (amount >= 10000) return Math.round(amount / 1000) * 1000;
  if (amount >= 1000) return Math.round(amount / 100) * 100;
  if (amount >= 100) return Math.round(amount / 10) * 10 - 1;
  if (amount >= 20) return Math.round(amount) - 0.1;
  return Math.round(amount * 10) / 10;
}

export function formatLocalAmount(
  amount: number,
  code: string,
  locale: Locale = "ar"
): string {
  const currency = getCurrency(code);
  // Gulf dinars quote 3 decimals; IQD, ARS and CRC are never quoted in cents
  const decimals = ["KWD", "BHD", "OMR"].includes(code)
    ? 3
    : ["IQD", "ARS", "CRC"].includes(code)
      ? 0
      : 2;

  // Always Latin/French digits (0–9), never Eastern Arabic numerals
  const numberLocale =
    locale === "ar" ? "fr-FR" : locale === "es" ? "es-MX" : "en-US";
  const formatted = new Intl.NumberFormat(numberLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  if (code === "USD") {
    return locale === "ar" ? `${formatted} $` : `$${formatted}`;
  }

  return locale === "ar"
    ? `${formatted} ${currency.symbol}`
    : `${currency.symbol} ${formatted}`;
}

export function formatPrice(
  amountUSD: number,
  code: string,
  locale: Locale = "ar"
): string {
  return formatLocalAmount(convertFromUSD(amountUSD, code), code, locale);
}

export function isCurrencyCode(code: string): code is CurrencyCode {
  return CURRENCIES.some((c) => c.code === code);
}

export function mergeCurrencyRates(
  stored: Partial<Record<CurrencyCode, number>> | undefined
): Record<CurrencyCode, number> {
  return {
    ...DEFAULT_CURRENCY_RATES,
    ...(stored ?? {}),
  };
}
