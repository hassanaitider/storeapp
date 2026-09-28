"use client";

import {
  Backpack,
  BellRing,
  Bike,
  Check,
  ChevronDown,
  KeyRound,
  Luggage,
  MapPin,
  Smartphone,
  Volume2,
  Wallet,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { pickList, pickText } from "@/lib/localized";
import type { Locale, Product } from "@/lib/types";
import { ProductImage } from "@/components/shop/ProductImage";

function loc(locale: Locale, ar: string, en: string, es: string) {
  if (locale === "ar") return ar;
  if (locale === "es") return es;
  return en;
}

const STATS = [
  { value: "2×", ar: "متتبع في العبوة", en: "trackers per pack", es: "rastreadores por pack" },
  { value: "iOS + Android", ar: "النظامين", en: "both systems", es: "ambos sistemas" },
  { value: "32 mm", ar: "صغير وخفيف", en: "tiny and light", es: "mini y ligero" },
  { value: "$0", ar: "بدون اشتراك", en: "no subscription", es: "sin suscripción" },
];

const STEPS = [
  {
    icon: Smartphone,
    ar: "فعّله وربطه بهاتفك: Find My على iPhone أو Find Hub على Android.",
    en: "Pair it with your phone: Find My on iPhone or Find Hub on Android.",
    es: "Vincúlalo a tu teléfono: Find My en iPhone o Find Hub en Android.",
  },
  {
    icon: KeyRound,
    ar: "علّقه على المفاتيح أو حطه في المحفظة أو الحقيبة.",
    en: "Attach it to your keys or drop it in a wallet or bag.",
    es: "Ponlo en tus llaves o guárdalo en la cartera o la mochila.",
  },
  {
    icon: MapPin,
    ar: "شوف مكانه على الخريطة، شغّل صوت، واستقبل تنبيه إذا نسيته.",
    en: "See it on the map, play a sound, and get an alert if you forget it.",
    es: "Míralo en el mapa, hazlo sonar y recibe una alerta si lo olvidas.",
  },
];

const USES = [
  { icon: KeyRound, ar: "المفاتيح", en: "Keys", es: "Llaves" },
  { icon: Wallet, ar: "المحفظة", en: "Wallet", es: "Cartera" },
  { icon: Backpack, ar: "الحقيبة", en: "Backpack", es: "Mochila" },
  { icon: Luggage, ar: "حقيبة السفر", en: "Suitcase", es: "Maleta" },
  { icon: Bike, ar: "الدراجة", en: "Bike", es: "Bicicleta" },
];

export function SmartTagStory({
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

  if (!landing) return null;

  return (
    <div className="mt-14 space-y-14 sm:space-y-16">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-ink-900 to-brand-800 px-5 py-7 text-center text-white sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
          {loc(locale, "عرض خاص", "Special offer", "Oferta especial")}
        </p>
        <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {loc(locale, "2 متتبع بـ 49$", "2 trackers for $49", "2 rastreadores por $49")}
        </p>
        <p className="mt-2 text-sm text-white/80">
          {loc(
            locale,
            "يعمل مع iPhone (iOS) و Android · توصيل مجاني · الدفع عند الاستلام",
            "Works with iPhone (iOS) and Android · free delivery · cash on delivery",
            "Funciona con iPhone (iOS) y Android · envío gratis · pago contra entrega"
          )}
        </p>
      </section>

      <section className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-sand-200 bg-white px-5 py-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white">
            <Smartphone className="h-6 w-6" />
          </span>
          <div>
            <p className="font-bold text-ink-900">iPhone · iOS</p>
            <p className="text-sm text-[var(--muted)]">
              {loc(locale, "تطبيق Apple Find My", "Apple Find My app", "App Apple Find My (Encontrar)")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-sand-200 bg-white px-5 py-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
            <Smartphone className="h-6 w-6" />
          </span>
          <div>
            <p className="font-bold text-ink-900">Android</p>
            <p className="text-sm text-[var(--muted)]">
              {loc(locale, "تطبيق Find Hub من Google", "Google Find Hub app", "App Find Hub de Google")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="rounded-2xl border border-sand-200 bg-sand-50 px-3 py-4 text-center"
          >
            <p className="text-xl font-extrabold text-ink-900">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-[var(--muted)]">
              {loc(locale, stat.ar, stat.en, stat.es)}
            </p>
          </div>
        ))}
      </section>

      {landing.sections.map((section, i) => {
        const title = pickText(section, "title", locale);
        const body = pickText(section, "body", locale);
        return (
          <section key={`${title}-${i}`} className="mx-auto max-w-3xl space-y-4">
            <h3 className="product-section-title text-ink-900">{title}</h3>
            <p className="product-body text-[var(--muted)]">{body}</p>
            {section.image ? (
              <div className="media-slot media-slot--story overflow-hidden rounded-[1.25rem] border border-sand-200 bg-sand-50 shadow-[0_12px_40px_rgba(14,34,29,0.06)]">
                <ProductImage
                  src={section.image}
                  alt={title}
                  width={1000}
                  height={1000}
                  className="media-full max-h-[min(70vh,42rem)] w-full"
                />
              </div>
            ) : null}
          </section>
        );
      })}

      <section className="mx-auto max-w-3xl">
        <h3 className="product-section-title text-ink-900">
          {loc(locale, "كيف يعمل؟", "How it works", "¿Cómo funciona?")}
        </h3>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.en}
              className="rounded-2xl border border-sand-200 bg-white px-4 py-5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-brand-700" />
              </div>
              <p className="product-body mt-3 text-ink-800">
                {loc(locale, step.ar, step.en, step.es)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl">
        <h3 className="product-section-title text-ink-900">
          {loc(locale, "استعمله مع", "Use it on", "Úsalo en")}
        </h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {USES.map((use) => (
            <span
              key={use.en}
              className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-sand-50 px-4 py-2 text-sm font-medium text-ink-800"
            >
              <use.icon className="h-4 w-4 text-brand-700" />
              {loc(locale, use.ar, use.en, use.es)}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-sand-100/90 px-4 py-4">
            <Volume2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <p className="product-body text-ink-800">
              {loc(
                locale,
                "شغّل صوت من الهاتف وتلقاه بسرعة وسط الدار.",
                "Play a sound from your phone and find it fast at home.",
                "Hazlo sonar desde el teléfono y encuéntralo rápido en casa."
              )}
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-sand-100/90 px-4 py-4">
            <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
            <p className="product-body text-ink-800">
              {loc(
                locale,
                "تنبيه فوري إذا تبعدتي ونسيتي الغرض ديالك.",
                "Instant alert if you walk away and leave it behind.",
                "Alerta al instante si te alejas y lo dejas olvidado."
              )}
            </p>
          </div>
        </div>
      </section>

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
