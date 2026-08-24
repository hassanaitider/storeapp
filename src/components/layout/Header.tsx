"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { getCountry } from "@/lib/countries";
import { CURRENCIES, getCurrency } from "@/lib/currency";
import type { CurrencyCode, Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useT();
  const {
    locale,
    setLocale,
    currency,
    setCurrency,
    country,
    cartCount,
    geoReady,
  } = useStore();
  const [open, setOpen] = useState(false);
  const currencyInfo = getCurrency(currency);
  const market = getCountry(country);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/#categories", label: t.nav.categories },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/80 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo size="sm" />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-800/80 transition hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <select
            aria-label={t.common.language}
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-md border border-sand-300 bg-white/80 px-2 py-1.5 text-xs font-medium text-ink-800 sm:text-sm"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>

          <span
            className={cn(
              "max-w-[9.5rem] truncate rounded-md border border-sand-300 bg-sand-50 px-2 py-1.5 text-xs font-medium text-ink-800 sm:max-w-[12rem] sm:text-sm",
              !geoReady && "opacity-60"
            )}
            title={
              locale === "ar"
                ? "سوقك الحالي"
                : "Current market"
            }
          >
            {market.flag} {locale === "ar" ? market.nameAr : market.nameEn}
          </span>

          <select
            aria-label={t.common.currency}
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value as CurrencyCode, true)
            }
            className={cn(
              "rounded-md border border-sand-300 bg-white/80 px-2 py-1.5 text-xs font-medium text-ink-800 sm:text-sm",
              !geoReady && "opacity-60"
            )}
            title={
              locale === "ar"
                ? "اختر العملة يدوياً"
                : "Choose currency manually"
            }
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} · {locale === "ar" ? c.symbol : c.code}
              </option>
            ))}
          </select>

          <Link
            href="/cart"
            className="relative inline-flex rounded-full bg-brand-700 p-2.5 text-white shadow-sm transition hover:bg-brand-600"
            aria-label={t.nav.cart}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sand-400 px-1 text-[10px] font-bold text-ink-900">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex rounded-md p-2 text-ink-800 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-sand-200 bg-white/95 md:hidden",
          open ? "block animate-fade-in" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-brand-50"
            >
              {l.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-xs text-[var(--muted)]">
            {locale === "ar" ? "سوقك" : "Market"}: {market.flag}{" "}
            {locale === "ar" ? market.nameAr : market.nameEn} · {currency} (
            {currencyInfo.symbol})
          </p>
        </nav>
      </div>
    </header>
  );
}
