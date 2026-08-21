"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { formatLocalAmount, formatPrice } from "@/lib/currency";
import {
  formatProductPrice,
  getProductLocalPrice,
} from "@/lib/pricing";
import { ProductImage, productCoverSrc } from "@/components/shop/ProductImage";

export default function CartPage() {
  const t = useT();
  const {
    locale,
    currency,
    country,
    cart,
    products,
    updateCartQty,
    removeFromCart,
    cartTotalUSD,
  } = useStore();

  const lines = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter(Boolean) as {
    item: { productId: string; quantity: number };
    product: (typeof products)[0];
  }[];

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-4xl font-semibold text-ink-900">
          {t.cart.title}
        </h1>
        <p className="mt-4 text-[var(--muted)]">{t.cart.empty}</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {t.cart.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
        {t.cart.title}
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {lines.map(({ item, product }) => {
            const name = locale === "ar" ? product.nameAr : product.nameEn;
            return (
              <li
                key={product.id}
                className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-4 sm:gap-6 sm:p-5"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand-100 sm:h-28 sm:w-28"
                >
                  <ProductImage
                    src={productCoverSrc(product.images)}
                    alt={name}
                    fill
                    className="object-contain p-1"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-display text-xl font-semibold text-ink-900 hover:text-brand-700"
                    >
                      {name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="rounded-lg p-2 text-[var(--muted)] hover:bg-sand-100 hover:text-red-600"
                      aria-label={t.cart.remove}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 font-semibold text-brand-700">
                    {formatProductPrice(product, country, locale)}
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <div className="inline-flex items-center rounded-lg border border-sand-300">
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          updateCartQty(product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          updateCartQty(product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      ={" "}
                      {formatLocalAmount(
                        getProductLocalPrice(product, country) * item.quantity,
                        currency,
                        locale
                      )}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">{t.cart.subtotal}</span>
              <span className="font-semibold">
                {formatPrice(cartTotalUSD, currency, locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">{t.cart.shipping}</span>
              <span className="font-semibold text-brand-700">{t.cart.free}</span>
            </div>
            <div className="border-t border-sand-200 pt-3">
              <div className="flex justify-between text-base">
                <span className="font-semibold">{t.cart.total}</span>
                <span className="text-lg font-bold text-brand-800">
                  {formatPrice(cartTotalUSD, currency, locale)}
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-700 py-3.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {t.cart.checkout}
          </Link>
          <Link
            href="/shop"
            className="mt-3 flex w-full items-center justify-center text-sm font-medium text-brand-700 hover:underline"
          >
            {t.cart.continue}
          </Link>
        </aside>
      </div>
    </div>
  );
}
