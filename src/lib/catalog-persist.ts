import type { Category, Product, Order, CartItem, CurrencyCode, CountryCode, Locale } from "@/lib/types";

export const CATALOG_STORAGE_KEY = "cargolf-v38";

export const LEGACY_STORAGE_KEYS = [
  "cargolf-v37",
  "cargolf-v36",
  "cargolf-v35",
  "cargolf-v34",
  "cargolf-v33",
  "cargolf-v30",
  "cargolf-v29",
  "cargolf-v28",
  "cargolf-v27",
  "cargolf-v26",
  "cargolf-v25",
  "cargolf-v24",
  "cargolf-v23",
  "cargolf-v22",
  "cargolf-v21",
  "cargolf-v20",
  "cargolf-v19",
  "cargolf-v18",
  "cargolf-v17",
  "cargolf-v16",
  "cargolf-v15",
  "cargolf-v14",
  "cargolf-v13",
  "smart-shop-v12",
  "smart-shop-v11",
  "smart-shop-v10",
  "smart-shop-v9",
  "smart-shop-v8",
  "smart-shop-v7",
  "smart-shop-v6",
  "smart-shop-v5",
  "smart-shop-v4",
  "smart-shop-v3",
  "cargolf-store-v1",
];

export type PersistedCatalog = {
  updatedAt: number;
  categories: Category[];
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  locale: Locale;
  currency: CurrencyCode;
  country: CountryCode;
  countryManual: boolean;
  currencyManual: boolean;
  localeManual: boolean;
  currencyRates: Record<CurrencyCode, number>;
  /** When false, upsell blocks are hidden on the storefront */
  upsellEnabled?: boolean;
};

const MAX_CHARS = 4_000_000;

/** Drop only enormous base64 blobs — allow large compressed uploads. */
export function stripDataUrls(value: string | undefined | null): string {
  if (!value) return "";
  if (value.startsWith("data:")) {
    const ok =
      value.length <= 1_500_000 &&
      /^data:(image\/[a-z0-9.+-]+|application\/octet-stream);base64,/i.test(
        value
      );
    return ok ? value : "";
  }
  return value;
}

export function sanitizeProduct(p: Product): Product {
  return {
    ...p,
    images: (p.images ?? []).map(stripDataUrls).filter(Boolean),
    landing: p.landing
      ? {
          ...p.landing,
          sections: (p.landing.sections ?? []).map((s) => ({
            ...s,
            image: stripDataUrls(s.image),
          })),
        }
      : p.landing,
  };
}

export function sanitizeCategory(c: Category): Category {
  return {
    ...c,
    image: stripDataUrls(c.image),
  };
}

export function sanitizeCatalog(
  data: PersistedCatalog
): PersistedCatalog {
  return {
    ...data,
    updatedAt: data.updatedAt || Date.now(),
    categories: (data.categories ?? []).map(sanitizeCategory),
    products: (data.products ?? []).map(sanitizeProduct),
    orders: Array.isArray(data.orders) ? data.orders : [],
    cart: Array.isArray(data.cart) ? data.cart : [],
  };
}

export function catalogToJson(data: PersistedCatalog): string {
  let clean = sanitizeCatalog(data);
  let raw = JSON.stringify(clean);
  if (raw.length <= MAX_CHARS) return raw;

  // Prefer keeping newest uploads (end of list) when space is tight
  clean = {
    ...clean,
    orders: [],
    products: clean.products.map((p) => ({
      ...p,
      landing: undefined,
      images: (p.images ?? []).slice(-3),
    })),
  };
  raw = JSON.stringify(clean);
  return raw.length <= MAX_CHARS ? raw : JSON.stringify({
    ...clean,
    products: clean.products.map((p) => ({
      ...p,
      descriptionAr: (p.descriptionAr ?? "").slice(0, 200),
      descriptionEn: (p.descriptionEn ?? "").slice(0, 200),
      descriptionEs: (p.descriptionEs ?? "").slice(0, 200),
      detailsAr: [],
      detailsEn: [],
      detailsEs: [],
    })),
  });
}

export function parseCatalogJson(raw: string): PersistedCatalog | null {
  try {
    if (!raw || raw.length > 2_000_000) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedCatalog>;
    if (!parsed || typeof parsed !== "object") return null;
    return sanitizeCatalog({
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      products: Array.isArray(parsed.products) ? parsed.products : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      locale:
        parsed.locale === "en" || parsed.locale === "es"
          ? parsed.locale
          : "ar",
      currency: (parsed.currency as CurrencyCode) || "USD",
      country: (parsed.country as CountryCode) || "MA",
      countryManual: Boolean(parsed.countryManual),
      currencyManual: Boolean(parsed.currencyManual),
      localeManual: Boolean(parsed.localeManual),
      currencyRates: (parsed.currencyRates ?? {}) as Record<CurrencyCode, number>,
      upsellEnabled: parsed.upsellEnabled !== false,
    });
  } catch {
    return null;
  }
}
