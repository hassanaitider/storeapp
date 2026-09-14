"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Save } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { currencyForCountry } from "@/lib/countries";
import { convertToUSD, formatLocalAmount, getCurrency } from "@/lib/currency";
import { getProductLocalPrice, resolveProductMarket } from "@/lib/pricing";
import { htmlToPlain, toEditorHtml } from "@/lib/rich-html";
import { slugify } from "@/lib/utils";
import { ProductQtyOffersEditor } from "@/components/admin/ProductQtyOffersEditor";
import { ProductRichEditor } from "@/components/admin/ProductRichEditor";
import { ProductColorsEditor } from "@/components/admin/ProductColorsEditor";
import type { CountryCode, Product, ProductQtyOffer } from "@/lib/types";
import { ProductMediaGallery } from "@/components/shop/ProductMediaGallery";
import { SITE_URL } from "@/lib/site";
import {
  parseAdminPrice,
  scaleQtyOfferMarketPrices,
} from "@/lib/admin-price";
import { isStoreMarket } from "@/lib/countries";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id ?? "");
  const isNew = id === "new";
  const t = useT();
  const {
    locale,
    products,
    categories,
    addProduct,
    updateProduct,
    persistCatalog,
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
  const [images, setImages] = useState<string[]>(["/products/car-vacuum.png"]);
  const [activeImg, setActiveImg] = useState(0);
  const [localPrice, setLocalPrice] = useState("99");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [customColorEnabled, setCustomColorEnabled] = useState(false);
  const [qtyOffers, setQtyOffers] = useState<ProductQtyOffer[]>([]);
  const [flash, setFlash] = useState("");
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  /** Load form only after catalog hydrate, and only when the product id changes. */
  const loadedForIdRef = useRef<string | null>(null);

  const cat =
    categories.find((c) => c.id === categoryId) ?? categories[0] ?? null;
  const market = ((): CountryCode => {
    if (existing) {
      const resolved = resolveProductMarket(existing, categories);
      if (resolved) return resolved;
    }
    if (cat?.country && isStoreMarket(cat.country)) return cat.country;
    return "US";
  })();
  const cur = currencyForCountry(market);
  const rate = getCurrency(cur).rate;
  const title = locale === "ar" ? nameAr || nameEn : nameEn || nameAr;
  const previewPathId = existing?.id || (slug || slugify(nameEn || nameAr || "product")).trim();
  const previewHref = `/product/${encodeURIComponent(previewPathId)}?country=${encodeURIComponent(market)}`;

  // Switching products must allow a fresh load
  useEffect(() => {
    loadedForIdRef.current = null;
    setReady(false);
  }, [id, isNew]);

  useEffect(() => {
    // Wait for local/remote catalog merge — otherwise we lock in seed prices
    // and ignore the merchant's saved shelf price after reload.
    if (!storageReady) return;

    if (isNew) {
      if (loadedForIdRef.current === "new") return;
      loadedForIdRef.current = "new";
      setCategoryId(categories[0]?.id ?? "");
      setDescriptionAr("");
      setDescriptionEn("");
      setCustomColorEnabled(false);
      setReady(true);
      return;
    }
    if (!existing) {
      setReady(true);
      return;
    }
    if (loadedForIdRef.current === existing.id) return;
    loadedForIdRef.current = existing.id;
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
    setImages(
      existing.images?.length
        ? [...existing.images]
        : ["/products/car-vacuum.png"]
    );
    setActiveImg(0);
    setLocalPrice(String(Math.round(local * 1000) / 1000));
    setInStock(existing.inStock !== false);
    setFeatured(Boolean(existing.featured));
    setCustomColorEnabled(Boolean(existing.customColorEnabled));
    setQtyOffers([...(existing.qtyOffers ?? [])]);
    setReady(true);
  }, [existing, isNew, categories, storageReady]);

  useEffect(() => {
    const onLocalFail = () => {
      window.alert(
        locale === "ar"
          ? "تعذّر الحفظ محلياً — أفرغ مساحة المتصفح"
          : "Local save failed — free browser storage"
      );
    };
    const onServerFail = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "unauthorized") {
        window.alert(
          locale === "ar"
            ? "لم يُحفظ على السيرفر — سجّل دخول لوحة التحكم"
            : "Not saved to server — log in to admin"
        );
      } else if (detail === "missing_blob_token") {
        window.alert(
          locale === "ar"
            ? "الحفظ على السيرفر غير مفعّل: أضف BLOB_READ_WRITE_TOKEN في Vercel (Storage → Blob)"
            : "Server save disabled: add BLOB_READ_WRITE_TOKEN in Vercel (Storage → Blob)"
        );
      }
    };
    window.addEventListener("smart-shop-save-error", onLocalFail);
    window.addEventListener("smart-shop-server-save-error", onServerFail);
    return () => {
      window.removeEventListener("smart-shop-save-error", onLocalFail);
      window.removeEventListener("smart-shop-server-save-error", onServerFail);
    };
  }, [locale]);

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

  async function saveNow() {
    if (!storageReady) {
      window.alert(
        locale === "ar"
          ? "انتظر لحظة… جاري تجهيز الحفظ"
          : locale === "es"
            ? "Espera un momento… preparando guardado"
            : "Please wait… preparing save"
      );
      return;
    }
    const priceLocal = parseAdminPrice(localPrice);
    if (priceLocal == null) {
      window.alert(
        locale === "ar"
          ? "أدخل سعراً صحيحاً"
          : locale === "es"
            ? "Introduce un precio válido"
            : "Enter a valid price"
      );
      return;
    }
    const priceUSD = convertToUSD(priceLocal, cur);
    const nextImages =
      images.filter(Boolean).length > 0
        ? images.filter(Boolean)
        : ["/products/car-vacuum.png"];

    const plainAr = htmlToPlain(descriptionAr) || nameAr.trim();
    const plainEn = htmlToPlain(descriptionEn) || nameEn.trim();

    const oldUnit = existing ? getProductLocalPrice(existing, market) : priceLocal;
    const nextQtyOffers = scaleQtyOfferMarketPrices(
      qtyOffers,
      market,
      oldUnit,
      priceLocal
    );

    // Pin local shelf price for this product's market
    const elevadorLock = /^prod-mattress-lifter-([a-z]{2})$/i.exec(
      existing?.id || ""
    );
    const lockedMarket = elevadorLock
      ? (elevadorLock[1].toUpperCase() as CountryCode)
      : null;
    const saveMarket =
      lockedMarket && isStoreMarket(lockedMarket) ? lockedMarket : market;
    const marketPriceMap: Partial<Record<CountryCode, number>> = lockedMarket
      ? { [saveMarket]: priceLocal }
      : {
          ...(existing?.marketPrices ?? {}),
          [saveMarket]: priceLocal,
        };

    const lockedCategoryId = lockedMarket
      ? `cat-${lockedMarket}`
      : categoryId || categories[0]?.id || "";

    const data = {
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim(),
      descriptionAr: descriptionAr.trim() || `<p>${plainAr}</p>`,
      descriptionEn: descriptionEn.trim() || `<p>${plainEn}</p>`,
      detailsAr: existing?.detailsAr ?? [],
      detailsEn: existing?.detailsEn ?? [],
      priceUSD,
      compareAtUSD: existing?.compareAtUSD,
      marketPrices: marketPriceMap,
      marketComparePrices: lockedMarket
        ? existing?.marketComparePrices?.[saveMarket] != null
          ? { [saveMarket]: existing.marketComparePrices[saveMarket] }
          : existing?.marketComparePrices
        : existing?.marketComparePrices,
      availableIn: lockedMarket
        ? [saveMarket]
        : existing?.availableIn,
      colors: [],
      customColorEnabled,
      categoryId: lockedCategoryId,
      images: nextImages,
      slug: lockedMarket
        ? existing?.slug || "elevador-de-colchon"
        : (slug || slugify(nameEn || nameAr)).trim(),
      featured,
      inStock,
      qtyOffers: nextQtyOffers.length ? nextQtyOffers : undefined,
      rating: existing?.rating ?? 4.5,
      reviewCount: existing?.reviewCount ?? 0,
      landing: existing?.landing,
    };

    if (!data.nameAr || !data.nameEn || !data.categoryId) {
      window.alert(
        locale === "ar"
          ? "أكمل الاسم والتصنيف"
          : locale === "es"
            ? "Completa nombre y categoría"
            : "Fill name and category"
      );
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const newId = addProduct(data);
        if (!newId) {
          window.alert(
            locale === "ar"
              ? "تعذّر الحفظ في المتصفح — أفرغ مساحة التخزين أو أعد المحاولة"
              : "Could not save in the browser — free storage space or retry"
          );
          return;
        }
        setQtyOffers(nextQtyOffers);
        setLocalPrice(String(Math.round(priceLocal * 1000) / 1000));
        const server = await persistCatalog();
        if (!server.ok) {
          window.alert(
            locale === "ar"
              ? server.error === "missing_blob_token"
                ? "حُفظ في المتصفح فقط — أضف BLOB_READ_WRITE_TOKEN في Vercel للحفظ الدائم"
                : "حُفظ محلياً لكن فشل الحفظ على السيرفر — أعد المحاولة"
              : server.error === "missing_blob_token"
                ? "Saved in browser only — add BLOB_READ_WRITE_TOKEN on Vercel for durable saves"
                : "Saved locally but server save failed — retry"
          );
        }
        setFlash(
          locale === "ar"
            ? server.ok
              ? "تم الحفظ ✓ الثمن محفوظ"
              : "حُفظ محلياً فقط ⚠ — الزوار ما غايشوفو الثمن الجديد"
            : locale === "es"
              ? server.ok
                ? "Guardado ✓ precio fijado"
                : "Solo en este navegador ⚠ — los visitantes no verán el precio"
              : server.ok
                ? "Saved ✓ price locked in"
                : "Saved locally only ⚠ — visitors will not see the new price"
        );
        window.setTimeout(() => setFlash(""), 4000);
        loadedForIdRef.current = newId;
        router.replace(`/admin/product/${newId}`);
        return;
      }
      const ok = updateProduct(id, data);
      if (!ok) {
        window.alert(
          locale === "ar"
            ? "تعذّر الحفظ في المتصفح — أفرغ مساحة التخزين أو أعد المحاولة"
            : "Could not save in the browser — free storage space or retry"
        );
        return;
      }
      setQtyOffers(nextQtyOffers);
      setLocalPrice(String(Math.round(priceLocal * 1000) / 1000));
      const server = await persistCatalog();
      if (!server.ok) {
        window.alert(
          locale === "ar"
            ? server.error === "missing_blob_token"
              ? "حُفظ في المتصفح فقط — أضف BLOB_READ_WRITE_TOKEN في Vercel (Storage → Blob) باش الثمن يبقا ثابت للجميع"
              : server.error === "unauthorized"
                ? "سجّل دخول لوحة التحكم من جديد — الثمن ما تحفظش على السيرفر"
                : "حُفظ محلياً لكن فشل الحفظ على السيرفر — أعد المحاولة"
            : server.error === "missing_blob_token"
              ? "Saved in browser only — add BLOB_READ_WRITE_TOKEN on Vercel so prices persist for everyone"
              : server.error === "unauthorized"
                ? "Log in to admin again — price was not saved to the server"
                : "Saved locally but server save failed — retry"
        );
      }
      setFlash(
        locale === "ar"
          ? server.ok
            ? "تم الحفظ ✓ الثمن محفوظ للجميع"
            : "حُفظ محلياً فقط ⚠ — الزوار ما غايشوفو الثمن الجديد"
          : locale === "es"
            ? server.ok
              ? "Guardado ✓ precio visible para todos"
              : "Solo en este navegador ⚠ — los visitantes no verán el precio"
            : server.ok
              ? "Saved ✓ price visible for everyone"
              : "Saved locally only ⚠ — visitors will not see the new price"
      );
      window.setTimeout(() => setFlash(""), 4000);
    } catch (err) {
      console.error(err);
      window.alert(
        locale === "ar"
          ? "فشل الحفظ"
          : locale === "es"
            ? "Error al guardar"
            : "Save failed"
      );
    } finally {
      setSaving(false);
    }
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
            href={previewHref}
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
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {t.admin.save}
          </button>
        </div>
      </div>
      {flash ? (
        <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
          {flash}
        </p>
      ) : null}

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

        <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-50/50 p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-bold text-ink-900">
            {locale === "ar" ? "صور وفيديوهات المنتج (GIF)" : "Product media"}
          </h2>
          <ProductMediaGallery
            product={
              {
                id: existing?.id ?? "draft",
                slug: previewSlug || "draft",
                categoryId: categoryId || "",
                nameAr: nameAr || "منتج",
                nameEn: nameEn || "Product",
                descriptionAr: "",
                descriptionEn: "",
                detailsAr: [],
                detailsEn: [],
                priceUSD: 0,
                images,
                inStock: true,
                featured: false,
                rating: 5,
                reviewCount: 0,
                createdAt: new Date().toISOString(),
              } satisfies Product
            }
            locale={locale}
            activeImg={activeImg}
            onSelect={setActiveImg}
            editable
            onUploaded={(url) => {
              setImages((prev) => {
                const next = [...prev, url];
                setActiveImg(next.length - 1);
                return next;
              });
            }}
            onReplace={(index, url) => {
              setImages((prev) =>
                prev.map((u, i) => (i === index ? url : u))
              );
              setActiveImg(index);
            }}
            onDelete={(index) => {
              if (images.length <= 1) {
                window.alert(
                  locale === "ar"
                    ? "يجب الإبقاء على صورة واحدة على الأقل"
                    : "Keep at least one image"
                );
                return;
              }
              setImages((prev) => prev.filter((_, i) => i !== index));
              setActiveImg((cur) => {
                if (cur === index) return Math.max(0, index - 1);
                if (cur > index) return cur - 1;
                return cur;
              });
            }}
          />
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

      {!isNew && existing ? (
        <div
          id="upsell"
          className="mt-6 scroll-mt-24 rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/60 to-white p-5 shadow-sm sm:p-6"
        >
          <ProductQtyOffersEditor
            product={existing}
            categories={categories}
            locale={locale}
            qtyOffers={qtyOffers}
            onChange={setQtyOffers}
          />
        </div>
      ) : null}

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
          href={previewHref}
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
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {t.admin.save}
        </button>
      </div>
    </div>
  );
}
