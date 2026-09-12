"use client";

import { Package, Sparkles } from "lucide-react";
import { useT } from "@/hooks/useT";
import { currencyForCountry } from "@/lib/countries";
import { formatLocalAmount } from "@/lib/currency";
import { getProductLocalPrice } from "@/lib/pricing";
import { getProductQtyOffers } from "@/lib/qty-upsell";
import { pickText } from "@/lib/localized";
import type { CountryCode, Locale, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductQtyUpsellProps = {
  product: Product;
  country: CountryCode;
  locale: Locale;
  selectedQty: number;
  onSelect: (quantity: number) => void;
  className?: string;
};

export function ProductQtyUpsell({
  product,
  country,
  locale,
  selectedQty,
  onSelect,
  className,
}: ProductQtyUpsellProps) {
  const t = useT();
  const currency = currencyForCountry(country);
  const offers = getProductQtyOffers(product, country, locale);

  return (
    <section
      id="volume-discount"
      className={cn(
        "rounded-2xl border-2 border-brand-300 bg-gradient-to-br from-brand-50/90 to-white p-4 shadow-sm sm:p-5",
        className
      )}
      aria-label={t.upsell.volumeDiscountTitle}
    >
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 shrink-0 text-brand-700" />
        <div>
          <h3 className="text-base font-bold text-brand-900 sm:text-lg">
            {t.upsell.volumeDiscountTitle}
          </h3>
          <p className="text-xs text-[var(--muted)] sm:text-sm">
            {t.upsell.volumeDiscountHint}
          </p>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {offers.map((offer) => {
          const selected = selectedQty === offer.quantity;
          const title =
            offer.quantity === 1
              ? t.upsell.onePiece
              : offer.quantity === 2
                ? t.upsell.twoPieces
                : offer.quantity === 3
                  ? t.upsell.threePieces
                  : pickText(offer, "label", locale) || `${offer.quantity}`;

          return (
            <li key={offer.quantity}>
              <button
                type="button"
                onClick={() => onSelect(offer.quantity)}
                className={cn(
                  "relative flex h-full w-full flex-col rounded-xl border-2 p-4 text-start transition",
                  selected
                    ? "border-brand-600 bg-brand-50 shadow-sm ring-2 ring-brand-600/20"
                    : "border-sand-200 bg-white hover:border-brand-400",
                  offer.popular && !selected && "border-brand-300"
                )}
              >
                {offer.popular ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    <Sparkles className="h-3 w-3" />
                    {t.upsell.popular}
                  </span>
                ) : null}

                <span className="mt-1 text-sm font-bold text-ink-900">{title}</span>

                {offer.quantity === 1 ? (
                  <span className="mt-0.5 text-xs text-[var(--muted)]">
                    {t.upsell.standardPrice}
                  </span>
                ) : null}

                <span className="mt-3 text-xl font-bold text-brand-800">
                  {formatLocalAmount(offer.totalLocal, currency, locale)}
                </span>

                {offer.savePercent > 0 && offer.fullPriceLocal > offer.totalLocal ? (
                  <span className="mt-1 text-sm text-[var(--muted)] line-through">
                    {formatLocalAmount(offer.fullPriceLocal, currency, locale)}
                  </span>
                ) : null}

                <span className="mt-2 text-xs text-[var(--muted)]">
                  {formatLocalAmount(offer.unitLocal, currency, locale)} /{" "}
                  {t.upsell.perPiece}
                </span>

                {offer.savePercent > 0 ? (
                  <span className="mt-2 inline-flex w-fit rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    {t.upsell.save} {offer.savePercent}%
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function selectedQtyTotalLocal(
  product: Product,
  country: CountryCode,
  locale: Locale,
  quantity: number
): number {
  const offers = getProductQtyOffers(product, country, locale);
  const match = offers.find((o) => o.quantity === quantity);
  if (match) return match.totalLocal;
  return getProductLocalPrice(product, country) * quantity;
}
