"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Eye, Save } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { currencyForCountry } from "@/lib/countries";
import { convertToUSD, formatLocalAmount, getCurrency } from "@/lib/currency";
import { getProductLocalPrice } from "@/lib/pricing";
import { htmlToPlain, toEditorHtml } from "@/lib/rich-html";
import { slugify } from "@/lib/utils";
import type { CountryCode } from "@/lib/types";
import { ProductRichEditor } from "@/components/admin/ProductRichEditor";
import { ProductColorsEditor } from "@/components/admin/ProductColorsEditor";
import { SITE_URL } from "@/lib/site";

export default function EditProductPage() {
  const params = useParams();
  const id = String(params.id ?? "");
  const isNew = id === "new";
  const t = useT();
  const {
    locale,
    products,
    categories,
    addProduct,
    updateProduct,
    storageReady,
  } = useStore();
  const existing = useMemo(
    () => (isNew ? null : products.find((p) => p.id === id) ?? null),
    [products, id, isNew]
  );

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descLang, setDescLang] = useState<"ar" | "en">("ar");
  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localPrice, setLocalPrice] = useState("99");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [customColorEnabled, setCustomColorEnabled] = useState(false);
  const [ready, setReady] = useState(isNew);

  const cat =
    categories.find((c) => c.id === categoryId) ?? categories[0] ?? null;
  const market = (cat?.country ?? "US") as CountryCode;
  const cur = currencyForCountry(market);
  const rate = getCurrency(cur).rate;
  const title = locale === "ar" ? nameAr || nameEn : nameEn || nameAr;

  useEffect(() => {
    if (isNew) {
      setCategoryId(categories[0]?.id ?? "");
      setDescriptionAr("");
      setDescriptionEn("");
      setCustomColorEnabled(false);
      setReady(true);
      return;
    }
    if (!existing) return;
    const c =
      categories.find((x) => x.id === existing.categoryId) ?? categories[0];
    const m = (c?.country ?? "US") as CountryCode;
    const local = getProductLocalPrice(existing, m);
    setNameAr(existing.nameAr);
    setNameEn(existing.nameEn);
    setDescriptionAr(toEditorHtml(existing.descriptionAr));
    setDescriptionEn(toEditorHtml(existing.descriptionEn));
    setCategoryId(existing.categoryId || categories[0]?.id || "");
    setSlug(existing.slug);
    setImageUrl(existing.images?.[0] ?? "");
    setLocalPrice(String(Math.round(local * 1000) / 1000));
    setInStock(existing.inStock !== false);
    setFeatured(Boolean(existing.featured));
    setCustomColorEnabled(Boolean(existing.customColorEnabled));
    setReady(true);
  }, [existing, isNew, categories]);

  if (!isNew && ready && !existing) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg">المنتج غير موجود</p>
        <Link
          href="/admin?tab=products"
          className="mt-4 inline-block text-brand-700 underline"
        >
          رجوع
        </Link>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="p-10 text-center text-sm text-[var(--muted)]">…</div>
    );
  }

  function saveNow() {
    if (!storageReady) {
      window.alert(
        locale === "ar"
          ? "انتظر لحظة… جاري تجهيز الحفظ"
          : "Please wait… preparing save"
      );
      return;
    }
    const priceLocal = Number(localPrice);
    if (!(priceLocal > 0)) {
      window.alert(locale === "ar" ? "أدخل سعراً صحيحاً" : "Enter a valid price");
      return;
    }
    const priceUSD = convertToUSD(priceLocal, cur);
    const images = imageUrl.trim()
      ? [imageUrl.trim()]
      : existing?.images?.length
        ? existing.images
        : ["/products/car-vacuum.png"];

    const plainAr = htmlToPlain(descriptionAr) || nameAr.trim();
    const plainEn = htmlToPlain(descriptionEn) || nameEn.trim();

    const data = {
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim(),
      descriptionAr: descriptionAr.trim() || `<p>${plainAr}</p>`,
      descriptionEn: descriptionEn.trim() || `<p>${plainEn}</p>`,
      detailsAr: existing?.detailsAr ?? [],
      detailsEn: existing?.detailsEn ?? [],
      priceUSD,
      compareAtUSD: existing?.compareAtUSD,
      marketPrices: {
        ...(existing?.marketPrices ?? {}),
        [market]: priceLocal,
      },
      marketComparePrices: existing?.marketComparePrices,
      availableIn: existing?.availableIn,
      colors: [],
      customColorEnabled,
      categoryId: categoryId || categories[0]?.id || "",
      images,
      slug: (slug || slugify(nameEn || nameAr)).trim(),
      featured,
      inStock,
      rating: existing?.rating ?? 4.5,
      reviewCount: existing?.reviewCount ?? 0,
      landing: existing?.landing,
    };

    if (!data.nameAr || !data.nameEn || !data.categoryId) {
      window.alert(
        locale === "ar" ? "أكمل الاسم والتصنيف" : "Fill name and category"
      );
      return;
    }
    try {
      if (isNew) addProduct(data);
      else updateProduct(id, data);
    } catch (err) {
      console.error(err);
      window.alert(locale === "ar" ? "فشل الحفظ" : "Save failed");
      return;
    }
    window.location.assign("/admin?tab=products&saved=1");
  }

  const previewSlug = (slug || slugify(nameEn || nameAr || "product")).trim();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin?tab=products"
          className="text-sm text-brand-700 hover:underline"
        >
          ← {locale === "ar" ? "رجوع للإدارة" : "Back to admin"}
        </Link>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/product/${encodeURIComponent(previewSlug)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-600 bg-white px-4 py-2.5 text-sm font-bold text-brand-800 hover:bg-brand-50"
          >
            <Eye className="h-4 w-4" />
            {locale === "ar" ? "معاينة التعديلات" : "Preview changes"}
          </a>
          <button
            type="button"
            onClick={saveNow}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
          >
            <Save className="h-4 w-4" />
            {t.admin.save}
          </button>
        </div>
      </div>

      <h1 className="font-display text-3xl font-semibold text-ink-900">
        {isNew ? t.admin.addProduct : t.admin.editProduct}
      </h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {locale === "ar"
          ? "محرر مرئي مثل يوكان — غامق، لون، محاذاة، صور وGIF داخل الوصف"
          : "YouCan-style visual editor — bold, color, align, images & GIFs"}
      </p>

      {/* YouCan-like fields */}
      <div className="mt-8 space-y-4 rounded-2xl border border-sand-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-ink-800">
            {locale === "ar" ? "عنوان المنتج (عربي)" : "Product title (AR)"}
          </span>
          <input
            className="w-full rounded-xl border border-sand-300 px-3 py-3 text-base font-semibold"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            placeholder="مثال: مكنسة سيارة لاسلكية"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-ink-800">
            {locale === "ar" ? "عنوان المنتج (إنجليزي)" : "Product title (EN)"}
          </span>
          <input
            className="w-full rounded-xl border border-sand-300 px-3 py-3 text-base"
            value={nameEn}
            onChange={(e) => {
              setNameEn(e.target.value);
              if (isNew || !slug) setSlug(slugify(e.target.value));
            }}
            placeholder="e.g. Cordless Car Vacuum"
            required
          />
        </label>

        <div>
          <span className="mb-1.5 block text-sm font-bold text-ink-800">
            URL
          </span>
          <div className="flex flex-wrap items-stretch overflow-hidden rounded-xl border border-sand-300 bg-sand-50">
            <span className="flex items-center px-3 text-xs text-[var(--muted)] sm:text-sm">
              {SITE_URL.replace(/\/$/, "")}/product/
            </span>
            <input
              className="min-w-[8rem] flex-1 border-0 bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700 outline-none"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value) || e.target.value)}
              placeholder="product-slug"
            />
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-ink-800">
            {t.admin.category}
          </span>
          <select
            className="w-full rounded-xl border border-sand-300 px-3 py-3"
            value={categoryId}
            required
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {locale === "ar" ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">
              {locale === "ar" ? `السعر (${cur})` : `Price (${cur})`}
            </span>
            <input
              type="number"
              step="any"
              min="0"
              required
              className="w-full rounded-xl border border-sand-300 px-3 py-3"
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
            />
            <span className="mt-1 block text-xs text-[var(--muted)]">
              {formatLocalAmount(Number(localPrice) || 0, cur, locale)} · ≈ $
              {(Number(localPrice) / (rate || 1)).toFixed(2)}
            </span>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">
              {locale === "ar" ? "صورة الغلاف (رابط)" : "Cover image URL"}
            </span>
            <input
              className="w-full rounded-xl border border-sand-300 px-3 py-3"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... أو /products/..."
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-4 pt-1">
          <label className="inline-flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            {t.admin.inStock}
          </label>
          <label className="inline-flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            {t.admin.featured}
          </label>
        </div>

        <ProductColorsEditor
          enabled={customColorEnabled}
          onChange={setCustomColorEnabled}
          locale={locale}
        />
      </div>

      {/* Rich description — YouCan editor */}
      <div className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-ink-900">
            {locale === "ar" ? "وصف المنتج" : "Product description"}
          </h2>
          <div className="inline-flex rounded-lg border border-sand-300 bg-white p-0.5 text-sm">
            <button
              type="button"
              className={`rounded-md px-3 py-1.5 font-semibold ${
                descLang === "ar"
                  ? "bg-brand-700 text-white"
                  : "text-ink-800 hover:bg-sand-50"
              }`}
              onClick={() => setDescLang("ar")}
            >
              العربية
            </button>
            <button
              type="button"
              className={`rounded-md px-3 py-1.5 font-semibold ${
                descLang === "en"
                  ? "bg-brand-700 text-white"
                  : "text-ink-800 hover:bg-sand-50"
              }`}
              onClick={() => setDescLang("en")}
            >
              English
            </button>
          </div>
        </div>

        {descLang === "ar" ? (
          <ProductRichEditor
            key="desc-ar"
            dir="rtl"
            value={descriptionAr}
            onChange={setDescriptionAr}
            placeholder="اكتب الوصف هنا — غامق، لون، توسيط، وأدرج صورة أو GIF من شريط الأدوات"
          />
        ) : (
          <ProductRichEditor
            key="desc-en"
            dir="ltr"
            value={descriptionEn}
            onChange={setDescriptionEn}
            placeholder="Write the description — bold, color, align, insert image/GIF from the toolbar"
          />
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-sand-200 pt-6">
        <a
          href={`/product/${encodeURIComponent(previewSlug)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-brand-600 bg-white px-5 py-3 text-sm font-bold text-brand-800 hover:bg-brand-50"
        >
          <Eye className="h-4 w-4" />
          {locale === "ar" ? "معاينة التعديلات" : "Preview"}
          {title ? ` — ${title}` : ""}
        </a>
        <button
          type="button"
          onClick={saveNow}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600"
        >
          <Save className="h-4 w-4" />
          {t.admin.save}
        </button>
      </div>
    </div>
  );
}
