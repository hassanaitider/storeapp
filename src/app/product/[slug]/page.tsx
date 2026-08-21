"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  Truck,
  HandCoins,
  Minus,
  Plus,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { formatLocalAmount, formatPrice } from "@/lib/currency";
import {
  formatProductComparePrice,
  formatProductPrice,
  getProductLocalPrice,
  productDiscountPercent,
} from "@/lib/pricing";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  ProductBriefDescription,
  ProductDetailSections,
} from "@/components/shop/ProductLanding";
import { ProductMediaGallery } from "@/components/shop/ProductMediaGallery";
import { cn } from "@/lib/utils";
import type { Order } from "@/lib/types";

export default function ProductPage() {
  const params = useParams();
  const slug = String(params.slug);
  const t = useT();
  const {
    locale,
    currency,
    country,
    getProduct,
    marketProducts,
    placeOrder,
    categories,
  } = useStore();
  const product = getProduct(slug);
  const formRef = useRef<HTMLFormElement>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [customColor, setCustomColor] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const related = useMemo(() => {
    if (!product) return [];
    return marketProducts
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);
  }, [product, marketProducts]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-[var(--muted)]">
          {locale === "ar" ? "المنتج غير موجود" : "Product not found"}
        </p>
        <Link href="/shop" className="mt-4 inline-block text-brand-700 underline">
          {t.nav.shop}
        </Link>
      </div>
    );
  }

  if (order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-600" />
        <h1 className="product-hero-title mt-6 text-ink-900">
          {t.checkout.success}
        </h1>
        <p className="product-lead mt-3">{t.checkout.successDesc}</p>
        <p className="mt-6 rounded-xl bg-sand-100 px-4 py-3 text-sm font-medium text-ink-800">
          {t.checkout.orderId}: <span className="font-mono">{order.id}</span>
        </p>
        <p className="mt-2 text-sm text-brand-700">
          {formatPrice(order.totalUSD, order.currency, locale)} · COD
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {t.checkout.backHome}
        </Link>
      </div>
    );
  }

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const category = categories.find((c) => c.id === product.categoryId);
  const unitLocal = getProductLocalPrice(product, country);
  const lineLocal = unitLocal * qty;
  const discount = productDiscountPercent(product, country);
  const compareLabel = formatProductComparePrice(product, country, locale);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    if (product.customColorEnabled && !customColor.trim()) {
      window.alert(t.product.writeYourColorRequired);
      return;
    }
    const colorLabel = customColor.trim();
    const created = placeOrder(
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        notes: colorLabel
          ? locale === "ar"
            ? `اللون: ${colorLabel}`
            : `Color: ${colorLabel}`
          : undefined,
      },
      [{ productId: product.id, quantity: qty }]
    );
    setOrder(created);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-brand-700">
          {t.nav.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-brand-700">
          {t.nav.shop}
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${category.slug}`}
              className="hover:text-brand-700"
            >
              {locale === "ar" ? category.nameAr : category.nameEn}
            </Link>
          </>
        )}
      </nav>

      {/* 1) Product title */}
      <header className="animate-fade-up text-center sm:text-start">
        {category ? (
          <p className="product-label">
            {locale === "ar" ? category.nameAr : category.nameEn}
          </p>
        ) : null}
        <h1 className="product-hero-title mt-2 text-balance text-ink-900">
          {name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <div className="flex items-center gap-2 text-sm text-brand-700">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating)
                      ? "fill-sand-400 text-sand-400"
                      : "text-sand-300"
                  )}
                />
              ))}
            </div>
            <span>
              {product.rating.toFixed(1)} · {product.reviewCount}{" "}
              {t.product.reviews}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="product-price">
              {formatProductPrice(product, country, locale)}
            </span>
            {compareLabel ? (
              <span className="text-base text-[var(--muted)] line-through">
                {compareLabel}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      {/* 2) Main product image (+ gallery thumbs) */}
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <ProductMediaGallery
          product={product}
          locale={locale}
          activeImg={activeImg}
          onSelect={setActiveImg}
          discount={discount}
        />
      </div>

      {/* 3) Brief description */}
      <div className="mt-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <ProductBriefDescription product={product} locale={locale} />
      </div>

      {/* Buy / COD block */}
      <div
        id="order"
        className="mt-10 scroll-mt-28 animate-fade-up rounded-[1.35rem] border border-sand-200 bg-white p-5 shadow-sm sm:p-7"
        style={{ animationDelay: "160ms" }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-800">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-brand-600" />
            {t.trust.freeShipping}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HandCoins className="h-4 w-4 text-brand-600" />
            {t.trust.cod}
          </span>
        </div>

        {product.customColorEnabled ? (
          <label className="mt-5 block">
            <span className="product-section-title text-lg sm:text-xl">
              {t.product.writeYourColor}
            </span>
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder={t.product.writeYourColorHint}
              required
              className="mt-3 w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm font-medium text-ink-900 outline-none ring-brand-600/30 placeholder:text-[var(--muted)] focus:border-brand-500 focus:ring-2"
            />
          </label>
        ) : null}

        <form ref={formRef} onSubmit={onSubmit} className="mt-5 space-y-4">
          <h2 className="product-section-title text-lg">{t.checkout.title}</h2>

          <div>
            <p className="product-label mb-2 text-ink-800">{t.product.quantity}</p>
            <div className="inline-flex items-center rounded-xl border border-sand-300 bg-white">
              <button
                type="button"
                className="p-3 text-ink-800 hover:bg-sand-50"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-12 text-center font-semibold">{qty}</span>
              <button
                type="button"
                className="p-3 text-ink-800 hover:bg-sand-50"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Field
            label={t.checkout.name}
            required
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          />
          <Field
            label={t.checkout.phone}
            required
            type="tel"
            value={form.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          />
          <Field
            label={t.checkout.city}
            required
            value={form.city}
            onChange={(v) => setForm((f) => ({ ...f, city: v }))}
          />
          <Field
            label={t.checkout.address}
            required
            value={form.address}
            onChange={(v) => setForm((f) => ({ ...f, address: v }))}
          />

          <div className="flex items-center justify-between border-t border-sand-200 pt-3 text-sm">
            <span className="font-semibold text-ink-800">{t.cart.total}</span>
            <span className="product-price text-base">
              {formatLocalAmount(lineLocal, currency, locale)}
            </span>
          </div>

          <button
            type="submit"
            disabled={!product.inStock}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-700 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-50"
          >
            {product.inStock ? t.checkout.placeOrder : t.shop.outOfStock}
          </button>
        </form>
      </div>

      {/* 4) Detailed description: image → text → image → text */}
      <ProductDetailSections product={product} locale={locale} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="product-hero-title text-ink-900">{t.product.related}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-200/80 bg-white/95 shadow-[0_-8px_30px_rgba(14,34,29,0.08)] backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-800">{name}</p>
            <p className="product-price text-lg">
              {formatLocalAmount(lineLocal, currency, locale)}
            </p>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => formRef.current?.requestSubmit()}
            className="shrink-0 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-brand-600 disabled:opacity-50 sm:px-8"
          >
            {product.inStock ? t.checkout.placeOrder : t.shop.outOfStock}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="product-label text-ink-800">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-3 py-2.5 text-[length:var(--text-base)] outline-none ring-brand-500/30 focus:ring-2"
      />
    </label>
  );
}
