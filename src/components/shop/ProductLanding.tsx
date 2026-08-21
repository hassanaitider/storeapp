"use client";

import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { useT } from "@/hooks/useT";
import type { Locale, Product } from "@/lib/types";
import { needsUnoptimizedImage } from "@/components/shop/ImageUploadButton";
import { isGifUrl } from "@/components/shop/ProductMediaGallery";
import { ProductHtmlBody } from "@/components/shop/ProductHtmlBody";
import { htmlToPlain } from "@/lib/rich-html";

export function ProductLanding({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useT();
  const landing = product.landing;
  const details = locale === "ar" ? product.detailsAr : product.detailsEn;
  const name = locale === "ar" ? product.nameAr : product.nameEn;

  if (!landing) {
    const desc =
      locale === "ar" ? product.descriptionAr : product.descriptionEn;
    return (
      <section className="border-t border-sand-200 pt-10">
        <h2 className="product-section-title">{t.product.description}</h2>
        <div className="mt-4">
          <ProductHtmlBody html={desc} fallback={htmlToPlain(desc)} />
        </div>
        {details.length > 0 && (
          <ul className="mt-6 grid gap-3">
            {details.map((d) => (
              <li
                key={d}
                className="product-body flex items-start gap-2 text-ink-800"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                {d}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  const headline = locale === "ar" ? landing.headlineAr : landing.headlineEn;
  const intro = locale === "ar" ? landing.introAr : landing.introEn;
  const benefits = locale === "ar" ? landing.benefitsAr : landing.benefitsEn;
  const heroImage =
    product.images.find((u) => !isGifUrl(u)) ?? product.images[0];

  return (
    <div className="space-y-12 border-t border-sand-200 pt-10">
      <section className="relative overflow-hidden rounded-[1.35rem] bg-brand-950 text-white">
        <div className="absolute inset-0">
          {heroImage ? (
            <Image
              src={heroImage}
              alt=""
              fill
              unoptimized={needsUnoptimizedImage(heroImage)}
              className="object-cover opacity-35"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/40" />
        </div>
        <div className="relative px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-bold tracking-[0.18em] text-brand-200">
            {name}
          </p>
          <h2 className="product-hero-title mt-3 text-white sm:text-[length:var(--text-hero)]">
            {headline}
          </h2>
          <p className="product-lead mt-4 text-brand-100/90">{intro}</p>
          <a
            href="#order"
            className="mt-7 inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-900 transition hover:bg-sand-100"
          >
            {t.product.orderNow}
          </a>
        </div>
      </section>

      {/* أقسام الشرح مع صور مخصصة */}
      <div className="space-y-14">
        {landing.sections.map((section, i) => {
          const title = locale === "ar" ? section.titleAr : section.titleEn;
          const body = locale === "ar" ? section.bodyAr : section.bodyEn;
          const image = section.image ?? heroImage;
          const gif = image ? isGifUrl(image) : false;

          return (
            <section key={`${title}-${i}`} className="space-y-4">
              <p className="product-label">
                {gif ? t.product.mediaGifs : t.product.mediaWide}
              </p>
              {image ? (
                <div className="relative overflow-hidden rounded-[1.25rem] border border-sand-200 bg-sand-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={title}
                    className="media-full max-h-[min(70vh,40rem)] w-full"
                  />
                  {gif && (
                    <span className="absolute start-3 top-3 rounded bg-ink-900/80 px-2 py-0.5 text-[10px] font-bold text-white">
                      GIF
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex min-h-[10rem] items-center justify-center rounded-[1.25rem] border border-dashed border-sand-300 bg-sand-50">
                  <p className="product-caption">{t.product.mediaWide}</p>
                </div>
              )}
              <div>
                <h3 className="product-section-title">{title}</h3>
                <p className="product-body mt-3 text-[var(--muted)]">{body}</p>
              </div>
            </section>
          );
        })}
      </div>

      <section>
        <h3 className="product-section-title">{t.product.details}</h3>
        <ul className="mt-5 space-y-3">
          {details.map((d) => (
            <li key={d} className="flex items-start gap-3 text-ink-800">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
              <span className="product-body">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="product-section-title">{t.product.whyBuy}</h3>
        <ul className="mt-5 space-y-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-ink-800">
              <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
              <span className="product-body">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[1.25rem] bg-sand-100/90 px-5 py-8 sm:px-7">
        <h3 className="product-section-title">{t.product.shipping}</h3>
        <div className="product-body mt-4 space-y-3 text-[var(--muted)]">
          <p>{t.product.freeDelivery}</p>
          <p>{t.product.codAvailable}</p>
          <p>{t.product.returnPolicy}</p>
        </div>
      </section>

      {landing.faq.length > 0 && (
        <section>
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

      <section className="rounded-[1.35rem] bg-brand-800 px-5 py-12 text-center text-white sm:px-8">
        <h3 className="product-hero-title text-white">{headline}</h3>
        <p className="product-caption mt-4 text-brand-100/90">
          {t.trust.cod} · {t.trust.freeShipping} · {t.trust.returns}
        </p>
        <a
          href="#order"
          className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-900 transition hover:bg-sand-100"
        >
          {t.product.orderNow}
        </a>
      </section>
    </div>
  );
}
