import type { CurrencyCode, CurrencyInfo } from "./types";

/** Default retail FX rates relative to USD (admin can override) */
export const DEFAULT_CURRENCY_RATES: Record<CurrencyCode, number> = {
  SAR: 3.75,
  AED: 3.67,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.38,
  QAR: 3.64,
  IQD: 1310,
  EGP: 49.5,
  MAD: 10.0,
  USD: 1,
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
    symbol: "$",
    rate: DEFAULT_CURRENCY_RATES.USD,
    region: "usa",
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

export function formatLocalAmount(
  amount: number,
  code: string,
  locale: "ar" | "en" = "ar"
): string {
  const currency = getCurrency(code);
  const decimals = ["KWD", "BHD", "OMR"].includes(code)
    ? 3
    : code === "IQD"
      ? 0
      : 2;

  // Always Latin/French digits (0–9), never Eastern Arabic numerals
  const numberLocale = locale === "ar" ? "fr-FR" : "en-US";
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
  locale: "ar" | "en" = "ar"
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
