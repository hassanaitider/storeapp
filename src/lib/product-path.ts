import type { CountryCode, Product } from "@/lib/types";

/** /{cc}/product/{slug} — a single-market listing uses its own market, otherwise the shopper's. */
export function productPath(product: Product, country: CountryCode): string {
  const market =
    product.availableIn?.length === 1 ? product.availableIn[0] : country;
  return `/${market.toLowerCase()}/product/${encodeURIComponent(product.slug)}`;
}
