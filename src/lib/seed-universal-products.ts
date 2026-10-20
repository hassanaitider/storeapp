import type { Product } from "./types";

/**
 * Removed from the catalog: windshield umbrella, neck fan, Elevador, sling bag,
 * rolling cart, steam iron, and the old multi-market neck/shoulder massager
 * (prod-neck-massager @ 179 MAD) — not the Morocco hand massager at 329 MAD.
 */
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
  if (
    id.includes("car-windshield-umbrella") ||
    id.includes("prod-neck-fan") ||
    id === "prod-fashion-sling" ||
    id === "prod-rolling-cart" ||
    id === "prod-steam-iron-ma" ||
    id === "prod-neck-massager"
  ) {
    return true;
  }
  if (id.includes("prod-mattress-lifter")) return true;
  if (
    slug.includes("car-windshield-sunshade-umbrella") ||
    slug.includes("rechargeable-neck-fan") ||
    slug === "elevador-de-colchon" ||
    slug === "anti-theft-usb-sling-bag" ||
    slug === "3-tier-rolling-storage-cart" ||
    slug === "mini-fer-vapeur-portable" ||
    slug === "neck-shoulder-massager"
  ) {
    return true;
  }
  if (
    nameAr.includes("مظلة شمس") ||
    nameAr.includes("مظلة زجاج") ||
    nameAr.includes("مروحة رقبة") ||
    nameAr.includes("مروحية الرقبة") ||
    nameAr.includes("مروحة الرقبة") ||
    nameAr.includes("حقيبة كتف") ||
    nameAr.includes("عربة تخزين متنقلة") ||
    nameAr.includes("جهاز تدليك رقبة")
  ) {
    return true;
  }
  if (nameEn.includes("windshield") && nameEn.includes("umbrella")) return true;
  if (nameEn.includes("neck fan")) return true;
  if (nameEn.includes("anti-theft") && nameEn.includes("sling")) return true;
  if (nameEn.includes("rolling storage cart")) return true;
  if (nameEn === "mattress lifter") return true;
  if (nameEn === "neck & shoulder massager") return true;
  if (nameEs === "elevador de colchón") return true;
  return false;
}

export const UNIVERSAL_MARKET_PRODUCTS: Product[] = [];
