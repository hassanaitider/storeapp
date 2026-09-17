"use client";

import { Gift, Plus, Trash2 } from "lucide-react";
import { currencyForCountry, usesLatamThreeQtyPacks } from "@/lib/countries";
import type { Category, CountryCode, Locale, Product, ProductQtyOffer } from "@/lib/types";
import { getProductLocalPrice } from "@/lib/pricing";

const MAX_TIERS = 5;
const LATAM_DEFAULT_TIERS: ProductQtyOffer[] = [
  { quantity: 1, discountPercent: 0 },
  { quantity: 2, discountPercent: 10, popular: true },
  { quantity: 3, discountPercent: 15 },
];

function productMarket(
  product: Product,
  categories: Category[]
): CountryCode | null {
  const cat = categories.find((c) => c.id === product.categoryId);
  return (
    cat?.country ??
    product.availableIn?.[0] ??
    null
  );
}

type ProductQtyOffersEditorProps = {
  product: Product;
  categories: Category[];
  locale: Locale;
  qtyOffers: ProductQtyOffer[];
  onChange: (offers: ProductQtyOffer[]) => void;
  compact?: boolean;
  className?: string;
};

export function ProductQtyOffersEditor({
  product,
  categories,
  locale,
  qtyOffers,
  onChange,
  compact = false,
  className,
}: ProductQtyOffersEditorProps) {
  const market = productMarket(product, categories);
  const unit = market ? getProductLocalPrice(product, market) : product.priceUSD;
  const cur = market ? currencyForCountry(market) : "USD";
  const latamThreePacks = market ? usesLatamThreeQtyPacks(market) : false;

  const updateTier = (quantity: number, patch: Partial<ProductQtyOffer>) => {
    onChange(
      qtyOffers.map((o) =>
        o.quantity === quantity ? { ...o, ...patch } : o
      )
    );
  };

  const addTier = () => {
    if (qtyOffers.length >= MAX_TIERS) return;
    const nextQty =
      qtyOffers.length === 0
        ? 1
        : Math.max(...qtyOffers.map((o) => o.quantity)) + 1;
    onChange([
      ...qtyOffers,
      {
        quantity: nextQty,
        discountPercent: nextQty >= 3 ? 15 : nextQty > 1 ? 10 : 0,
        popular: nextQty === 2,
      },
    ]);
  };

  const ensureLatamThree = () => {
    if (!latamThreePacks) return;
    if (qtyOffers.length >= 3) return;
    const byQty = new Map(qtyOffers.map((o) => [o.quantity, o]));
    const next = LATAM_DEFAULT_TIERS.map(
      (d) => byQty.get(d.quantity) ?? { ...d }
    );
    onChange(next);
  };

  const removeTier = (quantity: number) => {
    onChange(qtyOffers.filter((o) => o.quantity !== quantity));
  };

  const sorted = [...qtyOffers].sort((a, b) => a.quantity - b.quantity);

  return (
    <div className={className}>
      {!compact ? (
        <div className="mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-brand-700" />
          <div>
            <h3 className="text-sm font-bold text-ink-900 sm:text-base">
              {locale === "ar"
                ? "Upsell — عروض الكمية (نفس المنتج)"
                : "Upsell — quantity tiers (same product)"}
            </h3>
            <p className="text-xs text-[var(--muted)] sm:text-sm">
              {latamThreePacks
                ? locale === "ar"
                  ? `أمريكا اللاتينية: يلزم 3 عروض (1 / 2 / 3). السعر الفردي ≈ ${unit} ${cur}.`
                  : locale === "es"
                    ? `América Latina: usa 3 ofertas (1 / 2 / 3). Precio unitario ≈ ${unit} ${cur}.`
                    : `Latin America: use 3 offers (1 / 2 / 3). Unit ≈ ${unit} ${cur}.`
                : locale === "ar"
                  ? `حدّد عروض 1 / 2 / 3 قطع. السعر الفردي ≈ ${unit} ${cur}. اتركه فارغاً لاستخدام العروض الافتراضية.`
                  : `Set 1 / 2 / 3 piece offers. Unit ≈ ${unit} ${cur}. Leave empty for defaults.`}
            </p>
          </div>
        </div>
      ) : null}

      {latamThreePacks && sorted.length < 3 ? (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          <span>
            {locale === "ar"
              ? "يُفضّل 3 عروض لكل أسواق أمريكا اللاتينية في الـ checkout."
              : locale === "es"
                ? "Se recomiendan 3 ofertas para todos los mercados LATAM en el checkout."
                : "3 offers recommended for every Latam market in checkout."}
          </span>
          <button
            type="button"
            onClick={ensureLatamThree}
            className="rounded-lg bg-amber-700 px-2.5 py-1 text-xs font-bold text-white hover:bg-amber-600"
          >
            {locale === "ar" ? "إضافة 3 عروض" : locale === "es" ? "Cargar 3 ofertas" : "Load 3 offers"}
          </button>
        </div>
      ) : null}

      {sorted.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          {locale === "ar"
            ? "لا عروض مخصصة — يُستخدم افتراضياً: 1 قطعة، 2 (-5%)، 3 (-10%)"
            : "No custom tiers — defaults: 1 pc, 2 (-5%), 3 (-10%)"}
        </p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((offer) => {
            const price =
              market && offer.marketPrices?.[market] != null
                ? offer.marketPrices[market]
                : "";
            return (
              <li
                key={offer.quantity}
                className="rounded-xl border border-sand-200 bg-white p-3"
              >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="block text-sm">
                    <span className="font-medium">
                      {locale === "ar" ? "الكمية" : "Quantity"}
                    </span>
                    <input
                      type="number"
                      min={1}
                      className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2"
                      value={offer.quantity}
                      onChange={(e) => {
                        const nextQty = Math.max(1, Number(e.target.value) || 1);
                        onChange(
                          qtyOffers.map((o) =>
                            o.quantity === offer.quantity
                              ? { ...o, quantity: nextQty }
                              : o
                          )
                        );
                      }}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium">
                      {locale === "ar"
                        ? `السعر الإجمالي (${cur})`
                        : `Total price (${cur})`}
                    </span>
                    <input
                      type="number"
                      step="any"
                      min={0}
                      className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2"
                      placeholder={
                        locale === "ar" ? "تلقائي من الخصم %" : "Auto from % off"
                      }
                      value={price}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!market) return;
                        updateTier(offer.quantity, {
                          marketPrices: val
                            ? {
                                ...(offer.marketPrices ?? {}),
                                [market]: Number(val),
                              }
                            : undefined,
                        });
                      }}
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium">
                      {locale === "ar" ? "خصم %" : "Discount %"}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      className="mt-1 w-full rounded-lg border border-sand-300 px-3 py-2"
                      value={offer.discountPercent ?? 0}
                      onChange={(e) =>
                        updateTier(offer.quantity, {
                          discountPercent: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label className="flex items-end gap-2 pb-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(offer.popular)}
                      onChange={(e) =>
                        updateTier(offer.quantity, {
                          popular: e.target.checked,
                        })
                      }
                    />
                    {locale === "ar" ? "الأكثر طلباً" : "Most popular"}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => removeTier(offer.quantity)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {locale === "ar" ? "حذف" : "Remove"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={addTier}
        disabled={qtyOffers.length >= MAX_TIERS}
        className="mt-3 inline-flex items-center gap-1 rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-100 disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
        {locale === "ar" ? "إضافة عرض" : "Add tier"}
      </button>
    </div>
  );
}

export function qtyOfferSummary(
  product: Product,
  locale: Locale
): string {
  if (!product.qtyOffers?.length) {
    return locale === "ar" ? "افتراضي (1 / 2 / 3)" : "Default (1 / 2 / 3)";
  }
  return product.qtyOffers
    .map((o) => `${o.quantity}${o.popular ? " ★" : ""}`)
    .join(" · ");
}
