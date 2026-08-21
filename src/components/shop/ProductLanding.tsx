"use client";

import { Check, ChevronDown } from "lucide-react";
import { useT } from "@/hooks/useT";
import type { Locale, Product } from "@/lib/types";
import { isGifUrl } from "@/components/shop/ProductMediaGallery";
import { ProductHtmlBody } from "@/components/shop/ProductHtmlBody";
import { htmlToPlain } from "@/lib/rich-html";
import { ProductImage, productCoverSrc } from "@/components/shop/ProductImage";

/** Detailed story: image → text → image → text … */
export function ProductDetailSections({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  const landing = product.landing;
  const details = locale === "ar" ? product.detailsAr : product.detailsEn;
  const benefits = locale === "ar"
    ? landing?.benefitsAr ?? []
    : landing?.benefitsEn ?? [];
  const cover = productCoverSrc(product.images);

  if (!landing?.sections?.length) {
    if (!details.length) return null;
    return (
      <section className="mt-12 space-y-6">
        <h2 className="product-section-title text-ink-900">
          {t.product.details}
        </h2>
        <ul className="space-y-3">
          {details.map((d) => (
            <li key={d} className="flex items-start gap-3 text-ink-800">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
              <span className="product-body">{d}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className="mt-14 space-y-16 sm:space-y-20">
      <h2 className="product-section-title text-center text-ink-900 sm:text-start">
        {t.product.description}
      </h2>

      {landing.sections.map((section, i) => {
        const title = locale === "ar" ? section.titleAr : section.titleEn;
        const body = locale === "ar" ? section.bodyAr : section.bodyEn;
        const image = section.image ?? cover;
        const gif = image ? isGifUrl(image) : false;

        return (
          <section
            key={`${title}-${i}`}
            className="mx-auto max-w-3xl space-y-5 animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 4) * 60}ms` }}
          >
            {image ? (
              <div className="relative overflow-hidden rounded-[1.25rem] border border-sand-200 bg-sand-50">
                <ProductImage
                  src={image}
                  alt={title}
                  className="media-full max-h-[min(70vh,42rem)] w-full"
                />
                {gif ? (
                  <span className="absolute start-3 top-3 rounded bg-ink-900/80 px-2 py-0.5 text-[10px] font-bold text-white">
                    GIF
                  </span>
                ) : null}
              </div>
            ) : null}
            <div className="px-1">
              <h3 className="product-section-title text-ink-900">{title}</h3>
              <p className="product-body mt-3 text-[var(--muted)]">{body}</p>
            </div>
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
              const q = locale === "ar" ? item.questionAr : item.questionEn;
              const a = locale === "ar" ? item.answerAr : item.answerEn;
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

/** Short intro under the main image */
export function ProductBriefDescription({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const landing = product.landing;
  if (landing) {
    const headline =
      locale === "ar" ? landing.headlineAr : landing.headlineEn;
    const intro = locale === "ar" ? landing.introAr : landing.introEn;
    return (
      <section className="mx-auto max-w-3xl space-y-3">
        <h2 className="product-section-title text-ink-900">{headline}</h2>
        <p className="product-lead text-[var(--muted)]">{intro}</p>
      </section>
    );
  }

  const desc =
    locale === "ar" ? product.descriptionAr : product.descriptionEn;
  return (
    <section className="mx-auto max-w-3xl">
      <ProductHtmlBody html={desc} fallback={htmlToPlain(desc)} />
    </section>
  );
}

/** @deprecated Prefer ProductBriefDescription + ProductDetailSections */
export function ProductLanding({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <>
      <ProductBriefDescription product={product} locale={locale} />
      <ProductDetailSections product={product} locale={locale} />
    </>
  );
}
