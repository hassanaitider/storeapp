"use client";

import {
  BadgeCheck,
  BatteryCharging,
  Check,
  ChevronDown,
  Feather,
  HandCoins,
  HeartPulse,
  Leaf,
  Lightbulb,
  Package,
  Palette,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { pickList, pickText } from "@/lib/localized";
import type { Locale, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/shop/ProductImage";

export const PRO_ICONS: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  battery: BatteryCharging,
  feather: Feather,
  heart: HeartPulse,
  leaf: Leaf,
  light: Lightbulb,
  package: Package,
  palette: Palette,
  ruler: Ruler,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
};

function scrollToOrder() {
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OrderButton({ label, light }: { label: string; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={scrollToOrder}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-bold shadow-lg transition sm:w-auto sm:min-w-[16rem]",
        light
          ? "bg-white text-brand-800 hover:bg-sand-50"
          : "bg-brand-700 text-white hover:bg-brand-600"
      )}
    >
      {label}
    </button>
  );
}

/** Headline, intro and icon highlights under the gallery */
export function ProIntro({ product, locale }: { product: Product; locale: Locale }) {
  const landing = product.landing;
  if (!landing) return null;
  const highlights = landing.highlights ?? [];
  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-[1.5rem] bg-gradient-to-br from-brand-800 to-brand-700 px-5 py-7 text-white shadow-[0_18px_50px_rgba(14,34,29,0.18)] sm:px-8 sm:py-9">
        <h2 className="text-balance text-2xl font-bold leading-snug sm:text-3xl">
          {pickText(landing, "headline", locale)}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/85 sm:text-base">
          {pickText(landing, "intro", locale)}
        </p>
      </div>
      {highlights.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h) => {
            const Icon = PRO_ICONS[h.icon] ?? BadgeCheck;
            const title = pickText(h, "title", locale);
            return (
              <li
                key={title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-sand-200 bg-white px-3 py-4 text-center shadow-[0_6px_20px_rgba(14,34,29,0.05)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-700" />
                </span>
                <span className="text-sm font-bold leading-snug text-ink-900">{title}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/** Landing-page style description: alternating image/text blocks, specs, CTA bands, FAQ */
export function ProLanding({ product, locale }: { product: Product; locale: Locale }) {
  const t = useT();
  const landing = product.landing;
  if (!landing) return null;
  const details = pickList(product, "details", locale);
  const benefits = pickList(landing, "benefits", locale);
  const orderLabel =
    locale === "ar" ? "اطلب الآن — الدفع عند الاستلام" : locale === "es" ? "Pide ahora — pago contra entrega" : "Order now — cash on delivery";

  return (
    <div className="mt-14 space-y-14 sm:space-y-16">
      <div className="space-y-6 sm:space-y-8">
        {landing.sections.map((section, i) => {
          const title = pickText(section, "title", locale);
          const body = pickText(section, "body", locale);
          const flip = i % 2 === 1;
          return (
            <section
              key={`${title}-${i}`}
              className={cn(
                "overflow-hidden rounded-[1.5rem] border border-sand-200 shadow-[0_10px_34px_rgba(14,34,29,0.06)] sm:grid sm:grid-cols-2 sm:items-center",
                flip ? "bg-brand-50/60" : "bg-white"
              )}
            >
              {section.image ? (
                <div className={cn("aspect-square bg-white", flip && "sm:order-2")}>
                  <ProductImage
                    src={section.image}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug text-ink-900 sm:text-2xl">{title}</h3>
                <p className="product-body mt-3 text-[var(--muted)]">{body}</p>
              </div>
            </section>
          );
        })}
      </div>

      {details.length > 0 && (
        <section className="mx-auto max-w-3xl rounded-[1.5rem] border border-sand-200 bg-white p-5 shadow-[0_10px_34px_rgba(14,34,29,0.05)] sm:p-8">
          <h3 className="flex items-center gap-2 text-xl font-bold text-ink-900">
            <Package className="h-5 w-5 text-brand-700" />
            {t.product.details}
          </h3>
          <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-3 border-b border-sand-100 py-3 text-ink-800">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
                  <Check className="h-3.5 w-3.5 text-brand-700" />
                </span>
                <span className="text-[15px] leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-ink-900 px-5 py-8 text-white shadow-[0_18px_50px_rgba(14,34,29,0.2)] sm:px-8 sm:py-10">
          <h3 className="text-center text-2xl font-bold">{t.product.whyBuy}</h3>
          <ul className="mx-auto mt-6 grid max-w-xl gap-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <BadgeCheck className="h-5 w-5 shrink-0 text-brand-300" />
                <span className="text-[15px] font-semibold">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex justify-center">
            <OrderButton label={orderLabel} light />
          </div>
        </section>
      )}

      <section className="mx-auto grid max-w-3xl grid-cols-3 gap-3">
        {[
          { icon: Truck, label: t.trust.freeShipping },
          { icon: HandCoins, label: t.trust.cod },
          { icon: RotateCcw, label: t.trust.returns },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-sand-200 bg-white px-2 py-5 text-center shadow-[0_6px_20px_rgba(14,34,29,0.05)]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700">
              <Icon className="h-6 w-6 text-white" />
            </span>
            <span className="text-xs font-bold leading-snug text-ink-900 sm:text-sm">{label}</span>
          </div>
        ))}
      </section>

      {landing.faq.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <h3 className="text-center text-2xl font-bold text-ink-900">{t.product.faq}</h3>
          <div className="mt-6 space-y-3">
            {landing.faq.map((item) => {
              const q = pickText(item, "question", locale);
              const a = pickText(item, "answer", locale);
              return (
                <details
                  key={q}
                  className="group rounded-2xl border border-sand-200 bg-white px-5 py-4 shadow-[0_4px_14px_rgba(14,34,29,0.04)] open:border-brand-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold text-ink-900">
                    {q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-brand-600 transition group-open:rotate-180" />
                  </summary>
                  <p className="product-body mt-3 text-[var(--muted)]">{a}</p>
                </details>
              );
            })}
          </div>
        </section>
      )}

      <div className="flex justify-center">
        <OrderButton label={orderLabel} />
      </div>
    </div>
  );
}
