"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { ProductCard } from "@/components/shop/ProductCard";
import { getCountry } from "@/lib/countries";
import { cn } from "@/lib/utils";
import type { CountryCode } from "@/lib/types";

export default function ShopClient() {
  const t = useT();
  const router = useRouter();
  const {
    locale,
    country,
    marketCategories,
    marketProducts,
  } = useStore();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const activeCategory = useMemo(
    () => marketCategories.find((c) => c.slug === active),
    [marketCategories, active]
  );

  // Hide other regional categories: if URL points to a foreign market, reset
  useEffect(() => {
    if (active === "all") return;
    const allowed = marketCategories.some((c) => c.slug === active);
    if (!allowed) {
      router.replace("/shop");
    }
  }, [active, marketCategories, router]);

  const priceCountry: CountryCode =
    activeCategory?.country ?? country;

  const filtered = useMemo(() => {
    if (active === "all" || !activeCategory) return marketProducts;
    return marketProducts.filter((p) => p.categoryId === activeCategory.id);
  }, [active, activeCategory, marketProducts]);

  const marketLabel = getCountry(priceCountry);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
        {t.shop.title}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        {locale === "ar"
          ? `تصنيف سوقك فقط · ${marketLabel.flag} ${marketLabel.nameAr} · ${marketLabel.currency}`
          : `Your market only · ${marketLabel.flag} ${marketLabel.nameEn} · ${marketLabel.currency}`}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip href="/shop" active={active === "all"} label={t.shop.all} />
        {marketCategories.map((c) => (
          <FilterChip
            key={c.id}
            href={`/shop?category=${c.slug}`}
            active={active === c.slug}
            label={locale === "ar" ? c.nameAr : c.nameEn}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-[var(--muted)]">
          {t.shop.noProducts}
        </p>
      ) : (
        <div
          key={`${priceCountry}-${active}`}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((p) => (
            <ProductCard
              key={`${priceCountry}-${p.id}`}
              product={p}
              marketCountry={priceCountry}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition",
        active
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-sand-300 bg-white text-ink-800 hover:border-brand-400"
      )}
    >
      {label}
    </a>
  );
}
