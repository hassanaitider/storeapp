"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "@/lib/seed";
import { isRetiredStoreProduct } from "@/lib/seed-universal-products";
import {
  currencyForCountry,
  DEFAULT_COUNTRY,
  countryFromLocationSettings,
  isSpanishMarket,
  isStoreMarket,
  isValidCountry,
  localeForCountry,
  usesLatamThreeQtyPacks,
} from "@/lib/countries";
import { isDurableMediaUrl } from "@/lib/media-url";
import {
  DEFAULT_CURRENCY_RATES,
  convertFromUSD,
  isCurrencyCode,
  mergeCurrencyRates,
  setCurrencyRateOverrides,
} from "@/lib/currency";
import {
  filterCategoriesForCountry,
  filterProductsForCountry,
  getProductPriceUSD,
  isProductAvailableIn,
  resolveProductMarket,
} from "@/lib/pricing";
import {
  cartItemLineUSD,
  isCodQtyUpsellEnabled,
  withLatamThreeQtyOffers,
} from "@/lib/qty-upsell";
import {
  trackAddToCart,
  trackPurchase,
} from "@/lib/meta-pixel";
import {
  CATALOG_STORAGE_KEY,
  LEGACY_STORAGE_KEYS,
  catalogToJson,
  parseCatalogJson,
  sanitizeCatalog,
  type PersistedCatalog,
} from "@/lib/catalog-persist";
import { isLocale } from "@/lib/i18n";
import type {
  CartItem,
  Category,
  CountryCode,
  CurrencyCode,
  Locale,
  Order,
  Product,
  ProductLanding,
} from "@/lib/types";

interface StoreState {
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
  upsellEnabled: boolean;
}

interface StoreContextValue extends StoreState {
  hydrated: boolean;
  storageReady: boolean;
  geoReady: boolean;
  /**
   * Ephemeral market override (e.g. admin ?country= preview). Does not lock
   * IP geo — cleared when leaving the preview URL.
   */
  viewCountry: CountryCode | null;
  setViewCountry: (country: CountryCode | null) => void;
  /** Products visible in the visitor's market */
  marketProducts: Product[];
  /** Only the visitor's own regional category */
  marketCategories: Category[];
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode, manual?: boolean) => void;
  setCountry: (country: CountryCode, manual?: boolean) => void;
  setCurrencyRate: (code: CurrencyCode, rate: number) => void;
  setCurrencyRates: (rates: Record<CurrencyCode, number>) => void;
  resetCurrencyRates: () => void;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalUSD: number;
  getProduct: (idOrSlug: string, forCountry?: CountryCode) => Product | undefined;
  getCategory: (idOrSlug: string) => Category | undefined;
  addCategory: (data: Omit<Category, "id" | "createdAt">) => string | false;
  updateCategory: (id: string, data: Partial<Category>) => boolean;
  deleteCategory: (id: string) => void;
  addProduct: (data: Omit<Product, "id" | "createdAt">) => string | false;
  updateProduct: (id: string, data: Partial<Product>) => boolean;
  deleteProduct: (id: string) => void;
  placeOrder: (
    customer: Order["customer"],
    itemsOverride?: CartItem[]
  ) => Order;
  /** Wipe local data and restore seed catalog */
  resetStore: () => void;
  /** Force push current catalog to server (admin saves) */
  persistCatalog: () => Promise<{ ok: boolean; durable?: boolean; error?: string }>;
  upsellEnabled: boolean;
  setUpsellEnabled: (enabled: boolean) => void;
  setAllQtyUpsellEnabled: (enabled: boolean) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function cloneSeedProducts(): Product[] {
  try {
    return structuredClone(SEED_PRODUCTS);
  } catch {
    return JSON.parse(JSON.stringify(SEED_PRODUCTS)) as Product[];
  }
}

function cloneSeedCategories(): Category[] {
  try {
    return structuredClone(SEED_CATEGORIES);
  } catch {
    return [...SEED_CATEGORIES];
  }
}

function mergeCategoriesWithSeed(stored: Category[] | undefined): Category[] {
  const seed = cloneSeedCategories();
  if (!stored?.length) return seed;
  // Keep only the markets that are currently open
  return seed.map((s) => {
    const existing = stored.find((c) => c.id === s.id || c.slug === s.slug);
    if (!existing) return s;
    return {
      ...s,
      ...existing,
      id: s.id,
      slug: s.slug,
      country: s.country,
      availableIn: s.availableIn,
      nameAr: existing.nameAr || s.nameAr,
      nameEn: existing.nameEn || s.nameEn,
      nameEs: existing.nameEs || s.nameEs,
      // Always use seed category art so market tiles stay consistent
      image: s.image,
      descriptionAr: s.descriptionAr,
      descriptionEn: s.descriptionEn,
      descriptionEs: s.descriptionEs,
    };
  });
}

/**
 * Catalogs saved before Spanish shipped have a landing object with no *Es
 * fields; keeping the seed's Spanish copy stops it from being lost on hydrate.
 */
function mergeLanding(
  seed: ProductLanding | undefined,
  stored: ProductLanding | undefined
): ProductLanding | undefined {
  if (!stored) return seed;
  if (!seed) return stored;
  return {
    ...seed,
    ...stored,
    headlineEs: stored.headlineEs || seed.headlineEs,
    introEs: stored.introEs || seed.introEs,
    benefitsEs: stored.benefitsEs?.length
      ? stored.benefitsEs
      : seed.benefitsEs,
    sections: stored.sections.map((section, i) => ({
      ...section,
      titleEs: section.titleEs || seed.sections[i]?.titleEs,
      bodyEs: section.bodyEs || seed.sections[i]?.bodyEs,
    })),
    faq: stored.faq.map((item, i) => ({
      ...item,
      questionEs: item.questionEs || seed.faq[i]?.questionEs,
      answerEs: item.answerEs || seed.faq[i]?.answerEs,
    })),
  };
}

function slugFlagSet(
  stored: Product[],
  flag: "qtyUpsellEnabled" | "customColorEnabled"
): Set<string> {
  const set = new Set<string>();
  for (const p of stored) {
    if (p[flag] === true && p.slug?.trim()) set.add(p.slug.trim());
  }
  return set;
}

function mergeProductsWithSeed(stored: Product[] | undefined): Product[] {
  if (!stored?.length) return cloneSeedProducts();
  const allowedCats = new Set(SEED_CATEGORIES.map((c) => c.id));
  const seedById = new Map(SEED_PRODUCTS.map((p) => [p.id, p]));
  const upsellSlugs = slugFlagSet(stored, "qtyUpsellEnabled");
  const dropLegacyElevador = /^prod-mattress-lifter$/i;
  const elevadorPerMarket = /^prod-mattress-lifter-([a-z]{2})$/i;
  const merged = stored
    .map((p) => {
      const seed = seedById.get(p.id);
      if (!seed) return p;
      const durable = (p.images ?? []).filter(isDurableMediaUrl);
      const elevadorMatch = elevadorPerMarket.exec(seed.id);
      const magMatch = /^prod-mag-powerbank-([a-z]{2})$/i.exec(seed.id);
      const retrolabMatch = /^prod-retrolab-([a-z]{2})$/i.exec(seed.id);
      const lockedMarket = elevadorMatch
        ? (elevadorMatch[1].toUpperCase() as CountryCode)
        : null;

      const base = {
        ...seed,
        ...p,
        id: seed.id,
        // Prefer admin / stored edits; seed only fills gaps
        nameAr: p.nameAr?.trim() ? p.nameAr : seed.nameAr,
        nameEn: p.nameEn?.trim() ? p.nameEn : seed.nameEn,
        descriptionAr: p.descriptionAr?.trim()
          ? p.descriptionAr
          : seed.descriptionAr,
        descriptionEn: p.descriptionEn?.trim()
          ? p.descriptionEn
          : seed.descriptionEn,
        nameEs: p.nameEs?.trim() ? p.nameEs : seed.nameEs,
        descriptionEs: p.descriptionEs?.trim()
          ? p.descriptionEs
          : seed.descriptionEs,
        detailsAr: p.detailsAr?.length ? p.detailsAr : seed.detailsAr,
        detailsEn: p.detailsEn?.length ? p.detailsEn : seed.detailsEn,
        detailsEs: p.detailsEs?.length ? p.detailsEs : seed.detailsEs,
        landing: mergeLanding(seed.landing, p.landing),
        images: (() => {
          const seedImgs = (seed.images ?? []).filter(isDurableMediaUrl);
          const extra = seedImgs.filter((u) => !durable.includes(u));
          const combined = [...extra, ...durable];
          return combined.length ? combined : seed.images;
        })(),
        colors: [],
        customColorEnabled:
          typeof p.customColorEnabled === "boolean"
            ? p.customColorEnabled
            : Boolean(seed.customColorEnabled),
        qtyUpsellLocked: p.qtyUpsellLocked === true,
        qtyUpsellEnabled: isCodQtyUpsellEnabled(
          {
            ...p,
            qtyUpsellLocked: p.qtyUpsellLocked,
            availableIn: p.availableIn?.length
              ? p.availableIn
              : seed.availableIn,
          },
          lockedMarket ||
            p.availableIn?.[0] ||
            seed.availableIn?.[0] ||
            ""
        ),
        categoryId: p.categoryId || seed.categoryId,
        marketPrices: {
          ...(seed.marketPrices ?? {}),
          ...(p.marketPrices ?? {}),
        },
        marketComparePrices: {
          ...(seed.marketComparePrices ?? {}),
          ...(p.marketComparePrices ?? {}),
        },
        // Union so newly opened markets reach catalogs saved before the launch
        availableIn: Array.from(
          new Set([...(seed.availableIn ?? []), ...(p.availableIn ?? [])])
        ),
        featured: typeof p.featured === "boolean" ? p.featured : seed.featured,
        inStock: typeof p.inStock === "boolean" ? p.inStock : seed.inStock,
        priceUSD: typeof p.priceUSD === "number" ? p.priceUSD : seed.priceUSD,
        compareAtUSD: p.compareAtUSD ?? seed.compareAtUSD,
        rating: typeof p.rating === "number" ? p.rating : seed.rating,
        reviewCount:
          typeof p.reviewCount === "number" ? p.reviewCount : seed.reviewCount,
        slug: p.slug?.trim() ? p.slug : seed.slug,
        qtyOffers: p.qtyOffers?.length ? p.qtyOffers : seed.qtyOffers,
      };

      // Per-country Elevador rows must stay pinned to their market — a wrong
      // category dropdown was making Costa Rica preview open another listing.
      if (lockedMarket && seed.availableIn?.length) {
        const adminLocal =
          typeof p.marketPrices?.[lockedMarket] === "number"
            ? p.marketPrices![lockedMarket]
            : seed.marketPrices?.[lockedMarket];
        const adminCompare =
          typeof p.marketComparePrices?.[lockedMarket] === "number"
            ? p.marketComparePrices![lockedMarket]
            : seed.marketComparePrices?.[lockedMarket];
        return {
          ...base,
          categoryId: seed.categoryId,
          availableIn: [...seed.availableIn],
          slug: seed.slug,
          marketPrices:
            typeof adminLocal === "number"
              ? { [lockedMarket]: adminLocal }
              : { ...(seed.marketPrices ?? {}) },
          marketComparePrices:
            typeof adminCompare === "number"
              ? { [lockedMarket]: adminCompare }
              : { ...(seed.marketComparePrices ?? {}) },
        };
      }

      if ((magMatch || retrolabMatch) && seed.availableIn?.length) {
        return {
          ...base,
          nameAr: seed.nameAr,
          nameEn: seed.nameEn,
          nameEs: seed.nameEs,
          descriptionAr: seed.descriptionAr,
          descriptionEn: seed.descriptionEn,
          descriptionEs: seed.descriptionEs,
          detailsAr: seed.detailsAr,
          detailsEn: seed.detailsEn,
          detailsEs: seed.detailsEs,
          landing: seed.landing,
          images: [...(seed.images ?? [])],
          categoryId: seed.categoryId,
          availableIn: [...seed.availableIn],
          slug: seed.slug,
          priceUSD: seed.priceUSD,
          compareAtUSD: seed.compareAtUSD,
          marketPrices: { ...(seed.marketPrices ?? {}) },
          marketComparePrices: { ...(seed.marketComparePrices ?? {}) },
        };
      }

      return base;
    })
    .filter(
      (p) =>
        (!p.categoryId || allowedCats.has(p.categoryId)) &&
        !isRetiredStoreProduct(p) &&
        !dropLegacyElevador.test(p.id)
    );
  for (const seed of SEED_PRODUCTS) {
    if (!merged.some((p) => p.id === seed.id)) {
      const slug = (seed.slug || "").trim();
      merged.push({
        ...seed,
        qtyUpsellEnabled:
          (slug ? upsellSlugs.has(slug) : false) ||
          seed.qtyUpsellEnabled === true ||
          usesLatamThreeQtyPacks(seed.availableIn?.[0] || ""),
      });
    }
  }
  return merged;
}

function buildDefaults(country: CountryCode = DEFAULT_COUNTRY): StoreState {
  return {
    categories: cloneSeedCategories(),
    products: cloneSeedProducts(),
    orders: [],
    cart: [],
    locale: localeForCountry(country),
    currency: currencyForCountry(country),
    country,
    countryManual: false,
    currencyManual: false,
    localeManual: false,
    currencyRates: { ...DEFAULT_CURRENCY_RATES },
    // Off until the merchant enables it from admin — packs stay hidden.
    upsellEnabled: false,
  };
}

function readCookieCountry(): CountryCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)geo-country=([A-Za-z]{2})/);
  const code = match?.[1]?.toUpperCase();
  return code && isValidCountry(code) ? code : null;
}

function readLocalCatalog(): PersistedCatalog | null {
  if (typeof window === "undefined") return null;
  try {
    const current = window.localStorage.getItem(CATALOG_STORAGE_KEY);
    if (current) {
      const parsed = parseCatalogJson(current);
      if (parsed) return parsed;
    }
    for (const key of LEGACY_STORAGE_KEYS) {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = parseCatalogJson(raw);
      if (parsed) {
        try {
          window.localStorage.setItem(
            CATALOG_STORAGE_KEY,
            catalogToJson(parsed)
          );
        } catch {
          /* quota */
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to read store", err);
  }
  return null;
}

const MANUAL_MARKET_SESSION_KEY = "cargolf-market-manual";

function readSessionManualMarket(): CountryCode | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(MANUAL_MARKET_SESSION_KEY);
    if (raw && isValidCountry(raw) && isStoreMarket(raw)) {
      return raw as CountryCode;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function writeSessionManualMarket(country: CountryCode | null) {
  if (typeof window === "undefined") return;
  try {
    if (country) {
      window.sessionStorage.setItem(MANUAL_MARKET_SESSION_KEY, country);
    } else {
      window.sessionStorage.removeItem(MANUAL_MARKET_SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
}

function applyCatalogDisplayFlags(
  products: Product[],
  catalog: PersistedCatalog | null
): Product[] {
  if (!catalog?.products?.length) return products;
  const byId = new Map(catalog.products.map((p) => [p.id, p]));
  return products.map((p) => {
    const row = byId.get(p.id);
    const merged: Product = {
      ...p,
      qtyUpsellEnabled: row?.qtyUpsellEnabled ?? p.qtyUpsellEnabled,
      qtyUpsellLocked: row?.qtyUpsellLocked ?? p.qtyUpsellLocked,
    };
    const market =
      row?.availableIn?.[0] || p.availableIn?.[0] || undefined;
    return {
      ...merged,
      qtyUpsellEnabled: isCodQtyUpsellEnabled(merged, market),
    };
  });
}

function toPersisted(state: StoreState): PersistedCatalog {
  return sanitizeCatalog({
    updatedAt: Date.now(),
    categories: state.categories,
    products: state.products,
    orders: state.orders,
    cart: state.cart,
    locale: state.locale,
    currency: state.currency,
    country: state.country,
    // Never persist a manual market/currency lock — visitors follow the
    // country's local currency (ARS/NIO/DOP…), not a leftover USD preview.
    countryManual: false,
    currencyManual: false,
    localeManual: state.localeManual,
    currencyRates: state.currencyRates,
    upsellEnabled: state.upsellEnabled,
  });
}

function applyPersisted(
  parsed: PersistedCatalog,
  cookieCountry: CountryCode | null
): StoreState {
  // Ignore legacy country/currency locks saved by admin preview — IP geo
  // and the market's own currency must win (do not keep a USD override).
  const currencyManual = false;
  const localeManual = Boolean(parsed.localeManual);
  const storedCountry =
    parsed.country && isValidCountry(parsed.country) && isStoreMarket(parsed.country)
      ? parsed.country
      : null;
  const cookieOk =
    cookieCountry && isStoreMarket(cookieCountry) ? cookieCountry : null;
  // Prefer geo cookie, then last-seen country as a soft hint before client IP
  const country = cookieOk ?? storedCountry ?? DEFAULT_COUNTRY;

  const currencyRates = mergeCurrencyRates(
    parsed.currencyRates && typeof parsed.currencyRates === "object"
      ? parsed.currencyRates
      : undefined
  );
  const storedCurrency =
    parsed.currency && isCurrencyCode(parsed.currency)
      ? parsed.currency
      : currencyForCountry(country);

  return {
    locale:
      localeManual && isLocale(parsed.locale)
        ? parsed.locale
        : localeForCountry(country),
    country,
    currency: currencyManual ? storedCurrency : currencyForCountry(country),
    countryManual: false,
    currencyManual,
    localeManual,
    currencyRates,
    products: mergeProductsWithSeed(
      parsed.products?.length ? parsed.products : undefined
    ),
    categories: mergeCategoriesWithSeed(
      parsed.categories?.length ? parsed.categories : undefined
    ),
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    cart: (Array.isArray(parsed.cart) ? parsed.cart : []).filter(
      (item) => !isRetiredStoreProduct({ id: item.productId })
    ),
    // Opt-in only: missing/undefined means hidden until admin enables.
    upsellEnabled: parsed.upsellEnabled === true,
  };
}

function pickNewestCatalog(
  a: PersistedCatalog | null,
  b: PersistedCatalog | null
): PersistedCatalog | null {
  if (a && b) {
    return (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b;
  }
  return a || b;
}

function flushToLocal(state: StoreState, persisted?: PersistedCatalog) {
  try {
    const data = persisted ?? toPersisted(state);
    // Never overwrite a newer catalog already in localStorage
    const existing = readLocalCatalog();
    if (
      existing &&
      (existing.updatedAt || 0) > (data.updatedAt || 0)
    ) {
      return true;
    }
    const raw = catalogToJson(data);
    window.localStorage.setItem(CATALOG_STORAGE_KEY, raw);
    return true;
  } catch {
    console.error("localStorage save failed");
    window.dispatchEvent(new CustomEvent("smart-shop-save-error"));
    return false;
  }
}

type ServerSaveResult = {
  ok: boolean;
  durable?: boolean;
  error?: string;
};

function flushToServer(
  state: StoreState,
  persisted?: PersistedCatalog
): Promise<ServerSaveResult> {
  const body = catalogToJson(persisted ?? toPersisted(state));
  return fetch("/api/catalog", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body,
  })
    .then(async (res) => {
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        durable?: boolean;
        error?: string;
      };
      if (!res.ok) {
        const err =
          res.status === 401
            ? "unauthorized"
            : json.error === "missing_blob_token"
              ? "missing_blob_token"
              : "server";
        window.dispatchEvent(
          new CustomEvent("smart-shop-server-save-error", { detail: err })
        );
        return { ok: false, error: err };
      }
      return { ok: true, durable: Boolean(json.durable) };
    })
    .catch(() => {
      window.dispatchEvent(
        new CustomEvent("smart-shop-server-save-error", { detail: "network" })
      );
      return { ok: false, error: "network" };
    });
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(() =>
    buildDefaults(DEFAULT_COUNTRY)
  );
  const [hydrated] = useState(true);
  const [storageReady, setStorageReady] = useState(false);
  const [geoReady, setGeoReady] = useState(false);
  const [viewCountry, setViewCountryState] = useState<CountryCode | null>(null);
  const stateRef = useRef(state);
  const storageReadyRef = useRef(false);
  /** Bumps only on catalog mutations so geo/pref commits cannot abort hydrate */
  const catalogGenRef = useRef(0);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const commit = useCallback((updater: (s: StoreState) => StoreState) => {
    // Apply + persist synchronously so Save + navigation cannot lose data
    const prev = stateRef.current;
    const next = updater(prev);
    if (next === prev) return true;
    const stamped: StoreState = { ...next };
    stateRef.current = stamped;

    // Only product/catalog edits may rewrite the shared catalog. Country/locale
    // geo commits must NOT stamp seed products over a merchant's saved prices
    // (and must not PUT to the server while an admin session cookie is present).
    const catalogChanged =
      prev.products !== stamped.products ||
      prev.categories !== stamped.categories ||
      prev.orders !== stamped.orders ||
      prev.currencyRates !== stamped.currencyRates ||
      prev.upsellEnabled !== stamped.upsellEnabled;

    if (catalogChanged) {
      catalogGenRef.current += 1;
    }

    let saved = true;
    if (typeof window !== "undefined") {
      if (catalogChanged) {
        const localNow = readLocalCatalog();
        const persisted = {
          ...toPersisted(stamped),
          updatedAt: Math.max(Date.now(), (localNow?.updatedAt || 0) + 1),
        };
        saved = flushToLocal(stamped, persisted);
        if (storageReadyRef.current) {
          void flushToServer(stamped, persisted);
        }
      } else if (storageReadyRef.current) {
        // Patch prefs only — keep persisted products/categories/updatedAt intact
        const existing = readLocalCatalog();
        if (existing) {
          try {
            const patched: PersistedCatalog = {
              ...existing,
              locale: stamped.locale,
              currency: stamped.currency,
              country: stamped.country,
              countryManual: false,
              currencyManual: stamped.currencyManual,
              localeManual: stamped.localeManual,
              cart: stamped.cart,
            };
            window.localStorage.setItem(
              CATALOG_STORAGE_KEY,
              catalogToJson(patched)
            );
          } catch {
            /* quota */
          }
        }
      }
    }
    setState(stamped);
    return saved;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const genAtStart = catalogGenRef.current;
      try {
        const cookieCountry = readCookieCountry();
        let next = buildDefaults(cookieCountry ?? DEFAULT_COUNTRY);

        const localAtStart = readLocalCatalog();
        let remote: PersistedCatalog | null = null;
        try {
          const res = await fetch("/api/catalog", { cache: "no-store" });
          if (res.ok) {
            const json = (await res.json()) as {
              data?: PersistedCatalog | null;
            };
            if (json.data) remote = parseCatalogJson(JSON.stringify(json.data));
          }
        } catch {
          /* offline / cold */
        }

        // Re-read local after await — admin may have saved during fetch
        const localNow = readLocalCatalog();
        const best = pickNewestCatalog(
          pickNewestCatalog(localAtStart, localNow),
          remote
        );

        if (cancelled) return;

        // Catalog was edited while loading — keep in-memory products, but still
        // mark ready. (Geo/locale commits no longer bump catalogGenRef.)
        if (catalogGenRef.current !== genAtStart) {
          storageReadyRef.current = true;
          setStorageReady(true);
          return;
        }

        if (best) {
          next = applyPersisted(best, cookieCountry);
          // Keep locale/currency manual picks; market follows IP unless this
          // session chose a country in the header (sessionStorage).
          const current = stateRef.current;
          const sessionMarket = readSessionManualMarket();
          if (sessionMarket) {
            next = {
              ...next,
              country: sessionMarket,
              countryManual: true,
              currency: current.currencyManual
                ? current.currency
                : currencyForCountry(sessionMarket),
              locale: current.localeManual
                ? current.locale
                : localeForCountry(sessionMarket),
            };
          }
          if (current.localeManual) {
            next = { ...next, locale: current.locale, localeManual: true };
          }
          if (current.currencyManual) {
            next = {
              ...next,
              currency: current.currency,
              currencyManual: true,
            };
          }
        }

        // If local is newer than what we applied, prefer local products/prices
        const localFinal = readLocalCatalog();
        if (
          localFinal &&
          (localFinal.updatedAt || 0) > (best?.updatedAt || 0)
        ) {
          next = applyPersisted(localFinal, cookieCountry);
        }

        // Display flags (qty upsell / color) must follow the newest catalog so
        // a visitor sees what the merchant enabled — including same-slug copies
        // that were filled back in from seed.
        const flagCatalog =
          localFinal && remote
            ? (localFinal.updatedAt || 0) >= (remote.updatedAt || 0)
              ? localFinal
              : remote
            : localFinal || remote;
        if (flagCatalog) {
          next = {
            ...next,
            upsellEnabled:
              flagCatalog.upsellEnabled === true ||
              (flagCatalog.products ?? []).some(
                (p) => p.qtyUpsellEnabled === true
              ),
            products: applyCatalogDisplayFlags(next.products, flagCatalog),
          };
        }

        if (catalogGenRef.current !== genAtStart) {
          storageReadyRef.current = true;
          setStorageReady(true);
          return;
        }

        setCurrencyRateOverrides(next.currencyRates);
        stateRef.current = next;
        setState(next);
        storageReadyRef.current = true;
        setStorageReady(true);
        // Mirror hydrate result WITHOUT bumping updatedAt. Stamping Date.now()
        // here made stale remote seed prices look "newer" than a concurrent
        // admin save and caused Save → price reverts for the merchant.
        const appliedUpdatedAt =
          localFinal &&
          (localFinal.updatedAt || 0) > (best?.updatedAt || 0)
            ? localFinal.updatedAt
            : best?.updatedAt;
        if (typeof appliedUpdatedAt === "number") {
          flushToLocal(next, {
            ...toPersisted(next),
            updatedAt: appliedUpdatedAt,
          });
        }
      } catch (err) {
        console.error("Store hydrate failed", err);
        setCurrencyRateOverrides(DEFAULT_CURRENCY_RATES);
        storageReadyRef.current = true;
        setStorageReady(true);
      }
    }

    void restore();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    let cancelled = false;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);

    function applyDetected(detected: CountryCode) {
      if (cancelled) return;
      let applied = false;
      commit((s) => {
        // A market picked in the header outranks IP geo for this tab session
        if (s.countryManual) return s;
        const nextCurrency = s.currencyManual
          ? s.currency
          : currencyForCountry(detected);
        const nextLocale = s.localeManual
          ? s.locale
          : localeForCountry(detected);
        if (
          s.country === detected &&
          s.currency === nextCurrency &&
          s.locale === nextLocale
        ) {
          return s;
        }
        applied = true;
        return {
          ...s,
          country: detected,
          currency: nextCurrency,
          locale: nextLocale,
        };
      });
      if (!applied) return;
      try {
        document.cookie = `geo-country=${detected}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
      } catch {
        /* ignore */
      }
    }

    async function lookupClientIpCountry(): Promise<CountryCode | null> {
      const abort = new AbortController();
      const timer = window.setTimeout(() => abort.abort(), 2500);

      const readCode = (raw: string | undefined): CountryCode | null => {
        const code = raw?.toUpperCase();
        if (code && isValidCountry(code) && isStoreMarket(code)) {
          return code as CountryCode;
        }
        return null;
      };

      try {
        // Client-side IP geo (works even when server sees only a private LAN IP)
        const res = await fetch("https://ipapi.co/json/", {
          signal: abort.signal,
          cache: "no-store",
        });
        if (res.ok) {
          const data = (await res.json()) as { country_code?: string };
          const code = readCode(data.country_code);
          if (code) {
            window.clearTimeout(timer);
            return code;
          }
        }
      } catch {
        /* try fallback */
      }

      try {
        const res = await fetch(
          "https://ipwho.is/?fields=country_code,success",
          {
            signal: abort.signal,
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = (await res.json()) as {
            success?: boolean;
            country_code?: string;
          };
          if (data.success !== false) {
            const code = readCode(data.country_code);
            window.clearTimeout(timer);
            return code;
          }
        }
      } catch {
        /* ignore */
      }

      window.clearTimeout(timer);
      return null;
    }

    async function detect() {
      // Header pick for this browser tab outranks IP for the session only
      const sessionMarket = readSessionManualMarket();
      if (sessionMarket) {
        commit((s) =>
          s.countryManual && s.country === sessionMarket
            ? s
            : {
                ...s,
                country: sessionMarket,
                countryManual: true,
                currency: s.currencyManual
                  ? s.currency
                  : currencyForCountry(sessionMarket),
                locale: s.localeManual
                  ? s.locale
                  : localeForCountry(sessionMarket),
              }
        );
        window.clearTimeout(timeout);
        if (!cancelled) setGeoReady(true);
        return;
      }

      let fromApi: CountryCode | null = null;
      let source = "default";

      // Always ask client IP first — most accurate for home/office networks
      const fromClientIp = await lookupClientIpCountry();

      try {
        const res = await fetch("/api/geo", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (res.ok) {
          const data = (await res.json()) as {
            country?: string;
            detected?: string | null;
            source?: string;
          };
          source = data.source || "default";
          const raw =
            data.country && isValidCountry(data.country)
              ? (data.country.toUpperCase() as CountryCode)
              : null;
          if (raw && isStoreMarket(raw)) fromApi = raw;
        }
      } catch {
        /* fall through */
      }

      const strongIp =
        source === "vercel" ||
        source === "cloudflare" ||
        source === "ip-api";

      const fromSettings = countryFromLocationSettings(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        typeof navigator !== "undefined" ? navigator.languages : undefined
      );

      // Priority: live client IP → strong server IP → timezone → server/cookie
      const detected =
        fromClientIp ??
        (strongIp && fromApi ? fromApi : null) ??
        (fromSettings && isStoreMarket(fromSettings) ? fromSettings : null) ??
        fromApi;

      if (detected && isStoreMarket(detected)) {
        applyDetected(detected);
      }

      window.clearTimeout(timeout);
      if (!cancelled) setGeoReady(true);
    }

    void detect();
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [storageReady, commit]);

  useEffect(() => {
    setCurrencyRateOverrides(state.currencyRates);
  }, [state.currencyRates]);

  useEffect(() => {
    if (!storageReady) return;
    document.documentElement.lang = state.locale;
    document.documentElement.dir = state.locale === "ar" ? "rtl" : "ltr";
    document.cookie = `geo-country=${state.country}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  }, [state.locale, state.country, storageReady]);

  const setLocale = useCallback(
    (locale: Locale) =>
      commit((s) =>
        s.locale === locale && s.localeManual
          ? s
          : { ...s, locale, localeManual: true }
      ),
    [commit]
  );

  const setCurrency = useCallback(
    (currency: CurrencyCode, manual = true) =>
      commit((s) => {
        if (s.currency === currency && s.currencyManual === manual) return s;
        return { ...s, currency, currencyManual: manual };
      }),
    [commit]
  );

  const setCountry = useCallback(
    (country: CountryCode, manual = true) => {
      const next = isStoreMarket(country) ? country : DEFAULT_COUNTRY;
      if (manual) {
        writeSessionManualMarket(next);
      }
      setViewCountryState(null);
      commit((s) => {
        const nextCurrency = currencyForCountry(next);
        // Switching market also switches language, unless one was chosen by hand
        const nextLocale = s.localeManual ? s.locale : localeForCountry(next);
        if (
          s.country === next &&
          s.countryManual === manual &&
          s.currency === nextCurrency &&
          s.currencyManual === false &&
          s.locale === nextLocale
        ) {
          return s;
        }
        return {
          ...s,
          country: next,
          countryManual: manual,
          currency: nextCurrency,
          currencyManual: false,
          locale: nextLocale,
        };
      });
    },
    [commit]
  );

  const setCurrencyRate = useCallback(
    (code: CurrencyCode, rate: number) => {
      if (!(rate > 0)) return;
      commit((s) => ({
        ...s,
        currencyRates: { ...s.currencyRates, [code]: rate },
      }));
    },
    [commit]
  );

  const setCurrencyRates = useCallback(
    (rates: Record<CurrencyCode, number>) =>
      commit((s) => ({
        ...s,
        currencyRates: mergeCurrencyRates(rates),
      })),
    [commit]
  );

  const resetCurrencyRates = useCallback(() => {
    commit((s) => ({
      ...s,
      currencyRates: { ...DEFAULT_CURRENCY_RATES },
    }));
  }, [commit]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      const current = stateRef.current;
      const product = current.products.find((p) => p.id === productId);
      commit((s) => {
        const existing = s.cart.find((c) => c.productId === productId);
        if (existing) {
          return {
            ...s,
            cart: s.cart.map((c) =>
              c.productId === productId
                ? { ...c, quantity: c.quantity + quantity }
                : c
            ),
          };
        }
        return { ...s, cart: [...s.cart, { productId, quantity }] };
      });
      if (product) {
        const unitUSD = getProductPriceUSD(product, current.country);
        const value = convertFromUSD(unitUSD * quantity, current.currency);
        trackAddToCart({
          contentId: product.id,
          contentName: product.nameEn || product.nameAr,
          value: Math.round(value * 100) / 100,
          currency: current.currency,
          quantity,
        });
      }
    },
    [commit]
  );

  const updateCartQty = useCallback(
    (productId: string, quantity: number) => {
      commit((s) => ({
        ...s,
        cart:
          quantity <= 0
            ? s.cart.filter((c) => c.productId !== productId)
            : s.cart.map((c) =>
                c.productId === productId ? { ...c, quantity } : c
              ),
      }));
    },
    [commit]
  );

  const removeFromCart = useCallback(
    (productId: string) =>
      commit((s) => ({
        ...s,
        cart: s.cart.filter((c) => c.productId !== productId),
      })),
    [commit]
  );

  const clearCart = useCallback(
    () => commit((s) => ({ ...s, cart: [] })),
    [commit]
  );

  const getProduct = useCallback(
    (idOrSlug: string, forCountry?: CountryCode) => {
      const market = forCountry ?? state.country;
      const matches = state.products.filter(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      );
      if (matches.length === 0) return undefined;
      // Exact id always wins (admin preview links use product id)
      const byId = matches.find((p) => p.id === idOrSlug);
      if (byId) {
        if (isProductAvailableIn(byId, market, state.categories)) return byId;
        // Still return the exact product for admin preview of that listing
        if (idOrSlug === byId.id) return byId;
      }
      const inMarket = matches.filter((p) =>
        isProductAvailableIn(p, market, state.categories)
      );
      if (inMarket.length >= 1) {
        return (
          inMarket.find((p) => p.availableIn?.includes(market)) ?? inMarket[0]
        );
      }
      // Product exists but not for this country — hide on the public storefront
      return undefined;
    },
    [state.products, state.country, state.categories]
  );

  const getCategory = useCallback(
    (idOrSlug: string) =>
      state.categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug),
    [state.categories]
  );

  const addCategory = useCallback(
    (data: Omit<Category, "id" | "createdAt">) => {
      const newId = uid("cat");
      const saved = commit((s) => ({
        ...s,
        categories: [
          {
            ...data,
            id: newId,
            createdAt: new Date().toISOString(),
          },
          ...s.categories,
        ],
      }));
      return saved ? newId : false;
    },
    [commit]
  );

  const updateCategory = useCallback(
    (id: string, data: Partial<Category>) => {
      return commit((s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === id ? { ...c, ...data } : c
        ),
      }));
    },
    [commit]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      commit((s) => ({
        ...s,
        categories: s.categories.filter((c) => c.id !== id),
        products: s.products.map((p) =>
          p.categoryId === id ? { ...p, categoryId: "" } : p
        ),
      }));
    },
    [commit]
  );

  const addProduct = useCallback(
    (data: Omit<Product, "id" | "createdAt">) => {
      const newId = uid("prod");
      const saved = commit((s) => ({
        ...s,
        products: [
          {
            ...data,
            id: newId,
            createdAt: new Date().toISOString(),
          },
          ...s.products,
        ],
      }));
      return saved ? newId : false;
    },
    [commit]
  );

  const updateProduct = useCallback(
    (id: string, data: Partial<Product>) => {
      return commit((s) => {
        const target = s.products.find((p) => p.id === id);
        if (!target) return s;
        const slug = target.slug?.trim();
        const syncDisplay =
          data.qtyUpsellEnabled !== undefined ||
          data.qtyUpsellLocked !== undefined ||
          data.customColorEnabled !== undefined;
        return {
          ...s,
          products: s.products.map((p) => {
            if (p.id === id) return { ...p, ...data };
            // Same listing in other markets (omni-light-sa / omni-light-mx…)
            if (syncDisplay && slug && p.slug === slug) {
              return {
                ...p,
                ...(data.qtyUpsellEnabled !== undefined
                  ? { qtyUpsellEnabled: data.qtyUpsellEnabled }
                  : {}),
                ...(data.qtyUpsellLocked !== undefined
                  ? { qtyUpsellLocked: data.qtyUpsellLocked }
                  : {}),
                ...(data.customColorEnabled !== undefined
                  ? { customColorEnabled: data.customColorEnabled }
                  : {}),
              };
            }
            return p;
          }),
        };
      });
    },
    [commit]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      commit((s) => ({
        ...s,
        products: s.products.filter((p) => p.id !== id),
        cart: s.cart.filter((c) => c.productId !== id),
      }));
    },
    [commit]
  );

  const resetStore = useCallback(() => {
    const next = buildDefaults(DEFAULT_COUNTRY);
    try {
      for (const key of [CATALOG_STORAGE_KEY, ...LEGACY_STORAGE_KEYS]) {
        window.localStorage.removeItem(key);
      }
    } catch {
      /* ignore */
    }
    catalogGenRef.current += 1;
    setCurrencyRateOverrides(next.currencyRates);
    stateRef.current = next;
    setState(next);
    storageReadyRef.current = true;
    setStorageReady(true);
    const persisted = toPersisted(next);
    flushToLocal(next, persisted);
    void flushToServer(next, persisted);
  }, []);

  const persistCatalog = useCallback(async () => {
    const current = stateRef.current;
    const localNow = readLocalCatalog();
    const persisted = {
      ...toPersisted(current),
      // Always beat whatever is already in localStorage (avoids silent skip)
      updatedAt: Math.max(Date.now(), (localNow?.updatedAt || 0) + 1),
    };
    const localOk = flushToLocal(current, persisted);
    if (!localOk) return { ok: false, error: "local" };
    return flushToServer(current, persisted);
  }, []);

  const setViewCountry = useCallback((country: CountryCode | null) => {
    setViewCountryState((prev) => {
      if (country === prev) return prev;
      if (country && !isStoreMarket(country)) return prev;
      return country;
    });
  }, []);

  const displayCountry = viewCountry ?? state.country;
  const displayCurrency =
    viewCountry && !state.currencyManual
      ? currencyForCountry(viewCountry)
      : state.currency;
  const displayLocale =
    viewCountry && !state.localeManual
      ? localeForCountry(viewCountry)
      : state.locale;

  const marketProducts = useMemo(
    () =>
      filterProductsForCountry(
        state.products,
        displayCountry,
        state.categories
      ),
    [state.products, displayCountry, state.categories]
  );

  const marketCategories = useMemo(
    () => filterCategoriesForCountry(state.categories, displayCountry),
    [state.categories, displayCountry]
  );

  const cartCount = useMemo(
    () => state.cart.reduce((n, i) => n + i.quantity, 0),
    [state.cart]
  );

  const cartTotalUSD = useMemo(() => {
    return state.cart.reduce((sum, item) => {
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + cartItemLineUSD(product, state.country, item);
    }, 0);
  }, [state.cart, state.products, state.country]);

  const placeOrder = useCallback(
    (customer: Order["customer"], itemsOverride?: CartItem[]) => {
      const current = stateRef.current;
      const items = itemsOverride ?? [...current.cart];
      const totalUSD = items.reduce((sum, item) => {
        const product = current.products.find((p) => p.id === item.productId);
        if (!product) return sum;
        return sum + cartItemLineUSD(product, current.country, item);
      }, 0);
      const order: Order = {
        id: uid("ord"),
        items,
        customer,
        country: current.country,
        currency: current.currency,
        locale: current.locale,
        paymentMethod: "cod",
        totalUSD,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      commit((s) => ({
        ...s,
        orders: [order, ...s.orders],
        cart: itemsOverride ? s.cart : [],
      }));
      const contents = items.map((item) => {
        const product = current.products.find((p) => p.id === item.productId);
        const unitUSD = product
          ? getProductPriceUSD(product, current.country)
          : 0;
        return {
          id: item.productId,
          quantity: item.quantity,
          item_price:
            Math.round(convertFromUSD(unitUSD, current.currency) * 100) / 100,
        };
      });
      trackPurchase({
        orderId: order.id,
        value: Math.round(convertFromUSD(totalUSD, current.currency) * 100) / 100,
        currency: current.currency,
        contents,
      }, {
        phone: customer.phone,
        firstName: customer.name?.trim().split(/\s+/)[0],
        lastName: customer.name?.trim().split(/\s+/).slice(1).join(" ") || undefined,
        city: customer.city,
        country: current.country,
        externalId: order.id,
      });
      return order;
    },
    [commit]
  );

  const setUpsellEnabled = useCallback(
    (enabled: boolean) => {
      commit((s) => ({ ...s, upsellEnabled: enabled }));
    },
    [commit]
  );

  const setAllQtyUpsellEnabled = useCallback(
    (enabled: boolean) => {
      commit((s) => ({
        ...s,
        upsellEnabled: enabled,
        products: s.products.map((p) => {
          const market = resolveProductMarket(p, s.categories);
          if (!market || !isSpanishMarket(market)) return p;
          return {
            ...p,
            qtyUpsellLocked: true,
            qtyUpsellEnabled: enabled,
            ...(enabled
              ? { qtyOffers: withLatamThreeQtyOffers(p.qtyOffers) }
              : {}),
          };
        }),
      }));
    },
    [commit]
  );

  const value: StoreContextValue = {
    ...state,
    country: displayCountry,
    currency: displayCurrency,
    locale: displayLocale,
    hydrated,
    storageReady,
    geoReady,
    viewCountry,
    setViewCountry,
    marketProducts,
    marketCategories,
    setLocale,
    setCurrency,
    setCountry,
    setCurrencyRate,
    setCurrencyRates,
    resetCurrencyRates,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotalUSD,
    getProduct,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    placeOrder,
    resetStore,
    persistCatalog,
    upsellEnabled: state.upsellEnabled,
    setUpsellEnabled,
    setAllQtyUpsellEnabled,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be within StoreProvider");
  return ctx;
}

/** Always read the catalog row so checkout sees the merchant's latest flags. */
export function useLiveProduct(product: Product): Product {
  const { products } = useStore();
  return products.find((p) => p.id === product.id) ?? product;
}
