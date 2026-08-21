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
  isStoreMarket,
  isValidCountry,
} from "@/lib/countries";
import {
  DEFAULT_CURRENCY_RATES,
  isCurrencyCode,
  mergeCurrencyRates,
  setCurrencyRateOverrides,
} from "@/lib/currency";
import {
  filterProductsForCountry,
  getProductPriceUSD,
} from "@/lib/pricing";
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
}

interface StoreContextValue extends StoreState {
  hydrated: boolean;
  storageReady: boolean;
  geoReady: boolean;
  marketProducts: Product[];
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
  addCategory: (data: Omit<Category, "id" | "createdAt">) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (data: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (
    customer: Order["customer"],
    itemsOverride?: CartItem[]
  ) => Order;
  /** Wipe local data and restore seed catalog */
  resetStore: () => void;
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
  // Keep only active markets (SA / AE / OM) — drop IQ, KW, EG, etc.
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
  const seedBySlug = new Map(SEED_PRODUCTS.map((p) => [p.slug, p]));
  const merged = stored
    .map((p) => {
      const seed = seedById.get(p.id) ?? seedBySlug.get(p.slug);
      if (!seed) return p;
      return {
        ...seed,
        ...p,
        // Always refresh marketing copy & media from seed for catalog products
        nameAr: seed.nameAr,
        nameEn: seed.nameEn,
        descriptionAr: seed.descriptionAr,
        descriptionEn: seed.descriptionEn,
        detailsAr: seed.detailsAr,
        detailsEn: seed.detailsEn,
        landing: seed.landing,
        images:
          Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : seed.images,
        colors: [],
        customColorEnabled:
          typeof p.customColorEnabled === "boolean"
            ? p.customColorEnabled
            : Boolean(seed.customColorEnabled),
        categoryId: seed.categoryId,
        marketPrices: {
          ...(seed.marketPrices ?? {}),
          ...(p.marketPrices ?? {}),
        },
        marketComparePrices: {
          ...(seed.marketComparePrices ?? {}),
          ...(p.marketComparePrices ?? {}),
        },
        availableIn: seed.availableIn,
        featured: seed.featured,
        rating: seed.rating,
        reviewCount: seed.reviewCount,
      };
    })
    .filter((p) => allowedCats.has(p.categoryId));
  for (const seed of SEED_PRODUCTS) {
    if (!merged.some((p) => p.id === seed.id || p.slug === seed.slug)) {
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
      if (parsed) return parsed;
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
  };
}

function flushToLocal(state: StoreState) {
  try {
    const raw = catalogToJson(toPersisted(state));
    window.localStorage.setItem(CATALOG_STORAGE_KEY, raw);
  } catch {
    console.error("localStorage save failed");
    window.dispatchEvent(new CustomEvent("smart-shop-save-error"));
  }
}

function flushToServer(state: StoreState) {
  const body = catalogToJson(toPersisted(state));
  void fetch("/api/catalog", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  }).catch(() => {
    /* best-effort */
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
  stateRef.current = state;
  const storageReadyRef = useRef(false);

  const commit = useCallback((updater: (s: StoreState) => StoreState) => {
    setState((prev) => {
      const next = updater(prev);
      // Only flush after hydrate — otherwise defaults wipe real data
      if (typeof window !== "undefined" && storageReadyRef.current) {
        flushToLocal(next);
        flushToServer(next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        const cookieCountry = readCookieCountry();
        let next = buildDefaults(cookieCountry ?? DEFAULT_COUNTRY);

        const local = readLocalCatalog();
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

        const best =
          local && remote
            ? (remote.updatedAt || 0) > (local.updatedAt || 0)
              ? remote
              : local
            : local || remote;

        if (best) {
          next = applyPersisted(best, cookieCountry);
        }

        if (cancelled) return;
        setCurrencyRateOverrides(next.currencyRates);
        setState(next);
        storageReadyRef.current = true;
        setStorageReady(true);
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
    const timeout = window.setTimeout(() => controller.abort(), 2000);

    async function detect() {
      try {
        const res = await fetch("/api/geo", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("geo failed");
        const data = (await res.json()) as { country?: string };
        const raw =
          data.country && isValidCountry(data.country)
            ? (data.country.toUpperCase() as CountryCode)
            : null;
        const detected = raw && isStoreMarket(raw) ? raw : null;

        if (!cancelled && detected) {
          commit((s) => {
            if (s.countryManual) return s;
            const nextCurrency = s.currencyManual
              ? s.currency
              : currencyForCountry(detected);
            if (s.country === detected && s.currency === nextCurrency) return s;
            return {
              ...s,
              country: detected,
              currency: nextCurrency,
            };
          });
        }
      } catch {
        /* keep default */
      } finally {
        window.clearTimeout(timeout);
        if (!cancelled) setGeoReady(true);
      }
    }

    detect();
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
      commit((s) => ({ ...s, currency, currencyManual: manual })),
    [commit]
  );

  const setCountry = useCallback(
    (country: CountryCode, manual = true) => {
      const next = isStoreMarket(country) ? country : DEFAULT_COUNTRY;
      commit((s) => ({
        ...s,
        country: next,
        countryManual: manual,
        currency: s.currencyManual ? s.currency : currencyForCountry(next),
      }));
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
    (idOrSlug: string) =>
      state.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug),
    [state.products]
  );

  const getCategory = useCallback(
    (idOrSlug: string) =>
      state.categories.find((c) => c.id === idOrSlug || c.slug === idOrSlug),
    [state.categories]
  );

  const addCategory = useCallback(
    (data: Omit<Category, "id" | "createdAt">) => {
      commit((s) => ({
        ...s,
        categories: [
          {
            ...data,
            id: uid("cat"),
            createdAt: new Date().toISOString(),
          },
          ...s.categories,
        ],
      }));
    },
    [commit]
  );

  const updateCategory = useCallback(
    (id: string, data: Partial<Category>) => {
      commit((s) => ({
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
      commit((s) => ({
        ...s,
        products: [
          {
            ...data,
            id: uid("prod"),
            createdAt: new Date().toISOString(),
          },
          ...s.products,
        ],
      }));
    },
    [commit]
  );

  const updateProduct = useCallback(
    (id: string, data: Partial<Product>) => {
      commit((s) => ({
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
    setCurrencyRateOverrides(next.currencyRates);
    setState(next);
    flushToLocal(next);
    flushToServer(next);
  }, []);

  const marketProducts = useMemo(
    () => filterProductsForCountry(state.products, state.country),
    [state.products, state.country]
  );

  const cartCount = useMemo(
    () => state.cart.reduce((n, i) => n + i.quantity, 0),
    [state.cart]
  );

  const cartTotalUSD = useMemo(() => {
    return state.cart.reduce((sum, item) => {
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + getProductPriceUSD(product, state.country) * item.quantity;
    }, 0);
  }, [state.cart, state.products, state.country]);

  const placeOrder = useCallback(
    (customer: Order["customer"], itemsOverride?: CartItem[]) => {
      const current = stateRef.current;
      const items = itemsOverride ?? [...current.cart];
      const totalUSD = items.reduce((sum, item) => {
        const product = current.products.find((p) => p.id === item.productId);
        if (!product) return sum;
        return sum + getProductPriceUSD(product, current.country) * item.quantity;
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
      return order;
    },
    [commit]
  );

  const value: StoreContextValue = {
    ...state,
    hydrated,
    storageReady,
    geoReady,
    marketProducts,
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
