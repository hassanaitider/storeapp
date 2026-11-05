"use client";

import {
  BadgeCheck,
  Check,
  ChevronDown,
  HandCoins,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { pickList, pickText } from "@/lib/localized";
import { PRODUCT_PROBLEMS } from "@/lib/product-problems";
import type { Locale, Product, ProductBuyerReview } from "@/lib/types";
import { cn } from "@/lib/utils";
import { isGifUrl } from "@/components/shop/ProductMediaGallery";
import { ProductImage } from "@/components/shop/ProductImage";
import { AutoplayVideo } from "@/components/shop/MiniCameraStory";

const MAX_DETAIL_BENEFITS = 6;
const FALLBACK_REVIEWS: ProductBuyerReview[] = [
  {
    name: "S***a",
    countryAr: "المغرب",
    countryEn: "Morocco",
    stars: 5,
    textAr: "المنتج وصل مزيان وبنفس الصور، والجودة كانت أحسن من المتوقع.",
    textEn: "The product arrived as shown, and quality was better than expected.",
    textEs: "El producto llegó tal como en las fotos y la calidad fue mejor de lo esperado.",
  },
  {
    name: "M***d",
    countryAr: "المغرب",
    countryEn: "Morocco",
    stars: 5,
    textAr: "خدمة التوصيل مزيانة والدفع عند الاستلام سهلني الطلب.",
    textEn: "Delivery service was good, and cash on delivery made ordering easy.",
    textEs: "El envío fue bueno y el pago contra entrega facilitó la compra.",
  },
  {
    name: "N***a",
    countryAr: "المغرب",
    countryEn: "Morocco",
    stars: 4,
    textAr: "المنتج عملي فالاستخدام اليومي وننصح به.",
    textEn: "Practical for daily use and I recommend it.",
    textEs: "Es práctico para uso diario y lo recomiendo.",
  },
];

export function scrollToOrder() {
  document
    .getElementById("order")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** High-contrast, pulsing call-to-action shared by every order button on the landing page. */
export const CTA_BUTTON_CLASS =
  "bg-gradient-to-b from-[#ff9a3d] to-[#ff6a00] text-white shadow-lg hover:brightness-105 motion-safe:animate-cta-pulse disabled:animate-none disabled:opacity-50";

/** Thin strip above the page: the three promises a COD buyer looks for first. */
export function AnnouncementBar() {
  const t = useT();
  return (
    <div className="-mx-4 -mt-8 mb-6 bg-brand-900 px-4 py-2 text-white sm:-mx-6 lg:-mx-8">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs font-bold sm:text-sm">
        <li className="inline-flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-[#ff9a3d]" />
          {t.trust.freeShipping}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <HandCoins className="h-4 w-4 text-[#ff9a3d]" />
          {t.trust.cod}
        </li>
      </ul>
    </div>
  );
}

/** Three-step "how to order" strip — removes the fear of paying before receiving. */
export function HowToOrder() {
  const t = useT();
  const steps = [
    { title: t.product.step1Title, desc: t.product.step1Desc },
    { title: t.product.step2Title, desc: t.product.step2Desc },
    { title: t.product.step3Title, desc: t.product.step3Desc },
  ];
  return (
    <section className="mx-auto mt-12 max-w-3xl sm:mt-14">
      <h2 className="product-section-title text-center text-ink-900">
        {t.product.howTitle}
      </h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 shadow-[0_6px_20px_rgba(14,34,29,0.05)] sm:flex-col sm:items-center sm:text-center"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#ff9a3d] to-[#ff6a00] text-base font-extrabold text-white">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{step.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-[var(--muted)]">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

type Benefit = { title: string; body: string; image?: string };

/** Stills for benefit blocks — skips GIF demos and the lead photo already shown in the hero gallery. */
function benefitImagePool(images: string[] | undefined) {
  const stills = (images ?? []).filter((u) => u && !isGifUrl(u));
  return stills.length > 1 ? stills.slice(1) : stills;
}

function collectBenefits(product: Product, locale: Locale): Benefit[] {
  const pool = benefitImagePool(product.images);
  const pickImage = (i: number) => (pool.length ? pool[i % pool.length] : undefined);
  const sections = product.landing?.sections ?? [];

  if (sections.length) {
    return sections.map((section, i) => ({
      title: pickText(section, "title", locale),
      body: pickText(section, "body", locale),
      image: section.image ?? pickImage(i),
    }));
  }

  return pickList(product, "details", locale)
    .slice(0, MAX_DETAIL_BENEFITS)
    .map((body, i) => ({ title: "", body, image: pickImage(i) }));
}

/** Benefits & features — each one paired with its own image, alternating sides from `md` up. */
export function BenefitsGrid({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  const landing = product.landing;
  const benefits = collectBenefits(product, locale);
  const checklist = pickList(landing, "benefits", locale);
  const specs = landing?.sections?.length ? pickList(product, "details", locale) : [];

  if (!benefits.length) return null;

  return (
    <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
      {benefits.length > 0 ? (
        <section aria-labelledby="benefits-title" className="space-y-5 sm:space-y-6">
          <h2
            id="benefits-title"
            className="product-section-title text-center text-ink-900"
          >
            {t.product.whyBuy}
          </h2>
          <div className="space-y-5 sm:space-y-6">
            {benefits.map((benefit, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={`${benefit.title}-${i}`}
                  className={cn(
                    "overflow-hidden rounded-[1.5rem] border border-sand-200 shadow-[0_10px_34px_rgba(14,34,29,0.06)] md:grid md:items-center",
                    benefit.image ? "md:grid-cols-2" : "md:grid-cols-1",
                    flip ? "bg-brand-50/60" : "bg-white"
                  )}
                >
                  {benefit.image ? (
                    <div className={cn("aspect-square bg-white", flip && "md:order-2")}>
                      <ProductImage
                        src={benefit.image}
                        alt={benefit.title || pickText(product, "name", locale)}
                        width={1000}
                        height={1000}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="px-5 py-6 sm:px-8 sm:py-8">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {benefit.title ? (
                      <h3 className="mt-3 text-xl font-bold leading-snug text-ink-900 sm:text-2xl">
                        {benefit.title}
                      </h3>
                    ) : null}
                    <p
                      className={cn(
                        "product-body text-[var(--muted)]",
                        benefit.title ? "mt-3" : "mt-4 text-ink-800"
                      )}
                    >
                      {benefit.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {checklist.length > 0 ? (
        <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-ink-900 px-5 py-7 text-white shadow-[0_18px_50px_rgba(14,34,29,0.2)] sm:px-8 sm:py-9">
          <ul className="mx-auto grid max-w-xl gap-3">
            {checklist.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                <BadgeCheck className="h-5 w-5 shrink-0 text-brand-300" />
                <span className="text-[15px] font-semibold">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {specs.length > 0 ? (
        <section className="mx-auto max-w-3xl rounded-[1.5rem] border border-sand-200 bg-white p-5 shadow-[0_10px_34px_rgba(14,34,29,0.05)] sm:p-8">
          <h3 className="text-xl font-bold text-ink-900">{t.product.details}</h3>
          <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
            {specs.map((d) => (
              <li key={d} className="flex items-start gap-3 border-b border-sand-100 py-3 text-ink-800">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100">
                  <Check className="h-3.5 w-3.5 text-brand-700" />
                </span>
                <span className="text-[15px] leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

/** Problem → solution block; renders only when the product defines a problem. */
export function ProblemSolution({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  // Product-level fields win; the slug table fills the gaps for every other product
  const copy = { ...PRODUCT_PROBLEMS[product.slug], ...product.landing };
  const problem = pickText(copy, "problem", locale);
  const solution = pickText(copy, "solution", locale);
  if (!problem) return null;

  return (
    <section className="mx-auto mt-12 grid max-w-3xl gap-3 sm:mt-14 sm:grid-cols-2">
      <div className="rounded-[1.5rem] border border-red-100 bg-red-50/70 p-5 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-red-700">
          {t.product.problemTitle}
        </p>
        <p className="product-body mt-2 text-ink-800">{problem}</p>
      </div>
      {solution ? (
        <div className="rounded-[1.5rem] border border-brand-200 bg-brand-50 p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
            {t.product.solutionTitle}
          </p>
          <p className="product-body mt-2 text-ink-800">{solution}</p>
        </div>
      ) : null}
    </section>
  );
}

/** Video, before/after photos and animated GIFs — whatever the product has. */
export function ProductShowcase({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  const landing = product.landing;
  const name = pickText(product, "name", locale);
  const images = (product.images ?? []).filter(Boolean);
  const gifs = images.filter((u) => isGifUrl(u));
  // The lead GIF already opens the gallery — only repeat it when it is the sole one
  const actionGifs = gifs.length > 1 ? gifs.filter((u) => u !== images[0]) : gifs;
  const hasBeforeAfter = Boolean(landing?.beforeImage && landing?.afterImage);

  if (!landing?.video && !hasBeforeAfter && !actionGifs.length) return null;

  return (
    <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
      {landing?.video ? (
        <section className="mx-auto max-w-3xl">
          <div className="aspect-video w-full overflow-hidden rounded-[1.25rem] border border-sand-200 bg-ink-900 shadow-[0_12px_40px_rgba(14,34,29,0.08)]">
            <AutoplayVideo src={landing.video.src} poster={landing.video.poster} />
          </div>
        </section>
      ) : null}

      {hasBeforeAfter && landing ? (
        <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
          {[
            { src: landing.beforeImage!, label: t.product.beforeLabel },
            { src: landing.afterImage!, label: t.product.afterLabel },
          ].map(({ src, label }) => (
            <figure
              key={label}
              className="relative overflow-hidden rounded-[1.25rem] border border-sand-200 bg-white"
            >
              <ProductImage
                src={src}
                alt={`${name} — ${label}`}
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
              />
              <figcaption className="absolute start-3 top-3 rounded-full bg-ink-900/80 px-3 py-1 text-xs font-bold text-white">
                {label}
              </figcaption>
            </figure>
          ))}
        </section>
      ) : null}

      {actionGifs.length > 0 ? (
        <section className="mx-auto max-w-3xl">
          <h2 className="product-section-title text-center text-ink-900">
            {t.product.inAction}
          </h2>
          <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
            {actionGifs.slice(0, 4).map((src) => (
              <div
                key={src}
                className="w-[78%] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-sand-200 bg-white sm:w-auto"
              >
                <ProductImage
                  src={src}
                  alt={name}
                  width={800}
                  height={800}
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function StarRow({ value, className }: { value: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value}/5`}>
      {Array.from({ length: 5 }, (_, s) => (
        <Star
          key={s}
          className={cn(
            className ?? "h-4 w-4",
            s < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-sand-300"
          )}
        />
      ))}
    </div>
  );
}

/** Customer ratings + reviews, the guarantee strip (fast delivery / COD / quality), FAQ and a closing CTA. */
export function SocialProof({
  product,
  locale,
  showReviewList = true,
  showFaq = true,
}: {
  product: Product;
  locale: Locale;
  showReviewList?: boolean;
  showFaq?: boolean;
}) {
  const t = useT();
  const landing = product.landing;
  const reviews = showReviewList
    ? landing?.reviews?.length
      ? landing.reviews
      : FALLBACK_REVIEWS
    : [];
  const faq = showFaq ? landing?.faq ?? [] : [];
  const ratingValue = product.rating > 0 ? product.rating : 4.8;
  const ratingCount = product.reviewCount > 0 ? product.reviewCount : 128;
  const hasRating = ratingCount > 0 && ratingValue > 0;
  const orderLabel = `${t.product.orderNow} — ${t.trust.cod}`;

  const guarantees = [
    { icon: Truck, title: t.trust.fastDelivery, desc: t.trust.fastDeliveryDesc },
    { icon: HandCoins, title: t.trust.cod, desc: t.trust.codDesc },
    { icon: ShieldCheck, title: t.trust.qualityGuarantee, desc: t.trust.qualityGuaranteeDesc },
    { icon: RotateCcw, title: t.trust.returns, desc: t.trust.returnsDesc },
  ];

  return (
    <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
      {hasRating || reviews.length > 0 ? (
        <section id={showReviewList ? "opiniones" : undefined} className="mx-auto max-w-3xl scroll-mt-24">
          <h2 className="product-section-title text-center text-ink-900">
            {t.product.customerReviews}
          </h2>
          {hasRating ? (
            <div className="mt-4 flex flex-col items-center gap-1">
              <span className="text-4xl font-extrabold text-ink-900">
                {ratingValue.toFixed(1)}
              </span>
              <StarRow value={ratingValue} className="h-5 w-5" />
              <span className="text-sm text-[var(--muted)]">
                {ratingCount} {t.product.reviews}
              </span>
            </div>
          ) : null}
          {reviews.length > 0 ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {reviews.map((review, i) => {
                const text =
                  locale === "ar"
                    ? review.textAr
                    : locale === "es"
                      ? review.textEs ?? review.textEn
                      : review.textEn;
                return (
                  <li
                    key={`${review.name}-${i}`}
                    className="rounded-2xl border border-sand-200 bg-white p-4 shadow-[0_6px_20px_rgba(14,34,29,0.05)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-ink-900" dir="ltr">
                        {review.name}
                      </span>
                      {review.countryAr || review.countryEn ? (
                        <span className="text-xs text-[var(--muted)]">
                          {locale === "ar" ? review.countryAr : review.countryEn}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1">
                      <StarRow value={review.stars} />
                    </div>
                    {text ? (
                      <p className="product-body mt-2 text-sm text-ink-800">{text}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {guarantees.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-2 rounded-2xl border border-sand-200 bg-white p-4 text-center shadow-[0_6px_20px_rgba(14,34,29,0.05)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-700">
              <Icon className="h-6 w-6 text-white" />
            </span>
            <div>
              <p className="text-sm font-bold leading-snug text-ink-900">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-[var(--muted)]">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {faq.length > 0 ? (
        <section className="mx-auto max-w-3xl">
          <h3 className="text-center text-2xl font-bold text-ink-900">{t.product.faq}</h3>
          <div className="mt-6 space-y-3">
            {faq.map((item) => {
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
      ) : null}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={scrollToOrder}
          className={cn(
            "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-bold transition sm:w-auto sm:min-w-[16rem]",
            CTA_BUTTON_CLASS
          )}
        >
          {orderLabel}
        </button>
      </div>
    </div>
  );
}
