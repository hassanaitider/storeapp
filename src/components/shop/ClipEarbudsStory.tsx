"use client";

import { Check, ChevronDown } from "lucide-react";
import { useT } from "@/hooks/useT";
import { pickList, pickText } from "@/lib/localized";
import type { Locale, Product } from "@/lib/types";
import { ProductImage } from "@/components/shop/ProductImage";

const STATS = [
  {
    value: "9D",
    labelAr: "صوت مذهل",
    labelEn: "shocking sound",
    labelEs: "sonido impresionante",
  },
  {
    value: "5.3",
    labelAr: "بلوتوث",
    labelEn: "Bluetooth",
    labelEs: "Bluetooth",
  },
  {
    value: "LED",
    labelAr: "شاشة شحن",
    labelEn: "power display",
    labelEs: "pantalla de carga",
  },
  {
    value: "HIFI",
    labelAr: "مكالمات HD",
    labelEn: "HD voice calls",
    labelEs: "llamadas HD",
  },
];

function loc(locale: Locale, ar: string, en: string, es: string) {
  if (locale === "ar") return ar;
  if (locale === "es") return es;
  return en;
}

export function ClipEarbudsStory({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  const landing = product.landing;
  const details = pickList(product, "details", locale);
  const benefits = pickList(landing, "benefits", locale);

  if (!landing?.sections?.length) return null;

  return (
    <div className="mt-14 space-y-14 sm:space-y-16">
      <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="rounded-2xl border border-sand-200 bg-sand-50 px-3 py-4 text-center"
          >
            <p className="text-xl font-extrabold text-ink-900">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-[var(--muted)]">
              {loc(locale, stat.labelAr, stat.labelEn, stat.labelEs)}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl overflow-hidden rounded-[1.25rem] border border-sand-200">
        <div className="grid sm:grid-cols-2">
          <div className="bg-sand-50 px-5 py-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">
              {loc(
                locale,
                "سماعة عادية داخل الأذن",
                "Typical in-ear buds",
                "Auriculares in-ear comunes"
              )}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-800">
              <li>
                {loc(
                  locale,
                  "تغلق الأذن وتعزل المحيط",
                  "Seal the ear and block surroundings",
                  "Cierran el oído y aíslan el entorno"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "ما كاينش شاشة تبين الشحن",
                  "No screen to show remaining charge",
                  "Sin pantalla que muestre la carga"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "غير مريحة في الرياضة الطويلة",
                  "Uncomfortable on long workouts",
                  "Incómodos en entrenamientos largos"
                )}
              </li>
            </ul>
          </div>
          <div className="bg-brand-700 px-5 py-6 text-white">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/80">
              {loc(
                locale,
                "هذه السماعات",
                "These clip earbuds",
                "Estos audífonos de clip"
              )}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                {loc(
                  locale,
                  "كليب مفتوح الأذن · راحة رياضية",
                  "Open-ear clip · sports comfort",
                  "Clip de oído abierto · comodidad deportiva"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "شاشة رقمية HD للعلبة و L / R",
                  "HD digital display for case and L / R",
                  "Pantalla digital HD del estuche y L / R"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "صوت 9D · بلوتوث 5.3 · مكالمات HIFI",
                  "9D sound · Bluetooth 5.3 · HIFI calls",
                  "Sonido 9D · Bluetooth 5.3 · llamadas HIFI"
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {landing.sections.map((section, i) => {
        const title = pickText(section, "title", locale);
        const body = pickText(section, "body", locale);
        const image = section.image ?? product.images[i];
        return (
          <section key={`${title}-${i}`} className="mx-auto max-w-3xl space-y-4">
            <h3 className="product-section-title text-ink-900">{title}</h3>
            <p className="product-body text-[var(--muted)]">{body}</p>
            {image ? (
              <div className="media-slot media-slot--story overflow-hidden rounded-[1.25rem] border border-sand-200 bg-sand-50 shadow-[0_12px_40px_rgba(14,34,29,0.06)]">
                <ProductImage
                  src={image}
                  alt={title}
                  width={1200}
                  height={1200}
                  className="media-full max-h-[min(70vh,42rem)] w-full"
                />
              </div>
            ) : null}
          </section>
        );
      })}

      {details.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <h3 className="product-section-title text-ink-900">
            {t.product.details}
          </h3>
          <ul className="mt-5 space-y-3">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-3 text-ink-800">
                <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                <span className="product-body">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <h3 className="product-section-title text-ink-900">
            {t.product.whyBuy}
          </h3>
          <ul className="mt-5 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-ink-800">
                <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                <span className="product-body">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-3xl rounded-[1.25rem] bg-sand-100/90 px-5 py-8 sm:px-7">
        <h3 className="product-section-title">{t.product.shipping}</h3>
        <div className="product-body mt-4 space-y-3 text-[var(--muted)]">
          <p>{t.product.freeDelivery}</p>
          <p>{t.product.codAvailable}</p>
          <p>{t.product.returnPolicy}</p>
        </div>
      </section>

      {landing.faq.length > 0 && (
        <section className="mx-auto max-w-3xl">
          <h3 className="product-section-title">{t.product.faq}</h3>
          <div className="mt-5 divide-y divide-sand-200 border-y border-sand-200">
            {landing.faq.map((item) => {
              const q = pickText(item, "question", locale);
              const a = pickText(item, "answer", locale);
              return (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[length:var(--text-base)] font-bold text-ink-900">
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
    </div>
  );
}
