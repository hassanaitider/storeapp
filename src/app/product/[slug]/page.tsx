"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Truck,
  HandCoins,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { currencyForCountry, isStoreMarket } from "@/lib/countries";
import {
  convertFromUSD,
  formatArgentinaCodPrice,
  formatLocalAmount,
  formatMexicoCodPrice,
  formatDominicanCodPrice,
  formatEcuadorCodPrice,
  formatSalvadorCodPrice,
  formatHondurasCodPrice,
  formatNicaraguaCodPrice,
  formatPrice,
} from "@/lib/currency";
import {
  formatProductComparePrice,
  formatProductPrice,
  getProductPriceUSD,
  isProductAvailableIn,
  productDiscountPercent,
} from "@/lib/pricing";
import { pickText } from "@/lib/localized";
import { getProductQtyOffers, isCodQtyUpsellEnabled, lineTotalUSDForQty } from "@/lib/qty-upsell";
import { trackViewContent } from "@/lib/meta-pixel";
import {
  ProductBriefDescription,
  ProductDetailSections,
} from "@/components/shop/ProductLanding";
import { ClipEarbudsStory } from "@/components/shop/ClipEarbudsStory";
import { MagPowerBankStory } from "@/components/shop/MagPowerBankStory";
import { MiniCameraStory } from "@/components/shop/MiniCameraStory";
import { CLIP_EARBUDS_SLUG } from "@/lib/seed-latam-clip-earbuds";
import { MAG_POWERBANK_SLUG } from "@/lib/seed-latam-mag-powerbank";
import { MINI_CAMERA_SLUG } from "@/lib/seed-latam-mini-camera";
import { ProductMediaGallery } from "@/components/shop/ProductMediaGallery";
import {
  ProductQtyUpsell,
  selectedQtyTotalLocal,
} from "@/components/shop/ProductQtyUpsell";
import { LatamCodCheckout } from "@/components/shop/LatamCodCheckout";
import { ArgentinaCodCheckout } from "@/components/shop/ArgentinaCodCheckout";
import { MexicoCodCheckout } from "@/components/shop/MexicoCodCheckout";
import { DominicanCodCheckout } from "@/components/shop/DominicanCodCheckout";
import { EcuadorCodCheckout } from "@/components/shop/EcuadorCodCheckout";
import { SalvadorCodCheckout } from "@/components/shop/SalvadorCodCheckout";
import { HondurasCodCheckout } from "@/components/shop/HondurasCodCheckout";
import { NicaraguaCodCheckout } from "@/components/shop/NicaraguaCodCheckout";
import { usesLatamCodCheckout } from "@/lib/latam-geo";
import { usesMexicoCodCheckout } from "@/lib/mexico-geo";
import { usesDominicanCodCheckout } from "@/lib/dominican-geo";
import { usesEcuadorCodCheckout } from "@/lib/ecuador-geo";
import { usesSalvadorCodCheckout } from "@/lib/salvador-geo";
import { usesHondurasCodCheckout } from "@/lib/honduras-geo";
import { usesNicaraguaCodCheckout } from "@/lib/nicaragua-geo";
import { cn } from "@/lib/utils";
import type { CountryCode, Order } from "@/lib/types";

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-[var(--muted)]">
          …
        </div>
      }
    >
      <ProductPageInner />
    </Suspense>
  );
}

function ProductPageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = String(params.slug);
  const t = useT();
  const {
    locale,
    currency,
    country,
    getProduct,
    setViewCountry,
    placeOrder,
    categories,
    products,
  } = useStore();

  const countryQuery = searchParams.get("country")?.toUpperCase() ?? "";
  const previewCountry: CountryCode | null =
    countryQuery && isStoreMarket(countryQuery)
      ? (countryQuery as CountryCode)
      : null;

  const product = useMemo(() => {
    const preferred = previewCountry ?? country;
    const inPreferred = getProduct(slug, preferred);
    if (inPreferred) return inPreferred;
    // Exact id (admin / per-country LATAM row) — never fall through to another market's slug twin
    const byId = products.find((p) => p.id === slug);
    if (byId) return byId;
    // Public storefront: no cross-market slug fallback
    if (!previewCountry) return undefined;
    return getProduct(slug) ?? undefined;
  }, [getProduct, slug, previewCountry, country, products]);

  const showQtyUpsell = isCodQtyUpsellEnabled(
    product,
    previewCountry ?? product?.availableIn?.[0] ?? country
  );

  // Ephemeral preview market — does not lock IP geo for the rest of the site
  useEffect(() => {
    setViewCountry(previewCountry);
    return () => setViewCountry(null);
  }, [previewCountry, setViewCountry]);

  // If there is no country query, switch storefront to the product's market
  // without a permanent manual lock (IP geo still wins on the next visit).
  useEffect(() => {
    if (!product || previewCountry) return;
    if (isProductAvailableIn(product, country, categories)) return;
    const fromCategory = categories.find((c) => c.id === product.categoryId)
      ?.country;
    const target =
      product.availableIn?.[0] ??
      fromCategory ??
      null;
    if (target && isStoreMarket(target) && target !== country) {
      setViewCountry(target);
    }
  }, [product, country, categories, previewCountry, setViewCountry]);

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

  const viewContentKey = useRef<string | null>(null);
  useEffect(() => {
    if (!product) return;
    const key = `${product.id}:${country}:${currency}`;
    if (viewContentKey.current === key) return;
    viewContentKey.current = key;
    const unitUSD = getProductPriceUSD(product, country);
    const value = convertFromUSD(unitUSD, currency);
    trackViewContent({
      contentId: product.id,
      contentName: product.nameEn || product.nameAr,
      value: Math.round(value * 100) / 100,
      currency,
    });
  }, [product, country, currency]);

  useEffect(() => {
    if (!product) return;
    if (!showQtyUpsell) {
      setQty(1);
      return;
    }
    setQty((prev) => {
      const offers = getProductQtyOffers(product, country, locale);
      if (offers.some((o) => o.quantity === prev)) return prev;
      const popular = offers.find((o) => o.popular);
      return popular?.quantity ?? offers[0]?.quantity ?? 1;
    });
  }, [product?.id, country, locale, showQtyUpsell]);

  const marketCurrency = currencyForCountry(country);
  const qtyOffers = useMemo(
    () => (product ? getProductQtyOffers(product, country, locale) : []),
    [product, country, locale]
  );
  const orderTotalLocal = useMemo(
    () =>
      product ? selectedQtyTotalLocal(product, country, locale, qty) : 0,
    [product, country, locale, qty]
  );
  const orderLineUSD = useMemo(
    () => (product ? lineTotalUSDForQty(product, country, qty) : 0),
    [product, country, qty]
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-[var(--muted)]">
          {locale === "ar"
            ? "المنتج غير موجود"
            : locale === "es"
              ? "Producto no encontrado"
              : "Product not found"}
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

  const name = pickText(product, "name", locale);
  const category = categories.find((c) => c.id === product.categoryId);
  const qtyLabel =
    qty === 1
      ? t.upsell.onePiece
      : qty === 2
        ? t.upsell.twoPieces
        : qty === 3
          ? t.upsell.threePieces
          : pickText(
              qtyOffers.find((o) => o.quantity === qty),
              "label",
              locale
            ) || `${qty}`;
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
    const moroccoSimple = country === "MA";
    const created = placeOrder(
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: moroccoSimple ? form.city.trim() : form.address.trim(),
        notes: colorLabel
          ? locale === "ar"
            ? `اللون: ${colorLabel}`
            : `Color: ${colorLabel}`
          : undefined,
      },
      [{ productId: product.id, quantity: qty, lineTotalUSD: orderLineUSD }]
    );
    setOrder(created);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitLatamCod = (payload: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  }) => {
    if (!product.inStock) return;
    const created = placeOrder(payload, [
      { productId: product.id, quantity: qty, lineTotalUSD: orderLineUSD },
    ]);
    setOrder(created);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const argentinaCod = country === "AR";
  const mexicoCod = !argentinaCod && usesMexicoCodCheckout(country);
  const dominicanCod =
    !argentinaCod && !mexicoCod && usesDominicanCodCheckout(country);
  const ecuadorCod =
    !argentinaCod &&
    !mexicoCod &&
    !dominicanCod &&
    usesEcuadorCodCheckout(country);
  const salvadorCod =
    !argentinaCod &&
    !mexicoCod &&
    !dominicanCod &&
    !ecuadorCod &&
    usesSalvadorCodCheckout(country);
  const hondurasCod =
    !argentinaCod &&
    !mexicoCod &&
    !dominicanCod &&
    !ecuadorCod &&
    !salvadorCod &&
    usesHondurasCodCheckout(country);
  const nicaraguaCod =
    !argentinaCod &&
    !mexicoCod &&
    !dominicanCod &&
    !ecuadorCod &&
    !salvadorCod &&
    !hondurasCod &&
    usesNicaraguaCodCheckout(country);
  const latamCod =
    !argentinaCod &&
    !mexicoCod &&
    !dominicanCod &&
    !ecuadorCod &&
    !salvadorCod &&
    !hondurasCod &&
    !nicaraguaCod &&
    usesLatamCodCheckout(country);
  const fufillsSticky =
    argentinaCod ||
    mexicoCod ||
    dominicanCod ||
    ecuadorCod ||
    salvadorCod ||
    hondurasCod ||
    nicaraguaCod ||
    latamCod;
  const moroccoSimpleCheckout = country === "MA";

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
              {pickText(category, "name", locale)}
            </Link>
          </>
        )}
      </nav>

      {/* 1) Product title */}
      <header className="animate-fade-up text-center sm:text-start">
        {category ? (
          <p className="product-label">
            {pickText(category, "name", locale)}
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

      {/* Buy / COD blocks — AR, MX, DO, EC, SV, HN, NI modules are market-exclusive */}
      {argentinaCod ? (
        <ArgentinaCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : mexicoCod ? (
        <MexicoCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : dominicanCod ? (
        <DominicanCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : ecuadorCod ? (
        <EcuadorCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : salvadorCod ? (
        <SalvadorCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : hondurasCod ? (
        <HondurasCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : nicaraguaCod ? (
        <NicaraguaCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : latamCod ? (
        <LatamCodCheckout
          product={product}
          country={country}
          qty={qty}
          onQtyChange={setQty}
          customColor={customColor}
          onCustomColorChange={setCustomColor}
          formRef={formRef}
          onPlaceOrder={submitLatamCod}
        />
      ) : (
      <div
        id="order"
        className="mt-10 scroll-mt-28 rounded-[1.35rem] border border-sand-200 bg-white p-5 shadow-sm sm:p-7"
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

        {/* Volume discount — shown only when enabled in admin */}
        {showQtyUpsell ? (
          <ProductQtyUpsell
            product={product}
            country={country}
            locale={locale}
            selectedQty={qty}
            onSelect={setQty}
            className="mt-5"
          />
        ) : null}

        <form ref={formRef} onSubmit={onSubmit} className="mt-5 space-y-4">
          <h2 className="product-section-title text-lg">{t.checkout.title}</h2>

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
          {!moroccoSimpleCheckout ? (
            <Field
              label={t.checkout.address}
              required
              value={form.address}
              onChange={(v) => setForm((f) => ({ ...f, address: v }))}
            />
          ) : null}

          <div className="flex items-center justify-between border-t border-sand-200 pt-3 text-sm">
            <span className="font-semibold text-ink-800">
              {t.cart.total}
              {showQtyUpsell ? (
                <span className="ms-1 font-normal text-[var(--muted)]">
                  · {qtyLabel}
                </span>
              ) : null}
            </span>
            <span className="product-price text-base">
              {formatLocalAmount(orderTotalLocal, marketCurrency, locale)}
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
      )}

      {/* 4) Detailed description: image → text → image → text */}
      {product.slug === MAG_POWERBANK_SLUG ? (
        <MagPowerBankStory product={product} locale={locale} />
      ) : product.slug === MINI_CAMERA_SLUG ? (
        <MiniCameraStory product={product} locale={locale} />
      ) : product.slug === CLIP_EARBUDS_SLUG ? (
        <ClipEarbudsStory product={product} locale={locale} />
      ) : (
        <ProductDetailSections product={product} locale={locale} />
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-200/80 bg-white/95 shadow-[0_-8px_30px_rgba(14,34,29,0.08)] backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-800">{name}</p>
            <p
              className={cn(
                "text-lg font-bold",
                fufillsSticky ? "text-[#ff7a00]" : "product-price"
              )}
            >
              {argentinaCod
                ? formatArgentinaCodPrice(orderTotalLocal)
                : mexicoCod
                  ? formatMexicoCodPrice(orderTotalLocal)
                  : dominicanCod
                    ? formatDominicanCodPrice(orderTotalLocal)
                    : ecuadorCod
                      ? formatEcuadorCodPrice(orderTotalLocal)
                      : salvadorCod
                        ? formatSalvadorCodPrice(orderTotalLocal)
                        : hondurasCod
                          ? formatHondurasCodPrice(orderTotalLocal)
                          : nicaraguaCod
                            ? formatNicaraguaCodPrice(orderTotalLocal)
                            : formatLocalAmount(
                                orderTotalLocal,
                                marketCurrency,
                                locale
                              )}
            </p>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => formRef.current?.requestSubmit()}
            className={cn(
              "shrink-0 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition disabled:opacity-50 sm:px-8",
              fufillsSticky
                ? "bg-gradient-to-b from-[#ff9a3d] to-[#ff6a00] hover:brightness-105"
                : "bg-brand-700 hover:bg-brand-600"
            )}
          >
            {product.inStock
              ? fufillsSticky
                ? "Comprar ahora"
                : t.checkout.placeOrder
              : t.shop.outOfStock}
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
