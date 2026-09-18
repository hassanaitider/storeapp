"use client";

import { Gift } from "lucide-react";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  children?: ReactNode;
};

/** Switch: show or hide 1 / 2 / 3 quantity packs on LATAM checkout */
export function ProductUpsellEditor({ enabled, onChange, children }: Props) {
  const t = useT();

  return (
    <section className="rounded-2xl border border-sand-200 bg-sand-50/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-brand-700" />
            <h2 className="text-sm font-bold text-ink-900">
              {t.admin.upsellOption}
            </h2>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            {t.admin.upsellToggleHint}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={enabled ? t.admin.upsellActive : t.admin.upsellInactive}
          onClick={() => onChange(!enabled)}
          className={cn(
            "inline-flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition",
            enabled
              ? "border-brand-600 bg-brand-50 text-brand-900"
              : "border-sand-300 bg-white text-ink-800"
          )}
        >
          <span
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full transition",
              enabled ? "bg-brand-700" : "bg-sand-300"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition",
                enabled ? "start-5" : "start-0.5"
              )}
            />
          </span>
          {enabled ? t.admin.upsellActive : t.admin.upsellInactive}
        </button>
      </div>

      <p
        className={cn(
          "mt-4 rounded-xl border px-3 py-2.5 text-xs font-medium",
          enabled
            ? "border-brand-200 bg-white text-brand-800"
            : "border-sand-200 bg-white text-[var(--muted)]"
        )}
      >
        {enabled ? t.admin.upsellFieldOn : t.admin.upsellFieldOff}
      </p>

      {enabled && children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
