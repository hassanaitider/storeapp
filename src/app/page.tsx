"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductImage } from "@/components/shop/ProductImage";
import { TrustBar } from "@/components/shop/TrustBar";
import { pickText } from "@/lib/localized";

export default function HomePage() {
  const t = useT();
  const { locale, country, geoReady, marketProducts, marketCategories } =
    useStore();
  const featured = marketProducts.filter((p) => p.featured).slice(0, 4);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-hero-mesh text-white">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
        <div className="absolute inset-0">
          <ProductImage
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=80"
            alt=""
            fill
            priority
            className="object-cover opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <p className="animate-fade-up font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
            {t.brand}
          </p>
          <h1
            className="mt-5 max-w-2xl animate-fade-up text-balance text-xl font-medium text-sand-100 sm:text-2xl lg:text-3xl"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.title}
          </h1>
          <p
            className="mt-4 max-w-xl animate-fade-up text-base leading-relaxed text-brand-100/90 sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {t.hero.subtitle}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-900 shadow-lg transition hover:bg-sand-100"
            >
              {t.hero.cta}
              <Arrow className="h-4 w-4" />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
              {t.nav.categories}
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline"
          >
            {t.nav.shop}
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {marketCategories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductImage
                src={cat.image || "/categories/flag-ma.png"}
                alt={pickText(cat, "name", locale)}
                fill
                className="object-contain bg-sand-100 p-2 transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="font-display text-2xl font-semibold">
                  {pickText(cat, "name", locale)}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-brand-100/90">
                  {pickText(cat, "description", locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-sand-100/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
            {t.shop.featured}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" key={locale + country}>
            {!geoReady ? (
              <p className="col-span-full text-center text-[var(--muted)]">
                {t.common.loading}
              </p>
            ) : (
              featured.map((p) => (
                <ProductCard key={`${country}-${p.id}`} product={p} />
              ))
            )}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-brand-700 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              {t.hero.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
