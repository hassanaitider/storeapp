"use client";

import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import type { Locale, ProductColor } from "@/lib/types";

type Props = {
  colors: ProductColor[];
  locale: Locale;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ColorSwatches({
  colors,
  locale,
  selectedId,
  onSelect,
}: Props) {
  const t = useT();
  if (!colors.length) return null;

  const selected = colors.find((c) => c.id === selectedId) ?? colors[0];
  const useBag = colors.some((c) => c.swatchShape === "bag");

  return (
    <section className="mt-6" aria-label={t.product.chooseColor}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="product-section-title text-lg sm:text-xl">
          {t.product.chooseColor}
        </h2>
        {selected && (
          <p className="product-caption">
            {t.product.selectedColor}:{" "}
            <span className="font-bold text-brand-800">
              {locale === "ar" ? selected.nameAr : selected.nameEn}
            </span>
          </p>
        )}
      </div>

      <div
        className={cn(
          "mt-4 flex flex-wrap gap-3",
          useBag && "gap-4 sm:gap-5"
        )}
        role="listbox"
        aria-label={t.product.chooseColor}
      >
        {colors.map((c) => {
          const pressed = (selectedId ?? colors[0]?.id) === c.id;
          const bag = c.swatchShape === "bag";
          const light = isLightHex(c.hex);
          return (
            <button
              key={c.id}
              type="button"
              role="option"
              aria-selected={pressed}
              onClick={() => onSelect(c.id)}
              className={cn(
                "group flex flex-col items-center gap-2 border-0 bg-transparent p-0",
                bag ? "w-[5.25rem] sm:w-[5.75rem]" : "w-[4.6rem]"
              )}
            >
              {bag ? (
                <span
                  className={cn(
                    "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border bg-sand-50 transition duration-200 sm:h-[5rem] sm:w-[5rem]",
                    pressed
                      ? "scale-105 border-brand-600 shadow-[0_0_0_2px_var(--accent,#3f8b74),0_10px_22px_rgba(63,139,116,0.28)]"
                      : "border-sand-200 group-hover:scale-[1.03] group-hover:border-sand-300"
                  )}
                >
                  <BagSwatchIcon
                    primary={c.hex}
                    accent={c.accentHex ?? c.hex}
                    className="h-14 w-14 sm:h-16 sm:w-16"
                  />
                </span>
              ) : (
                <span
                  className={cn(
                    "h-11 w-11 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(18,24,22,0.16),0_8px_18px_rgba(18,24,22,0.08)] transition duration-200",
                    pressed &&
                      "scale-110 shadow-[0_0_0_2px_var(--accent,#3f8b74),0_10px_22px_rgba(63,139,116,0.28)]",
                    !pressed && "group-hover:scale-105",
                    light && "border-sand-300"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              )}
              <span
                className={cn(
                  "text-center text-[11px] font-semibold leading-snug sm:text-xs",
                  pressed ? "text-brand-800" : "text-[var(--muted)]"
                )}
              >
                {locale === "ar" ? c.nameAr : c.nameEn}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BagSwatchIcon({
  primary,
  accent,
  className,
}: {
  primary: string;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* strap */}
      <path
        d="M28 10c0-4 3.5-7 8-7s8 3 8 7v6h-4.5V11c0-1.8-1.5-3.2-3.5-3.2S33 9.2 33 11v5H28V10z"
        fill="#1a1a1a"
        opacity="0.85"
      />
      {/* body */}
      <rect x="14" y="16" width="36" height="40" rx="7" fill={primary} />
      {/* side panel (accent / or / bleu) */}
      <path
        d="M14 22c0-3.3 2.7-6 6-6h4v40h-4c-3.3 0-6-2.7-6-6V22z"
        fill={accent}
      />
      {/* front pocket hint */}
      <rect
        x="28"
        y="26"
        width="16"
        height="22"
        rx="3"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      {/* USB port hint on accent panel */}
      <rect x="17.5" y="36" width="3.5" height="5" rx="0.8" fill="#111" />
    </svg>
  );
}

function isLightHex(hex: string) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 186;
}
