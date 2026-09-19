"use client";

import { cn } from "@/lib/utils";
import type { ResolvedQtyOffer } from "@/lib/qty-upsell";

type Props = {
  packs: ResolvedQtyOffer[];
  qty: number;
  onQtyChange: (qty: number) => void;
  formatPrice: (amount: number) => string;
  /** When false, packs stay hidden (admin upsell switch). */
  enabled?: boolean;
};

/** Three COD quantity prices shown under the color field. */
export function LatamCodQtyPacks({
  packs,
  qty,
  onQtyChange,
  formatPrice,
  enabled = true,
}: Props) {
  if (!enabled || packs.length === 0) return null;
  return (
    <div className="space-y-2.5">
      {packs.map((offer) => {
        const selected = qty === offer.quantity;
        const disc = offer.savePercent ?? 0;
        const label =
          offer.quantity === 1
            ? "Compra 1 unidad"
            : `Compra ${offer.quantity} · ahorra ${disc || 10}%`;

        return (
          <button
            key={offer.quantity}
            type="button"
            onClick={() => onQtyChange(offer.quantity)}
            className={cn(
              "relative flex w-full items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-3.5 text-start transition",
              selected
                ? "border-[#ff7a00] bg-[#fff7f0]"
                : "border-[#e6e6e6] bg-white hover:border-[#ffb366]"
            )}
          >
            {offer.quantity > 1 && disc > 0 ? (
              <span className="absolute -top-2 end-3 rounded-full bg-[#ff7a00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Ahorra {disc}%
              </span>
            ) : null}
            <span className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  selected
                    ? "border-[#ff7a00] bg-[#ff7a00]"
                    : "border-[#cfcfcf] bg-white"
                )}
              >
                {selected ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </span>
              <span className="text-sm font-semibold text-[#222] sm:text-[15px]">
                {label}
              </span>
            </span>
            <span className="shrink-0 text-end">
              <span className="block text-base font-extrabold text-[#ff7a00] sm:text-lg">
                {formatPrice(offer.totalLocal)}
              </span>
              {offer.fullPriceLocal > offer.totalLocal ? (
                <span className="text-xs text-[#999] line-through">
                  {formatPrice(offer.fullPriceLocal)}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
