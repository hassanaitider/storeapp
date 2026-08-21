"use client";

import { Palette } from "lucide-react";
import type { Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  locale: Locale;
};

/** Icon toggle: enable a free-text color field for the customer */
export function ProductColorsEditor({ enabled, onChange, locale }: Props) {
  const ar = locale === "ar";

  return (
    <section className="rounded-2xl border border-sand-200 bg-sand-50/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-ink-900">
            {ar ? "لون يكتبه العميل" : "Customer-written color"}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {ar
              ? "لا توجد ألوان جاهزة. فعّل الأيقونة لإظهار خانة في صفحة المنتج يكتب فيها الزبون اللون الذي يريده."
              : "No preset colors. Toggle the icon to show a field on the product page where the customer types the color they want."}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          title={
            enabled
              ? ar
                ? "إيقاف خانة اللون"
                : "Disable color field"
              : ar
                ? "تفعيل خانة اللون"
                : "Enable color field"
          }
          className={cn(
            "inline-flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border-2 transition",
            enabled
              ? "border-brand-600 bg-brand-700 text-white shadow-md shadow-brand-900/20"
              : "border-sand-300 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50"
          )}
        >
          <Palette className="h-6 w-6" strokeWidth={2.2} />
          <span className="text-[9px] font-bold uppercase tracking-wide">
            {enabled ? (ar ? "مفعّل" : "ON") : ar ? "إيقاف" : "OFF"}
          </span>
        </button>
      </div>

      {enabled ? (
        <p className="mt-4 rounded-xl border border-brand-200 bg-white px-3 py-2.5 text-xs font-medium text-brand-800">
          {ar
            ? "✓ سيظهر للعميل حقل: «اكتب اللون الذي تريده» عند الطلب."
            : "✓ Customers will see: “Write the color you want” on the product page."}
        </p>
      ) : null}
    </section>
  );
}
