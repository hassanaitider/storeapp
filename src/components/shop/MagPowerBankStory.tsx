"use client";

import { Check, ChevronDown } from "lucide-react";
import { useT } from "@/hooks/useT";
import { pickList, pickText } from "@/lib/localized";
import type { Locale, Product } from "@/lib/types";
import { ProductImage } from "@/components/shop/ProductImage";

const STATS = [
  { value: "LED", labelAr: "شاشة رقمية", labelEn: "digital screen", labelEs: "pantalla digital" },
  { value: "4", labelAr: "كابلات مدمجة", labelEn: "built-in cables", labelEs: "cables integrados" },
  { value: "22.5W", labelAr: "شحن سلكي", labelEn: "wired charge", labelEs: "carga por cable" },
  { value: "15W", labelAr: "شحن مغناطيسي", labelEn: "magnetic charge", labelEs: "carga magnética" },
];

function loc(
  locale: Locale,
  ar: string,
  en: string,
  es: string
) {
  if (locale === "ar") return ar;
  if (locale === "es") return es;
  return en;
}

export function MagPowerBankStory({
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
              {loc(locale, "باور بانك عادي", "Typical power bank", "Power bank clásica")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-800">
              <li>
                {loc(
                  locale,
                  "تحتاج الكابل الصحيح في الحقيبة",
                  "You still carry the right cable",
                  "Todavía tienes que llevar el cable correcto"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "ما كاينش شاشة تبين النسبة",
                  "No screen to show remaining charge",
                  "Sin pantalla que muestre el porcentaje"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "تشحن ولا تثبت الجوال",
                  "It charges, but does not hold the phone",
                  "Carga, pero no sujeta el móvil"
                )}
              </li>
            </ul>
          </div>
          <div className="bg-brand-700 px-5 py-6 text-white">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/80">
              {loc(locale, "هذا الجهاز", "This pack", "Esta batería")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                {loc(
                  locale,
                  "شاشة رقمية + USB-C وLightning وMicro وUSB-A",
                  "Digital screen plus USB-C, Lightning, Micro, and USB-A",
                  "Pantalla digital y USB-C, Lightning, Micro y USB-A"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "قاعدة مغناطيسية أثناء الشحن",
                  "Magnetic pad while it charges",
                  "Base magnética mientras carga"
                )}
              </li>
              <li>
                {loc(
                  locale,
                  "خفيف للاستخدام اليومي",
                  "Light enough for every day",
                  "Compacta para uso diario"
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
          <h3 className="product-section-title text-ink-900">{t.product.details}</h3>
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
          <h3 className="product-section-title text-ink-900">{t.product.whyBuy}</h3>
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
