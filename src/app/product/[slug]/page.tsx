"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Truck,
  HandCoins,
  Star,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import {
  currencyForCountry,
  isStoreMarket,
  usesCityOnlyAddress,
} from "@/lib/countries";
import { formatLocalAmount, formatPrice } from "@/lib/currency";
import {
  formatProductComparePrice,
  formatProductPrice,
  getProductPriceUSD,
  isProductAvailableIn,
  productDiscountPercent,
} from "@/lib/pricing";
import { pickText } from "@/lib/localized";
import { getProductQtyOffers, isCodQtyUpsellEnabled, lineTotalUSDForQty } from "@/lib/qty-upsell";
import { WARRANTY_USD_PER_UNIT, warrantyOrderNote } from "@/lib/latam-warranty";
import { trackAddToCart, trackViewContent, trackPurchase } from "@/lib/meta-pixel";
import { ProductBriefDescription } from "@/components/shop/ProductLanding";
import { ProIntro } from "@/components/shop/ProLanding";
import {
  AnnouncementBar,
  BenefitsGrid,
  CTA_BUTTON_CLASS,
  HowToOrder,
  ProblemSolution,
  ProductShowcase,
  SocialProof,
  scrollToOrder,
} from "@/components/shop/CodLanding";
import {
  CodCheckout,
  formatCodMarketPrice,
} from "@/components/shop/CodCheckoutSwitch";
import {
  CLIP_EARBUDS_SLUG,
  MAG_POWERBANK_SLUG,
  MINI_CAMERA_SLUG,
  SMART_TAG_SLUG,
  SNAP_PROSTATE_SLUG,
} from "@/lib/product-slugs";
import { ProductMediaGallery, preferredMediaIndex } from "@/components/shop/ProductMediaGallery";
import { ColorSwatches } from "@/components/shop/ColorSwatches";
import {
  ProductQtyUpsell,
  selectedQtyTotalLocal,
} from "@/components/shop/ProductQtyUpsell";
import { codCheckoutKind } from "@/lib/cod-markets";
import { cn } from "@/lib/utils";
import type { CountryCode, Locale, Order } from "@/lib/types";

/** Story modules are heavy — load only the matching slug. */
const ClipEarbudsStory = dynamic(
  () =>
    import("@/components/shop/ClipEarbudsStory").then((m) => m.ClipEarbudsStory),
  { ssr: false }
);
const MagPowerBankStory = dynamic(
  () =>
    import("@/components/shop/MagPowerBankStory").then(
      (m) => m.MagPowerBankStory
    ),
  { ssr: false }
);
const MiniCameraStory = dynamic(
  () =>
    import("@/components/shop/MiniCameraStory").then((m) => m.MiniCameraStory),
  { ssr: false }
);
const SmartTagStory = dynamic(
  () => import("@/components/shop/SmartTagStory").then((m) => m.SmartTagStory),
  { ssr: false }
);
const ProstateStory = dynamic(
  () =>
    import("@/components/shop/ProstateStory").then((m) => m.ProstateStory),
  { ssr: false }
);

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
    storageReady,
    geoReady,
    geoLockedCountry,
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
    if (byId) return geoLockedCountry && !byId.availableIn?.includes(geoLockedCountry) ? undefined : byId;
    // Geo-locked shoppers never see another market's listing
    if (geoLockedCountry) return undefined;
    if (previewCountry) return getProduct(slug) ?? undefined;
    // Direct link from another market (ads, reviewers, admin abroad): open the
    // product in its own market below. Listings still stay market-scoped.
    // Wait for geo so a visitor is never moved off their own market.
    if (!storageReady || !geoReady) return undefined;
    return products.find((p) => p.slug === slug && p.availableIn?.length);
  }, [getProduct, slug, previewCountry, country, products, storageReady, geoReady, geoLockedCountry]);

  const showQtyUpsell = isCodQtyUpsellEnabled(
    product,
    previewCountry ?? product?.availableIn?.[0] ?? country
  );

  // Ephemeral preview market — does not lock IP geo for the rest of the site
  useEffect(() => {
    if (previewCountry) setViewCountry(previewCountry);
  }, [previewCountry, setViewCountry]);

  useEffect(() => () => setViewCountry(null), [setViewCountry]);

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
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [warranty, setWarranty] = useState(false);

  useEffect(() => {
    if (!product) return;
    setActiveImg(preferredMediaIndex(product.images));
    setSelectedSize("");
    setSelectedColorId(product.colors?.[0]?.id ?? null);
  }, [product?.id]);
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
    const key = product.id;
    if (viewContentKey.current === key) return;
    viewContentKey.current = key;
    const valueUSD = getProductPriceUSD(product, country);
    // Standard: fbq('track', 'ViewContent', {… currency: 'USD'})
    trackViewContent({
      contentId: product.id,
      contentName: product.nameEn || product.nameAr,
      value: Math.round(valueUSD * 100) / 100,
      currency: "USD",
    });
  }, [product, country]);

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

  if (!product && (!storageReady || !geoReady)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24" aria-busy="true">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-sand-200/70" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-sand-200/70" />
            <div className="h-6 w-1/3 animate-pulse rounded-lg bg-sand-200/70" />
            <div className="h-24 animate-pulse rounded-2xl bg-sand-200/70" />
            <div className="h-12 animate-pulse rounded-2xl bg-sand-200/70" />
          </div>
        </div>
      </div>
    );
  }

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
      <ThankYouPurchase
        order={order}
        locale={locale}
        t={t}
      />
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

  const swatchColors = product.colors ?? [];
  const pickedSwatch =
    swatchColors.find((c) => c.id === selectedColorId) ?? swatchColors[0];
  const swatchLabel = pickedSwatch
    ? locale === "ar" && pickedSwatch.nameEn
      ? `${pickedSwatch.nameAr} · ${pickedSwatch.nameEn}`
      : locale === "ar"
        ? pickedSwatch.nameAr
        : pickedSwatch.nameEn
    : "";
  const cityOnlyAddress = usesCityOnlyAddress(country);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    if (product.customColorEnabled && !customColor.trim()) {
      window.alert(t.product.writeYourColorRequired);
      return;
    }
    if (swatchColors.length && !pickedSwatch) {
      window.alert(t.product.chooseColorRequired);
      return;
    }
    if (product.sizes?.length && !selectedSize) {
      window.alert(t.product.chooseSizeRequired);
      return;
    }
    const colorLabel = customColor.trim() || swatchLabel;
    const noteParts = [
      selectedSize
        ? locale === "ar"
          ? `المقاس: ${selectedSize}`
          : `Size: ${selectedSize}`
        : "",
      colorLabel
        ? locale === "ar"
          ? `اللون: ${colorLabel}`
          : `Color: ${colorLabel}`
        : "",
    ].filter(Boolean);
    const created = placeOrder(
      {
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: cityOnlyAddress ? form.city.trim() : form.address.trim(),
        notes: noteParts.length ? noteParts.join(" · ") : undefined,
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
    const colorNote =
      swatchLabel && !customColor.trim()
        ? locale === "ar"
          ? `اللون: ${swatchLabel}`
          : `Color: ${swatchLabel}`
        : "";
    const withExtras = {
      ...payload,
      notes:
        [payload.notes, colorNote, warranty ? warrantyOrderNote(country, qty) : ""]
          .filter(Boolean)
          .join(" · ") || undefined,
    };
    const created = placeOrder(withExtras, [
      {
        productId: product.id,
        quantity: qty,
        lineTotalUSD: orderLineUSD + (warranty ? WARRANTY_USD_PER_UNIT * qty : 0),
      },
    ]);
    setOrder(created);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkoutKind = codCheckoutKind(country);
  /** Markets with a dedicated geo-aware COD form (stacked layout, orange CTA) */
  const fufillsSticky = checkoutKind !== null;
  /** Quick COD form beside the first photo on desktop; dedicated forms keep the stacked layout */
  const arabCheckoutBesidePhoto = !fufillsSticky;
  const heroHeadline = product.landing
    ? pickText(product.landing, "headline", locale)
    : "";
  const storySlug = [
    MAG_POWERBANK_SLUG,
    MINI_CAMERA_SLUG,
    CLIP_EARBUDS_SLUG,
    SMART_TAG_SLUG,
    SNAP_PROSTATE_SLUG,
  ].includes(product.slug);
  const briefDescription =
    product.landing?.style === "pro" ? (
      <ProIntro product={product} locale={locale} hideHeadline={Boolean(heroHeadline)} />
    ) : (
      <ProductBriefDescription
        product={product}
        locale={locale}
        hideHeadline={Boolean(heroHeadline)}
      />
    );
  const colorPicker = product.colors?.length ? (
    <ColorSwatches
      colors={product.colors}
      locale={locale}
      selectedId={selectedColorId}
      onSelect={setSelectedColorId}
    />
  ) : null;

  return (
    <div
      className={cn(
        "mx-auto px-4 pb-28 pt-8 sm:px-6 lg:px-8",
        arabCheckoutBesidePhoto ? "max-w-6xl" : "max-w-4xl"
      )}
    >
      <AnnouncementBar />
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

      {/* 1) Hero headline — the benefit first, product name as the label */}
      <header className="animate-fade-up text-center sm:text-start">
        {heroHeadline ? (
          <p className="product-label">{name}</p>
        ) : category ? (
          <p className="product-label">
            {pickText(category, "name", locale)}
          </p>
        ) : null}
        <h1 className="product-hero-title mt-2 text-balance text-ink-900">
          {heroHeadline || name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {product.reviewCount > 0 || product.landing?.reviews?.length ? (
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
            {product.slug === MINI_CAMERA_SLUG && locale === "es" ? (
              <a href="#opiniones" className="underline underline-offset-2">
                Ver opiniones
              </a>
            ) : product.landing?.reviews?.length ? (
              <a href="#opiniones" className="underline underline-offset-2">
                {locale === "ar"
                  ? "شاهد الآراء"
                  : locale === "es"
                    ? "Ver opiniones"
                    : "See reviews"}
              </a>
            ) : (
            <span>
              {product.rating.toFixed(1)} · {product.reviewCount}{" "}
              {t.product.reviews}
            </span>
            )}
          </div>
          ) : null}
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="product-price">
              {formatProductPrice(product, country, locale)}
            </span>
            {compareLabel ? (
              <span className="text-base text-[var(--muted)] line-through">
                {compareLabel}
              </span>
            ) : null}
            {discount > 0 ? (
              <span className="rounded-full bg-[#ff6a00] px-2.5 py-0.5 text-xs font-extrabold text-white">
                {t.product.save} {discount}%
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-3 sm:items-start">
          <button
            type="button"
            disabled={!product.inStock}
            onClick={scrollToOrder}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-base font-bold transition sm:w-auto sm:min-w-[16rem]",
              CTA_BUTTON_CLASS
            )}
          >
            {product.inStock ? `${t.product.orderNow} — ${t.trust.cod}` : t.shop.outOfStock}
          </button>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-brand-800 sm:justify-start sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-brand-600" />
              {t.trust.freeShipping}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <HandCoins className="h-4 w-4 text-brand-600" />
              {t.trust.cod}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-brand-600" />
              {t.trust.returns}
            </li>
          </ul>
        </div>
      </header>

      {arabCheckoutBesidePhoto ? (
        /* Quick COD form: gallery + short description, then the form (beside the gallery from lg) */
        <div className="mt-6 grid items-start gap-6 animate-fade-up lg:mt-8 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0 space-y-6">
            <ProductMediaGallery
              product={product}
              locale={locale}
              activeImg={activeImg}
              onSelect={setActiveImg}
              discount={discount}
            />
            {briefDescription}
          </div>
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <div
        id="order"
              className="scroll-mt-28 rounded-[1.35rem] border border-sand-200 bg-white p-5 shadow-sm sm:p-7"
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

              {colorPicker}

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

              {product.sizes?.length ? (
                <div className="mt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="product-section-title text-lg sm:text-xl">
                      {t.product.chooseSize}
                    </h2>
                    {selectedSize ? (
                      <p className="text-sm text-[var(--muted)]">
                        {t.product.selectedSize}:{" "}
                        <span className="font-bold text-brand-800">
                          {selectedSize}
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <div
                    className="mt-3 flex flex-wrap gap-2"
                    role="listbox"
                    aria-label={t.product.chooseSize}
                  >
                    {product.sizes.map((size) => {
                      const pressed = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          role="option"
                          aria-selected={pressed}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "min-w-[3.25rem] rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition",
                            pressed
                              ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                              : "border-sand-300 bg-white text-ink-800 hover:border-brand-500"
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

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
                <h2 className="product-section-title text-lg">
                  {t.checkout.title}
                </h2>

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
          {!cityOnlyAddress ? (
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
            className={cn(
              "inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-sm font-bold transition",
              CTA_BUTTON_CLASS
            )}
          >
            {product.inStock ? t.checkout.placeOrder : t.shop.outOfStock}
          </button>
                <ul className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px] font-semibold text-brand-800 sm:text-xs">
                  {[
                    { icon: HandCoins, label: t.trust.cod },
                    { icon: Truck, label: t.trust.freeShipping },
                    { icon: RotateCcw, label: t.trust.returns },
                  ].map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-brand-50 px-2 py-2.5"
                    >
                      <Icon className="h-5 w-5 text-brand-700" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
        </form>
      </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="mt-8 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <ProductMediaGallery
              product={product}
              locale={locale}
              activeImg={activeImg}
              onSelect={setActiveImg}
              discount={discount}
            />
          </div>
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {briefDescription}
          </div>
          {colorPicker ? <div className="mt-2">{colorPicker}</div> : null}
          {checkoutKind ? (
            <CodCheckout
              kind={checkoutKind}
              product={product}
              country={country}
              qty={qty}
              onQtyChange={setQty}
              customColor={customColor}
              onCustomColorChange={setCustomColor}
              formRef={formRef}
              onPlaceOrder={submitLatamCod}
              warranty={warranty}
              onWarrantyChange={setWarranty}
            />
          ) : null}
        </>
      )}

      {/* 3) Problem → solution, benefits (image + text), video / before-after / GIFs */}
      {storySlug ? null : (
        <>
          <ProblemSolution product={product} locale={locale} />
          <BenefitsGrid product={product} locale={locale} />
          <ProductShowcase product={product} locale={locale} />
        </>
      )}

      {/* 4) Bespoke stories keep their own copy; everything else gets the generic blocks */}
      {product.slug === MAG_POWERBANK_SLUG ? (
        <MagPowerBankStory product={product} locale={locale} />
      ) : product.slug === MINI_CAMERA_SLUG ? (
        <MiniCameraStory product={product} locale={locale} />
      ) : product.slug === CLIP_EARBUDS_SLUG ? (
        <ClipEarbudsStory product={product} locale={locale} />
      ) : product.slug === SMART_TAG_SLUG ? (
        <SmartTagStory product={product} locale={locale} />
      ) : product.slug === SNAP_PROSTATE_SLUG ? (
        <ProstateStory product={product} locale={locale} />
      ) : null}

      {/* 5) How to order, social proof, guarantees, FAQ */}
      <HowToOrder />
      <SocialProof
        product={product}
        locale={locale}
        showReviewList={
          product.slug !== MINI_CAMERA_SLUG &&
          product.slug !== SNAP_PROSTATE_SLUG
        }
        showFaq={!storySlug}
      />

      <div className="fixed bottom-0 left-0 z-50 w-screen max-w-[100vw] border-t border-sand-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(14,34,29,0.08)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-ink-800 sm:text-sm">{name}</p>
            <p
              className={cn(
                "truncate text-base font-bold sm:text-lg",
                fufillsSticky ? "text-[#ff7a00]" : "product-price"
              )}
            >
              {formatCodMarketPrice(
                checkoutKind,
                orderTotalLocal,
                marketCurrency,
                locale
              )}
            </p>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              if (product.inStock) {
                // Standard: fbq('track', 'AddToCart', {… currency: 'USD'})
                trackAddToCart({
                  contentId: product.id,
                  contentName: product.nameEn || product.nameAr,
                  value: Math.round(orderLineUSD * 100) / 100,
                  currency: "USD",
                  quantity: qty,
                });
              }
              formRef.current?.requestSubmit();
            }}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition sm:rounded-2xl sm:px-8 sm:py-3.5",
              CTA_BUTTON_CLASS
            )}
          >
            {product.inStock ? t.product.orderNow : t.shop.outOfStock}
          </button>
        </div>
      </div>
    </div>
  );
}

function ThankYouPurchase({
  order,
  locale,
  t,
}: {
  order: Order;
  locale: Locale;
  t: ReturnType<typeof useT>;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    // Standard: fbq('track', 'Purchase', {value, currency: 'USD'})
    trackPurchase({
      orderId: order.id,
      value: Math.round(order.totalUSD * 100) / 100,
      currency: "USD",
      contents: order.items.map((i) => ({
        id: i.productId,
        quantity: i.quantity,
      })),
    });
  }, [order]);

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
