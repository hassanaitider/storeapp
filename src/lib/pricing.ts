import { currencyForCountry, getCountry } from "./countries";
import { convertFromUSD, formatLocalAmount, getCurrency } from "./currency";
import type { Category, CountryCode, Locale, Product } from "./types";

/** Local-currency price for a product in a given market */
export function getProductLocalPrice(
  product: Product,
  country: CountryCode
): number {
  const market = product.marketPrices?.[country];
  if (typeof market === "number" && market >= 0) return market;

  const currency = currencyForCountry(country);
  return convertFromUSD(product.priceUSD, currency);
}

export function getProductCompareLocalPrice(
  product: Product,
  country: CountryCode
): number | undefined {
  const marketCompare = product.marketComparePrices?.[country];
  if (typeof marketCompare === "number" && marketCompare > 0) {
    return marketCompare;
  }
  if (!product.compareAtUSD) return undefined;
  const currency = currencyForCountry(country);
  return convertFromUSD(product.compareAtUSD, currency);
}

/** Normalize to USD for cart/order totals */
export function getProductPriceUSD(
  product: Product,
  country: CountryCode
): number {
  const local = getProductLocalPrice(product, country);
  const currency = currencyForCountry(country);
  const rate = getCurrency(currency).rate || 1;
  return local / rate;
}

export function formatProductPrice(
  product: Product,
  country: CountryCode,
  locale: Locale = "ar"
): string {
  const currency = currencyForCountry(country);
  return formatLocalAmount(
    getProductLocalPrice(product, country),
    currency,
    locale
  );
}

export function formatProductComparePrice(
  product: Product,
  country: CountryCode,
  locale: Locale = "ar"
): string | null {
  const compare = getProductCompareLocalPrice(product, country);
  if (compare == null) return null;
  const local = getProductLocalPrice(product, country);
  if (compare <= local) return null;
  const currency = currencyForCountry(country);
  return formatLocalAmount(compare, currency, locale);
}

export function productDiscountPercent(
  product: Product,
  country: CountryCode
): number {
  const local = getProductLocalPrice(product, country);
  const compare = getProductCompareLocalPrice(product, country);
  if (!compare || compare <= local) return 0;
  return Math.round(((compare - local) / compare) * 100);
}

export function isProductAvailableIn(
  product: Product,
  country: CountryCode,
  categories: Category[] = []
): boolean {
  // Explicit market list on the product
  if (product.availableIn && product.availableIn.length > 0) {
    return product.availableIn.includes(country);
  }

  // Fall back to the product's regional category
  const cat = categories.find((c) => c.id === product.categoryId);
  if (cat?.availableIn && cat.availableIn.length > 0) {
    return cat.availableIn.includes(country);
  }
  if (cat?.country) {
    return cat.country === country;
  }

  // Infer from id pattern: cat-MA / cat-SA / …
  const match = /^cat-([A-Za-z]{2})$/.exec(product.categoryId || "");
  if (match) {
    return match[1].toUpperCase() === country;
  }

  // No country signal → hide on geo-filtered storefront
  return false;
}

export function filterProductsForCountry(
  products: Product[],
  country: CountryCode,
  categories: Category[] = []
): Product[] {
  return products.filter((p) =>
    isProductAvailableIn(p, country, categories)
  );
}

/**
 * Storefront rule: visitors only see the regional category for their
 * detected market (MA, SA, AE, OM). Untagged categories are hidden on
 * the storefront so other regional markets never leak through.
 */
export function isCategoryVisibleIn(
  category: Category,
  country: CountryCode
): boolean {
  if (category.availableIn && category.availableIn.length > 0) {
    return category.availableIn.includes(country);
  }
  if (category.country) {
    return category.country === country;
  }
  // No country tag → not a regional market category; hide on storefront
  return false;
}

export function filterCategoriesForCountry(
  categories: Category[],
  country: CountryCode
): Category[] {
  return categories.filter((c) => isCategoryVisibleIn(c, country));
}

export function countryLabel(country: CountryCode, locale: Locale): string {
  const c = getCountry(country);
  return locale === "ar" ? c.nameAr : c.nameEn;
}
