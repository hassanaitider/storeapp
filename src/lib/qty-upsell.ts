import { currencyForCountry, isSouthAmericaMarket } from "./countries";
import { convertToUSD, getCurrency } from "./currency";
import { getProductLocalPrice, getProductPriceUSD } from "./pricing";
import type { CountryCode, Locale, Product, ProductQtyOffer } from "./types";

export type ResolvedQtyOffer = {
  quantity: number;
  totalLocal: number;
  fullPriceLocal: number;
  unitLocal: number;
  savePercent: number;
  labelAr: string;
  labelEn: string;
  popular: boolean;
};

const DEFAULT_TIERS: Pick<
  ProductQtyOffer,
  "quantity" | "discountPercent" | "popular"
>[] = [
  { quantity: 1, discountPercent: 0 },
  { quantity: 2, discountPercent: 5, popular: true },
  { quantity: 3, discountPercent: 10 },
];

function tierTotalLocal(
  product: Product,
  country: CountryCode,
  offer: ProductQtyOffer
): number {
  const custom = offer.marketPrices?.[country];
  if (typeof custom === "number" && custom >= 0) return custom;

  const unit = getProductLocalPrice(product, country);
  const base = unit * offer.quantity;
  const pct = offer.discountPercent ?? 0;
  if (pct > 0) {
    return Math.round(base * (1 - pct / 100) * 100) / 100;
  }
  return Math.round(base * 100) / 100;
}

/** Quantity upsell tiers for the same product (defaults: 1 / 2 / 3 pcs). */
export function getProductQtyOffers(
  product: Product,
  country: CountryCode,
  locale: Locale
): ResolvedQtyOffer[] {
  const unit = getProductLocalPrice(product, country);
  const configured: ProductQtyOffer[] = product.qtyOffers?.length
    ? [...product.qtyOffers].sort((a, b) => a.quantity - b.quantity)
    : DEFAULT_TIERS.map((t) => ({ ...t }));

  return configured.map((offer) => {
    const totalLocal = tierTotalLocal(product, country, offer);
    const fullPrice = unit * offer.quantity;
    const savePercent =
      fullPrice > totalLocal
        ? Math.round(((fullPrice - totalLocal) / fullPrice) * 100)
        : 0;

    const qtyLabel =
      locale === "ar"
        ? offer.quantity === 1
          ? "قطعة واحدة"
          : `${offer.quantity} قطع`
        : offer.quantity === 1
          ? "1 piece"
          : `${offer.quantity} pieces`;

    return {
      quantity: offer.quantity,
      totalLocal,
      fullPriceLocal: fullPrice,
      unitLocal: Math.round((totalLocal / offer.quantity) * 100) / 100,
      savePercent,
      labelAr: offer.labelAr?.trim() || qtyLabel,
      labelEn: offer.labelEn?.trim() || qtyLabel,
      popular: Boolean(offer.popular),
    };
  });
}

export function lineTotalUSDForQty(
  product: Product,
  country: CountryCode,
  quantity: number
): number {
  const offers = getProductQtyOffers(product, country, "en");
  const match = offers.find((o) => o.quantity === quantity);
  const local =
    match?.totalLocal ?? getProductLocalPrice(product, country) * quantity;
  const currency = currencyForCountry(country);
  return convertToUSD(local, currency);
}

export function cartItemLineUSD(
  product: Product,
  country: CountryCode,
  item: { quantity: number; lineTotalUSD?: number }
): number {
  if (typeof item.lineTotalUSD === "number" && item.lineTotalUSD >= 0) {
    return item.lineTotalUSD;
  }
  return getProductPriceUSD(product, country) * item.quantity;
}

export function cartItemLineLocal(
  product: Product,
  country: CountryCode,
  item: { quantity: number; lineTotalUSD?: number }
): number {
  if (typeof item.lineTotalUSD === "number" && item.lineTotalUSD >= 0) {
    const currency = currencyForCountry(country);
    const rate = getCurrency(currency).rate || 1;
    return item.lineTotalUSD * rate;
  }
  return getProductLocalPrice(product, country) * item.quantity;
}

/**
 * COD pack radios: South America shows 3 tiers (1/2/3);
 * other markets keep 2 (1/2). When upsell is off, only qty 1.
 */
export function selectCodQtyPacks(
  offers: ResolvedQtyOffer[],
  country: string,
  upsellEnabled = true
): ResolvedQtyOffer[] {
  if (!upsellEnabled) {
    const one = offers.find((o) => o.quantity === 1);
    return one ? [one] : offers.slice(0, 1);
  }
  const maxPacks = isSouthAmericaMarket(country) ? 3 : 2;
  const wanted =
    maxPacks === 3
      ? offers.filter(
          (o) => o.quantity === 1 || o.quantity === 2 || o.quantity === 3
        )
      : offers.filter((o) => o.quantity === 1 || o.quantity === 2);
  if (wanted.length) return wanted.slice(0, maxPacks);
  return offers.slice(0, maxPacks);
}
