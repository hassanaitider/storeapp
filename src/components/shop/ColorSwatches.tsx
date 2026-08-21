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
        className="mt-4 flex flex-wrap gap-3"
        role="listbox"
        aria-label={t.product.chooseColor}
      >
        {colors.map((c) => {
          const pressed = (selectedId ?? colors[0]?.id) === c.id;
          const light = isLightHex(c.hex);
          return (
            <button
              key={c.id}
              type="button"
              role="option"
              aria-selected={pressed}
              onClick={() => onSelect(c.id)}
              className="group flex w-[4.6rem] flex-col items-center gap-2 border-0 bg-transparent p-0"
            >
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

function isLightHex(hex: string) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 186;
}
