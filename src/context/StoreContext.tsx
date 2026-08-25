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
import {
  currencyForCountry,
  DEFAULT_COUNTRY,
  countryFromLocationSettings,
  isStoreMarket,
  isValidCountry,
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
} from "@/lib/pricing";
import { cartItemLineUSD } from "@/lib/qty-upsell";
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
import type {
  CartItem,
  Category,
  CountryCode,
  CurrencyCode,
  Locale,
  Order,
  Product,
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
  currencyRates: Record<CurrencyCode, number>;
  upsellEnabled: boolean;
}

interface StoreContextValue extends StoreState {
  hydrated: boolean;
  storageReady: boolean;
  geoReady: boolean;
  /** Products visible in the visitor's market */
  marketProducts: Product[];
  /** Only the visitor's regional category (MA / SA / AE / OM). */
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
  getProduct: (idOrSlug: string) => Product | undefined;
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
  // Keep only active markets (MA / SA / AE / OM)
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
      image: existing.image || s.image,
      descriptionAr: existing.descriptionAr || s.descriptionAr,
      descriptionEn: existing.descriptionEn || s.descriptionEn,
    };
  });
}

function mergeProductsWithSeed(stored: Product[] | undefined): Product[] {
  if (!stored?.length) return cloneSeedProducts();
  const allowedCats = new Set(SEED_CATEGORIES.map((c) => c.id));
  const seedById = new Map(SEED_PRODUCTS.map((p) => [p.id, p]));
  const merged = stored
    .map((p) => {
      const seed = seedById.get(p.id);
      if (!seed) return p;
      const durable = (p.images ?? []).filter(isDurableMediaUrl);
      return {
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
        detailsAr: p.detailsAr?.length ? p.detailsAr : seed.detailsAr,
        detailsEn: p.detailsEn?.length ? p.detailsEn : seed.detailsEn,
        landing: p.landing ?? seed.landing,
        images: durable.length ? durable : seed.images,
        colors: [],
        customColorEnabled:
          typeof p.customColorEnabled === "boolean"
            ? p.customColorEnabled
            : Boolean(seed.customColorEnabled),
        categoryId: p.categoryId || seed.categoryId,
        marketPrices: {
          ...(seed.marketPrices ?? {}),
          ...(p.marketPrices ?? {}),
        },
        marketComparePrices: {
          ...(seed.marketComparePrices ?? {}),
          ...(p.marketComparePrices ?? {}),
        },
        availableIn: p.availableIn?.length ? p.availableIn : seed.availableIn,
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
    })
    .filter((p) => !p.categoryId || allowedCats.has(p.categoryId));
  for (const seed of SEED_PRODUCTS) {
    if (!merged.some((p) => p.id === seed.id)) {
      merged.push({ ...seed });
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
    locale: "ar",
    currency: currencyForCountry(country),
    country,
    countryManual: false,
    currencyManual: false,
    currencyRates: { ...DEFAULT_CURRENCY_RATES },
    upsellEnabled: true,
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
    countryManual: state.countryManual,
    currencyManual: state.currencyManual,
    currencyRates: state.currencyRates,
    upsellEnabled: state.upsellEnabled,
  });
}

function applyPersisted(
  parsed: PersistedCatalog,
  cookieCountry: CountryCode | null
): StoreState {
  const manual = Boolean(parsed.countryManual);
  const currencyManual = Boolean(parsed.currencyManual);
  const storedCountry =
    parsed.country && isValidCountry(parsed.country) && isStoreMarket(parsed.country)
      ? parsed.country
      : null;
  const cookieOk =
    cookieCountry && isStoreMarket(cookieCountry) ? cookieCountry : null;
  const country = manual
    ? storedCountry ?? cookieOk ?? DEFAULT_COUNTRY
    : cookieOk ?? storedCountry ?? DEFAULT_COUNTRY;

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
    locale: parsed.locale === "en" || parsed.locale === "ar" ? parsed.locale : "ar",
    country,
    currency: currencyManual ? storedCurrency : currencyForCountry(country),
    countryManual: manual,
    currencyManual,
    currencyRates,
    products: mergeProductsWithSeed(
      parsed.products?.length ? parsed.products : undefined
    ),
    categories: mergeCategoriesWithSeed(
      parsed.categories?.length ? parsed.categories : undefined
    ),
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    cart: Array.isArray(parsed.cart) ? parsed.cart : [],
    upsellEnabled: parsed.upsellEnabled !== false,
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
  const stateRef = useRef(state);
  const storageReadyRef = useRef(false);
  /** Bumps on every user commit so hydrate cannot clobber fresher edits */
  const mutateGenRef = useRef(0);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const commit = useCallback((updater: (s: StoreState) => StoreState) => {
    // Apply + persist synchronously so Save + navigation cannot lose data
    const prev = stateRef.current;
    const next = updater(prev);
    if (next === prev) return true;
    mutateGenRef.current += 1;
    // Stamp a fresh updatedAt so this beat any in-flight hydrate
    const stamped: StoreState = { ...next };
    stateRef.current = stamped;
    let saved = true;
    if (typeof window !== "undefined") {
      const persisted = { ...toPersisted(stamped), updatedAt: Date.now() };
      saved = flushToLocal(stamped, persisted);
      // Always try server — do not wait for hydrate (avoids lost admin saves)
      void flushToServer(stamped, persisted);
    }
    setState(stamped);
    return saved;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const genAtStart = mutateGenRef.current;
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

        // User edited while we were loading — keep their in-memory state
        if (mutateGenRef.current !== genAtStart) {
          storageReadyRef.current = true;
          setStorageReady(true);
          void flushToServer(stateRef.current);
          return;
        }

        if (best) {
          next = applyPersisted(best, cookieCountry);
        }

        // If local is newer than what we applied, prefer local again
        const localFinal = readLocalCatalog();
        if (
          localFinal &&
          (localFinal.updatedAt || 0) > (best?.updatedAt || 0)
        ) {
          next = applyPersisted(localFinal, cookieCountry);
        }

        if (mutateGenRef.current !== genAtStart) {
          storageReadyRef.current = true;
          setStorageReady(true);
          void flushToServer(stateRef.current);
          return;
        }

        setCurrencyRateOverrides(next.currencyRates);
        stateRef.current = next;
        setState(next);
        storageReadyRef.current = true;
        setStorageReady(true);
        // Only mirror to local if we are not older than what's already stored
        flushToLocal(next);
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
    let cancelled = false;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);

    function applyDetected(detected: CountryCode) {
      if (cancelled) return;
      commit((s) => {
        const nextCurrency = s.currencyManual
          ? s.currency
          : currencyForCountry(detected);
        if (
          s.country === detected &&
          s.currency === nextCurrency &&
          !s.countryManual
        ) {
          return s;
        }
        return {
          ...s,
          country: detected,
          countryManual: false,
          currency: nextCurrency,
        };
      });
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
  }, [commit]);

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
    (locale: Locale) => commit((s) => ({ ...s, locale })),
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
      commit((s) => {
        const nextCurrency = s.currencyManual
          ? s.currency
          : currencyForCountry(next);
        if (
          s.country === next &&
          s.countryManual === manual &&
          s.currency === nextCurrency
        ) {
          return s;
        }
        return {
          ...s,
          country: next,
          countryManual: manual,
          currency: nextCurrency,
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
    (idOrSlug: string) => {
      const matches = state.products.filter(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      );
      if (matches.length === 0) return undefined;
      const inMarket = matches.filter((p) =>
        isProductAvailableIn(p, state.country, state.categories)
      );
      if (inMarket.length === 1) return inMarket[0];
      if (inMarket.length > 1) return inMarket[0];
      // Product exists but not for this country — hide it
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
      return commit((s) => ({
        ...s,
        products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
      }));
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
    mutateGenRef.current += 1;
    setCurrencyRateOverrides(next.currencyRates);
    stateRef.current = next;
    setState(next);
    const persisted = toPersisted(next);
    flushToLocal(next, persisted);
    void flushToServer(next, persisted);
  }, []);

  const persistCatalog = useCallback(async () => {
    const current = stateRef.current;
    const persisted = { ...toPersisted(current), updatedAt: Date.now() };
    const localOk = flushToLocal(current, persisted);
    if (!localOk) return { ok: false, error: "local" };
    return flushToServer(current, persisted);
  }, []);

  const marketProducts = useMemo(
    () =>
      filterProductsForCountry(
        state.products,
        state.country,
        state.categories
      ),
    [state.products, state.country, state.categories]
  );

  const marketCategories = useMemo(
    () => filterCategoriesForCountry(state.categories, state.country),
    [state.categories, state.country]
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

  const value: StoreContextValue = {
    ...state,
    hydrated,
    storageReady,
    geoReady,
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
