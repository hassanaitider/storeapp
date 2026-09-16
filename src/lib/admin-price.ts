import type { CountryCode, ProductQtyOffer } from "@/lib/types";

/** Parse admin price inputs that may use comma decimals or thousand separators. */
export function parseAdminPrice(raw: string): number | null {
  let s = raw.trim().replace(/\s/g, "");
  if (!s) return null;
  if (s.includes(",") && s.includes(".")) {
    if (s.lastIndexOf(",") > s.lastIndexOf(".")) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  } else if (s.includes(",")) {
    const parts = s.split(",");
    if (parts.length === 2 && parts[1].length <= 2) {
      s = `${parts[0]}.${parts[1]}`;
    } else {
      s = s.replace(/,/g, "");
    }
  }
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Keep fixed pack totals in sync when the unit shelf price changes. */
export function scaleQtyOfferMarketPrices(
  offers: ProductQtyOffer[],
  market: CountryCode,
  oldUnit: number,
  newUnit: number
): ProductQtyOffer[] {
  if (!(oldUnit > 0) || !(newUnit > 0) || oldUnit === newUnit) {
    return offers;
  }
  const ratio = newUnit / oldUnit;
  return offers.map((offer) => {
    const prev = offer.marketPrices?.[market];
    if (typeof prev !== "number" || !(prev >= 0)) return offer;
    return {
      ...offer,
      marketPrices: {
        ...(offer.marketPrices ?? {}),
        [market]: Math.round(prev * ratio * 100) / 100,
      },
    };
  });
}
