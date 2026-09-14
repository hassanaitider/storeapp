import { SEED_PRODUCTS } from "@/lib/seed";
import type { CountryCode, Product } from "@/lib/types";
import type { PersistedCatalog } from "@/lib/catalog-persist";

const ELEVADOR_ID = /^prod-mattress-lifter-([a-z]{2})$/i;

function elevadorMarket(id: string): CountryCode | null {
  const m = ELEVADOR_ID.exec(id);
  if (!m) return null;
  return m[1].toUpperCase() as CountryCode;
}

/**
 * Pin each Elevador row to its country and keep admin shelf prices from being
 * accidentally overwritten by a stale browser still holding seed defaults.
 */
export function repairCatalogProduct(
  incoming: Product,
  existing: Product | undefined,
  seed: Product | undefined
): Product {
  const market = elevadorMarket(incoming.id);
  if (!market || !seed?.availableIn?.length) {
    return incoming;
  }

  const seedLocal = seed.marketPrices?.[market];
  const incomingLocal = incoming.marketPrices?.[market];
  const existingLocal = existing?.marketPrices?.[market];

  let local =
    typeof incomingLocal === "number" && incomingLocal >= 0
      ? incomingLocal
      : typeof existingLocal === "number" && existingLocal >= 0
        ? existingLocal
        : seedLocal;

  // Stale admin tab re-uploaded the seed price — keep the durable admin edit
  if (
    typeof existingLocal === "number" &&
    typeof incomingLocal === "number" &&
    typeof seedLocal === "number" &&
    incomingLocal === seedLocal &&
    existingLocal !== seedLocal
  ) {
    local = existingLocal;
  }

  const seedCompare = seed.marketComparePrices?.[market];
  const incomingCompare = incoming.marketComparePrices?.[market];
  const existingCompare = existing?.marketComparePrices?.[market];
  let compare =
    typeof incomingCompare === "number" && incomingCompare > 0
      ? incomingCompare
      : typeof existingCompare === "number" && existingCompare > 0
        ? existingCompare
        : seedCompare;

  if (
    typeof existingCompare === "number" &&
    typeof incomingCompare === "number" &&
    typeof seedCompare === "number" &&
    incomingCompare === seedCompare &&
    existingCompare !== seedCompare
  ) {
    compare = existingCompare;
  }

  return {
    ...incoming,
    id: seed.id,
    slug: seed.slug,
    categoryId: seed.categoryId,
    availableIn: [...seed.availableIn],
    marketPrices:
      typeof local === "number" ? { [market]: local } : { ...(seed.marketPrices ?? {}) },
    marketComparePrices:
      typeof compare === "number"
        ? { [market]: compare }
        : { ...(seed.marketComparePrices ?? {}) },
    priceUSD:
      typeof incoming.priceUSD === "number"
        ? incoming.priceUSD
        : typeof existing?.priceUSD === "number"
          ? existing.priceUSD
          : seed.priceUSD,
    compareAtUSD: incoming.compareAtUSD ?? existing?.compareAtUSD ?? seed.compareAtUSD,
  };
}

/** Merge an admin PUT with the durable catalog so one stale tab cannot wipe prices. */
export function mergeCatalogOnPut(
  incoming: PersistedCatalog,
  existing: PersistedCatalog | null
): PersistedCatalog {
  const seedById = new Map(SEED_PRODUCTS.map((p) => [p.id, p]));
  const existingById = new Map(
    (existing?.products ?? []).map((p) => [p.id, p])
  );

  const merged = (incoming.products ?? []).map((p) =>
    repairCatalogProduct(p, existingById.get(p.id), seedById.get(p.id))
  );

  for (const seed of SEED_PRODUCTS) {
    if (!ELEVADOR_ID.test(seed.id)) continue;
    if (merged.some((p) => p.id === seed.id)) continue;
    const prev = existingById.get(seed.id);
    merged.push(repairCatalogProduct(prev ?? seed, prev, seed));
  }

  return {
    ...incoming,
    countryManual: false,
    products: merged,
    updatedAt: Math.max(incoming.updatedAt || 0, existing?.updatedAt || 0),
  };
}
