"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { HandCoins, CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { convertFromUSD, formatPrice } from "@/lib/currency";
import { getProductPriceUSD } from "@/lib/pricing";
import { trackInitiateCheckout } from "@/lib/meta-pixel";
import type { Order } from "@/lib/types";

export default function CheckoutPage() {
  const t = useT();
  const {
    locale,
    currency,
    country,
    cart,
    cartTotalUSD,
    products,
    placeOrder,
  } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (order || cart.length === 0) return;
    const contents = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const unitUSD = product ? getProductPriceUSD(product, country) : 0;
      return {
        id: item.productId,
        quantity: item.quantity,
        item_price:
          Math.round(convertFromUSD(unitUSD, currency) * 100) / 100,
      };
    });
    trackInitiateCheckout({
      value: Math.round(convertFromUSD(cartTotalUSD, currency) * 100) / 100,
      currency,
      numItems: cart.reduce((n, i) => n + i.quantity, 0),
      contents,
    });
  }, [cart.length]);

  if (order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-600" />
        <h1 className="mt-6 font-display text-4xl font-semibold text-ink-900">
          {t.checkout.success}
        </h1>
        <p className="mt-3 text-[var(--muted)]">{t.checkout.successDesc}</p>
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

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-[var(--muted)]">{t.cart.empty}</p>
        <Link href="/shop" className="mt-4 inline-block text-brand-700 underline">
          {t.cart.emptyCta}
        </Link>
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const moroccoSimple = country === "MA";
    const created = placeOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: moroccoSimple ? form.city.trim() : form.address.trim(),
    });
    setOrder(created);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
        {t.checkout.title}
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]"
      >
        <div className="space-y-8">
          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-ink-900">
              {t.checkout.payment}
            </h2>
            <label className="mt-4 flex cursor-pointer items-start gap-4 rounded-xl border-2 border-brand-600 bg-brand-50/50 p-4">
              <input
                type="radio"
                name="payment"
                checked
                readOnly
                className="mt-1 accent-brand-700"
              />
              <div>
                <div className="flex items-center gap-2 font-semibold text-brand-900">
                  <HandCoins className="h-5 w-5" />
                  {t.checkout.cod}
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {t.checkout.codHint}
                </p>
              </div>
            </label>
          </section>

          <section className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-ink-900">
              {t.checkout.customer}
            </h2>
            <div className="mt-4 space-y-4">
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
              {country !== "MA" ? (
                <Field
                  label={t.checkout.address}
                  required
                  value={form.address}
                  onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                />
              ) : null}
            </div>
          </section>
        </div>

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
            <div className="flex justify-between border-t border-sand-200 pt-3 text-base">
              <span className="font-semibold">{t.cart.total}</span>
              <span className="text-lg font-bold text-brand-800">
                {formatPrice(cartTotalUSD, currency, locale)}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-brand-700 py-3.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {t.checkout.placeOrder}
          </button>
          <p className="mt-3 text-center text-xs text-[var(--muted)]">
            {t.trust.cod} · {t.trust.freeShipping} · {t.trust.returns}
          </p>
        </aside>
      </form>
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
    <label className="block text-sm font-medium text-ink-800">
      {label}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-sand-300 bg-sand-50/50 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-[var(--ring)]"
      />
    </label>
  );
}
