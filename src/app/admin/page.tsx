"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Package,
  ClipboardList,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Coins,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import {
  CURRENCIES,
  formatLocalAmount,
  formatPrice,
} from "@/lib/currency";
import { STORE_MARKETS, currencyForCountry } from "@/lib/countries";
import { getProductLocalPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { CountryCode } from "@/lib/types";

type Tab = "overview" | "categories" | "products" | "orders" | "currencies";

const TABS: Tab[] = [
  "overview",
  "categories",
  "products",
  "currencies",
  "orders",
];

function parseTab(raw: string | null): Tab {
  if (raw && (TABS as string[]).includes(raw)) return raw as Tab;
  return "categories";
}

/** Native <a> — works even if React click handlers are dead. */
function A({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

function AdminDashboard() {
  const t = useT();
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("tab"));

  const {
    locale,
    categories,
    products,
    orders,
    currencyRates,
    setCurrencyRates,
    resetCurrencyRates,
    deleteCategory,
    deleteProduct,
    resetStore,
  } = useStore();

  const [flash, setFlash] = useState("");
  const [rateDraft, setRateDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    // Kill any leftover full-screen blockers from older builds
    document.querySelectorAll("[data-admin-overlay]").forEach((n) => n.remove());
  }, []);

  useEffect(() => {
    if (searchParams.get("saved") === "1") {
      setFlash(locale === "ar" ? "تم الحفظ بنجاح ✓" : "Saved successfully ✓");
      const url = new URL(window.location.href);
      url.searchParams.delete("saved");
      window.history.replaceState({}, "", url.pathname + url.search);
      const id = window.setTimeout(() => setFlash(""), 3000);
      return () => window.clearTimeout(id);
    }
  }, [searchParams, locale]);

  useEffect(() => {
    const draft: Record<string, string> = {};
    for (const c of CURRENCIES) {
      draft[c.code] = String(currencyRates?.[c.code] ?? c.rate);
    }
    setRateDraft(draft);
  }, [currencyRates]);

  const pending = useMemo(
    () => orders.filter((o) => o.status === "pending").length,
    [orders]
  );

  const nav: { id: Tab; label: string; icon: typeof Tags }[] = [
    { id: "overview", label: t.admin.dashboard, icon: LayoutDashboard },
    { id: "categories", label: t.admin.categories, icon: Tags },
    { id: "products", label: t.admin.products, icon: Package },
    { id: "currencies", label: t.admin.currencies, icon: Coins },
    { id: "orders", label: t.admin.orders, icon: ClipboardList },
  ];

  function onDeleteCategory(id: string, name: string) {
    const ok = window.confirm(
      locale === "ar" ? `حذف التصنيف «${name}»؟` : `Delete category “${name}”?`
    );
    if (!ok) return;
    deleteCategory(id);
    setFlash(locale === "ar" ? "تم الحذف ✓" : "Deleted ✓");
    window.setTimeout(() => setFlash(""), 2500);
  }

  function onDeleteProduct(id: string, name: string) {
    const ok = window.confirm(
      locale === "ar" ? `حذف المنتج «${name}»؟` : `Delete product “${name}”?`
    );
    if (!ok) return;
    deleteProduct(id);
    setFlash(locale === "ar" ? "تم الحذف ✓" : "Deleted ✓");
    window.setTimeout(() => setFlash(""), 2500);
  }

  function onReset() {
    const ok = window.confirm(
      locale === "ar"
        ? "إعادة ضبط المتجر؟ ستُحذف تعديلاتك المحلية وتُعاد البيانات الأصلية."
        : "Reset store? Your local edits will be cleared."
    );
    if (!ok) return;
    resetStore();
    window.location.assign("/admin?tab=categories&saved=1");
  }

  return (
    <div
      className="relative z-0 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      style={{ pointerEvents: "auto" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink-900">
            {t.admin.title}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {locale === "ar"
              ? "التبويبات والتعديل روابط مباشرة — إن لم يعمل شيء، حدّث الصفحة بقوة (Ctrl+Shift+R)."
              : "Tabs and Edit are real links. If nothing works, hard-refresh (Ctrl+Shift+R)."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-sand-300 px-3 py-2 text-sm font-medium hover:bg-sand-50"
            style={{ pointerEvents: "auto" }}
          >
            <RotateCcw className="h-4 w-4" />
            {locale === "ar" ? "إعادة ضبط" : "Reset"}
          </button>
          <A
            href="/"
            className="self-center text-sm font-medium text-brand-700 hover:underline"
          >
            ← {t.nav.home}
          </A>
        </div>
      </div>

      {flash ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {flash}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <aside
          className="relative z-30 flex shrink-0 gap-2 overflow-x-auto lg:sticky lg:top-28 lg:w-56 lg:flex-col lg:self-start"
          style={{ pointerEvents: "auto" }}
        >
          {nav.map((item) => (
            <A
              key={item.id}
              href={`/admin?tab=${item.id}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition whitespace-nowrap",
                tab === item.id
                  ? "bg-brand-700 text-white"
                  : "border border-sand-200 bg-white text-ink-800 hover:border-brand-400"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </A>
          ))}
        </aside>

        <div
          className="relative z-20 min-w-0 flex-1"
          style={{ pointerEvents: "auto" }}
        >
          {tab === "overview" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: t.admin.stats.products, value: products.length },
                { label: t.admin.stats.categories, value: categories.length },
                { label: t.admin.stats.orders, value: orders.length },
                { label: t.admin.stats.pending, value: pending },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-sand-200 bg-white p-6"
                >
                  <p className="text-sm text-[var(--muted)]">{s.label}</p>
                  <p className="mt-2 font-display text-4xl font-semibold text-brand-800">
                    {s.value}
                  </p>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap gap-3">
                <A
                  href="/admin?tab=categories"
                  className="rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white"
                >
                  {t.admin.categories}
                </A>
                <A
                  href="/admin?tab=products"
                  className="rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white"
                >
                  {t.admin.products}
                </A>
                <A
                  href="/admin?tab=orders"
                  className="rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white"
                >
                  {t.admin.orders}
                </A>
              </div>
            </div>
          )}

          {tab === "categories" && (
            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{t.admin.categories}</h2>
                <A
                  href="/admin/category/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  <Plus className="h-4 w-4" />
                  {t.admin.addCategory}
                </A>
              </div>

              {categories.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-sand-300 bg-sand-50 p-10 text-center text-[var(--muted)]">
                  {t.admin.emptyCategories}
                </p>
              ) : (
                <div className="space-y-3">
                  {categories.map((c) => {
                    const info = STORE_MARKETS.find((x) => x.code === c.country);
                    return (
                      <div
                        key={c.id}
                        className="rounded-2xl border border-sand-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <p className="text-lg font-semibold text-ink-900">
                              {locale === "ar" ? c.nameAr : c.nameEn}
                            </p>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                              {info
                                ? `${info.flag} ${locale === "ar" ? info.nameAr : info.nameEn} · ${info.currency}`
                                : c.slug}
                            </p>
                          </div>
                          <div className="flex w-full gap-2 sm:w-auto">
                            <A
                              href={`/admin/category/${encodeURIComponent(c.id)}`}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-600 sm:flex-none"
                            >
                              <Pencil className="h-4 w-4" />
                              {t.admin.edit}
                            </A>
                            <button
                              type="button"
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-100 sm:flex-none"
                              style={{ pointerEvents: "auto" }}
                              onClick={() =>
                                onDeleteCategory(
                                  c.id,
                                  locale === "ar" ? c.nameAr : c.nameEn
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              {t.admin.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {tab === "products" && (
            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{t.admin.products}</h2>
                <A
                  href="/admin/product/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  <Plus className="h-4 w-4" />
                  {t.admin.addProduct}
                </A>
              </div>

              {products.length === 0 ? (
                <p className="text-center text-[var(--muted)]">
                  {t.admin.emptyProducts}
                </p>
              ) : (
                <div className="space-y-3">
                  {products.map((p) => {
                    const cat = categories.find((c) => c.id === p.categoryId);
                    const market = (cat?.country ?? "US") as CountryCode;
                    const cur = currencyForCountry(market);
                    const local = getProductLocalPrice(p, market);
                    return (
                      <div
                        key={p.id}
                        className="rounded-2xl border border-sand-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="min-w-0">
                            <p className="text-lg font-semibold text-ink-900">
                              {locale === "ar" ? p.nameAr : p.nameEn}
                            </p>
                            <p className="mt-1 text-sm text-[var(--muted)]">
                              {formatLocalAmount(local, cur, locale)} · {cur}
                              {cat
                                ? ` · ${locale === "ar" ? cat.nameAr : cat.nameEn}`
                                : ""}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <A
                              href={`/product/${encodeURIComponent(p.slug)}`}
                              className="inline-flex items-center justify-center gap-1 rounded-xl border border-sand-300 px-3 py-3 text-sm font-semibold hover:bg-sand-50"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {locale === "ar" ? "عرض" : "View"}
                            </A>
                            <A
                              href={`/admin/product/${encodeURIComponent(p.id)}`}
                              className="inline-flex items-center justify-center gap-1 rounded-xl bg-brand-700 px-3 py-3 text-sm font-bold text-white hover:bg-brand-600"
                            >
                              <Pencil className="h-4 w-4" />
                              {t.admin.edit}
                            </A>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center gap-1 rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3 text-sm font-bold text-red-700 hover:bg-red-100"
                              style={{ pointerEvents: "auto" }}
                              onClick={() =>
                                onDeleteProduct(
                                  p.id,
                                  locale === "ar" ? p.nameAr : p.nameEn
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              {t.admin.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {tab === "currencies" && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">{t.admin.currencies}</h2>
              <p className="mb-6 text-sm text-[var(--muted)]">
                {locale === "ar"
                  ? "عدّل سعر كل عملة مقابل 1 دولار أمريكي، ثم احفظ."
                  : "Edit each rate vs 1 USD, then save."}
              </p>
              <div className="space-y-3">
                {CURRENCIES.map((c) => (
                  <label
                    key={c.code}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-sand-200 bg-white p-4"
                  >
                    <span className="w-28 font-semibold">
                      {c.code} · {c.symbol}
                    </span>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      className="min-w-[140px] flex-1 rounded-xl border border-sand-300 px-3 py-2"
                      value={rateDraft[c.code] ?? ""}
                      onChange={(e) =>
                        setRateDraft((d) => ({
                          ...d,
                          [c.code]: e.target.value,
                        }))
                      }
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white"
                  style={{ pointerEvents: "auto" }}
                  onClick={() => {
                    const next: Record<string, number> = {};
                    for (const c of CURRENCIES) {
                      const n = Number(rateDraft[c.code]);
                      if (n > 0) next[c.code] = n;
                    }
                    setCurrencyRates(next as typeof currencyRates);
                    setFlash(
                      locale === "ar" ? "تم حفظ العملات ✓" : "Rates saved ✓"
                    );
                    window.setTimeout(() => setFlash(""), 2500);
                  }}
                >
                  {t.admin.save}
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-sand-300 px-5 py-3 text-sm font-semibold"
                  style={{ pointerEvents: "auto" }}
                  onClick={() => {
                    resetCurrencyRates();
                    setFlash(
                      locale === "ar"
                        ? "تمت إعادة الأسعار الافتراضية"
                        : "Defaults restored"
                    );
                    window.setTimeout(() => setFlash(""), 2500);
                  }}
                >
                  {locale === "ar" ? "افتراضي" : "Defaults"}
                </button>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">{t.admin.orders}</h2>
              {orders.length === 0 ? (
                <p className="text-[var(--muted)]">
                  {locale === "ar" ? "لا توجد طلبات بعد" : "No orders yet"}
                </p>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="rounded-2xl border border-sand-200 bg-white p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{o.customer.name}</p>
                          <p className="text-sm text-[var(--muted)]">
                            {o.customer.phone} · {o.country}
                          </p>
                          <p className="mt-1 text-xs text-[var(--muted)]">
                            {new Date(o.createdAt).toLocaleString(
                              locale === "ar" ? "fr-FR" : "en-US"
                            )}
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="font-bold text-brand-800">
                            {formatPrice(o.totalUSD, o.currency, locale)}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-brand-600">
                            COD · {o.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-[var(--muted)]">
          …
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
