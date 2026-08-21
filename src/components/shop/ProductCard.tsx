"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import {
  formatProductComparePrice,
  formatProductPrice,
  productDiscountPercent,
} from "@/lib/pricing";
import type { CountryCode, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductImage, productCoverSrc } from "@/components/shop/ProductImage";

export function ProductCard({
  product,
  className,
  marketCountry,
}: {
  product: Product;
  className?: string;
  marketCountry?: CountryCode;
}) {
  const t = useT();
  const { locale, country, addToCart } = useStore();
  const priceCountry = marketCountry ?? country;
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const discount = productDiscountPercent(product, priceCountry);
  const compareLabel = formatProductComparePrice(product, priceCountry, locale);
  const cover = productCoverSrc(product.images);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-[0_8px_30px_rgba(14,34,29,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(14,34,29,0.1)]",
        className
      )}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-sand-100"
      >
        <ProductImage
          src={cover}
          alt={name}
          fill
          className="object-contain p-2 transition duration-500 group-hover:scale-[1.02]"
        />
        {discount > 0 && (
          <span className="absolute start-3 top-3 z-10 rounded-md bg-brand-700 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute end-3 top-3 z-10 rounded-md bg-sand-100/95 px-2 py-1 text-xs font-medium text-brand-800">
            {t.shop.featured}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-xl font-semibold text-ink-900 transition group-hover:text-brand-700 sm:text-2xl">
            {name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-semibold text-brand-700">
            {formatProductPrice(product, priceCountry, locale)}
          </span>
          {compareLabel && (
            <span className="text-sm text-[var(--muted)] line-through opacity-60">
              {compareLabel}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-brand-600">
          ★ {product.rating.toFixed(1)} · {product.reviewCount}{" "}
          {t.product.reviews}
        </p>
        <div className="mt-auto flex gap-2 pt-4">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product.id)}
            className="flex-1 rounded-xl bg-brand-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.inStock ? t.shop.addToCart : t.shop.outOfStock}
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="rounded-xl border border-sand-300 px-3 py-2.5 text-sm font-medium text-ink-800 transition hover:border-brand-400 hover:text-brand-700"
          >
            {t.shop.viewProduct}
          </Link>
        </div>
      </div>
    </article>
  );
}
