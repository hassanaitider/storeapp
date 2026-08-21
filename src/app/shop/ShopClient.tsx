"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { ProductCard } from "@/components/shop/ProductCard";
import { currencyForCountry, getCountry } from "@/lib/countries";
import { cn } from "@/lib/utils";
import type { CountryCode } from "@/lib/types";

export default function ShopClient() {
  const t = useT();
  const {
    locale,
    country,
    setCountry,
    setCurrency,
    products,
    categories,
    marketProducts,
  } = useStore();
  const params = useSearchParams();
  const active = params.get("category") ?? "all";

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === active),
    [categories, active]
  );

  // Country category → switch market + that country's currency (not stuck on SAR)
  useEffect(() => {
    if (!activeCategory?.country) return;
    const code = activeCategory.country as CountryCode;
    const nextCurrency = currencyForCountry(code);
    if (code !== country) {
      setCountry(code, true);
    }
    setCurrency(nextCurrency, false);
  }, [activeCategory, country, setCountry, setCurrency]);

  const priceCountry: CountryCode =
    activeCategory?.country ?? country;

  const filtered = useMemo(() => {
    if (active === "all") return marketProducts;
    // Admin assigns products to country categories — respect that
    return products.filter((p) => p.categoryId === activeCategory?.id);
  }, [active, activeCategory, products, marketProducts]);

  const marketLabel = getCountry(priceCountry);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
        {t.shop.title}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        {locale === "ar"
          ? `كل تصنيف بعملة دولته · ${marketLabel.flag} ${marketLabel.nameAr} · ${marketLabel.currency}`
          : `Each category uses its currency · ${marketLabel.flag} ${marketLabel.nameEn} · ${marketLabel.currency}`}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip href="/shop" active={active === "all"} label={t.shop.all} />
        {categories.map((c) => {
          const cur = c.country ? currencyForCountry(c.country) : null;
          return (
            <FilterChip
              key={c.id}
              href={`/shop?category=${c.slug}`}
              active={active === c.slug}
              label={
                locale === "ar"
                  ? `${c.nameAr}${cur ? ` · ${cur}` : ""}`
                  : `${c.nameEn}${cur ? ` · ${cur}` : ""}`
              }
            />
          );
        })}
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
