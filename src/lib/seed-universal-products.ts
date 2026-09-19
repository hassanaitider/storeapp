import type { Product } from "./types";

/** Removed from the catalog: windshield sun umbrella, neck fan, Elevador de Colchón. */
export function isRetiredStoreProduct(p: {
  id?: string;
  slug?: string;
  nameAr?: string;
  nameEn?: string;
  nameEs?: string;
}): boolean {
  const id = (p.id ?? "").toLowerCase();
  const slug = (p.slug ?? "").toLowerCase();
  const nameAr = p.nameAr ?? "";
  const nameEn = (p.nameEn ?? "").toLowerCase();
  const nameEs = (p.nameEs ?? "").trim().toLowerCase();
  if (id.includes("car-windshield-umbrella") || id.includes("prod-neck-fan")) {
    return true;
  }
  if (id.includes("prod-mattress-lifter")) return true;
  if (
    slug.includes("car-windshield-sunshade-umbrella") ||
    slug.includes("rechargeable-neck-fan") ||
    slug === "elevador-de-colchon"
  ) {
    return true;
  }
  if (
    nameAr.includes("مظلة شمس") ||
    nameAr.includes("مظلة زجاج") ||
    nameAr.includes("مروحة رقبة") ||
    nameAr.includes("مروحية الرقبة")
  ) {
    return true;
  }
  if (nameEn.includes("windshield") && nameEn.includes("umbrella")) return true;
  if (nameEn.includes("neck fan")) return true;
  if (nameEn === "mattress lifter") return true;
  if (nameEs === "elevador de colchón") return true;
  return false;
}

export const UNIVERSAL_MARKET_PRODUCTS: Product[] = [];
