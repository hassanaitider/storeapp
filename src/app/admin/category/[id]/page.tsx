"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useT } from "@/hooks/useT";
import { STORE_MARKETS } from "@/lib/countries";
import { slugify } from "@/lib/utils";
import type { CountryCode } from "@/lib/types";

export default function EditCategoryPage() {
  const params = useParams();
  const id = String(params.id ?? "");
  const isNew = id === "new";
  const router = useRouter();
  const t = useT();
  const { locale, categories, addCategory, updateCategory, storageReady } = useStore();
  const existing = useMemo(
    () => (isNew ? null : categories.find((c) => c.id === id) ?? null),
    [categories, id, isNew]
  );

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [country, setCountry] = useState<"" | CountryCode>("");
  const [ready, setReady] = useState(isNew);
  const [flash, setFlash] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) {
      setReady(true);
      return;
    }
    if (!existing) return;
    setNameAr(existing.nameAr);
    setNameEn(existing.nameEn);
    setDescriptionAr(existing.descriptionAr);
    setDescriptionEn(existing.descriptionEn);
    setSlug(existing.slug);
    setImage(existing.image);
    setCountry((existing.country as CountryCode) || "");
    setReady(true);
  }, [existing, isNew]);

  if (!isNew && ready && !existing) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg">التصنيف غير موجود</p>
        <Link href="/admin" className="mt-4 inline-block text-brand-700 underline">
          رجوع
        </Link>
      </div>
    );
  }

  if (!ready) {
    return <div className="p-10 text-center text-sm text-[var(--muted)]">…</div>;
  }

  function saveNow() {
    if (!storageReady) {
      window.alert(locale === "ar" ? "انتظر لحظة… جاري تجهيز الحفظ" : "Please wait… preparing save");
      return;
    }
    const data = {
      nameAr: nameAr.trim(),
      nameEn: nameEn.trim(),
      descriptionAr: descriptionAr.trim(),
      descriptionEn: descriptionEn.trim(),
      slug: (slug || slugify(nameEn || nameAr)).trim(),
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
      country: country || undefined,
    };
    if (!data.nameAr || !data.nameEn) {
      window.alert(locale === "ar" ? "أدخل الاسم بالعربية والإنجليزية" : "Enter Arabic and English names");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const newId = addCategory(data);
        if (!newId) {
          window.alert(
            locale === "ar"
              ? "تعذّر الحفظ في المتصفح — أفرغ مساحة التخزين أو أعد المحاولة"
              : "Could not save in the browser — free storage space or retry"
          );
          return;
        }
        setFlash(locale === "ar" ? "تم الحفظ ✓" : "Saved ✓");
        window.setTimeout(() => setFlash(""), 2500);
        router.replace(`/admin/category/${newId}`);
        return;
      }
      const ok = updateCategory(id, data);
      if (!ok) {
        window.alert(
          locale === "ar"
            ? "تعذّر الحفظ في المتصفح — أفرغ مساحة التخزين أو أعد المحاولة"
            : "Could not save in the browser — free storage space or retry"
        );
        return;
      }
    } catch (err) {
      console.error(err);
      window.alert(locale === "ar" ? "فشل الحفظ" : "Save failed");
      return;
    } finally {
      setSaving(false);
    }
    setFlash(locale === "ar" ? "تم الحفظ ✓" : "Saved ✓");
    window.setTimeout(() => setFlash(""), 2500);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/admin?tab=categories" className="text-sm text-brand-700 hover:underline">
        ← {locale === "ar" ? "رجوع للإدارة" : "Back to admin"}
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900">
        {isNew ? t.admin.addCategory : t.admin.editCategory}
      </h1>
      {flash ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
          {flash}
        </p>
      ) : null}
      <div className="mt-8 space-y-4 rounded-2xl border border-sand-200 bg-white p-6">
        <Field label={t.admin.nameAr} value={nameAr} onChange={setNameAr} required />
        <Field label={t.admin.nameEn} value={nameEn} onChange={setNameEn} required />
        <Field label={t.admin.descriptionAr} value={descriptionAr} onChange={setDescriptionAr} textarea />
        <Field label={t.admin.descriptionEn} value={descriptionEn} onChange={setDescriptionEn} textarea />
        <label className="block text-sm">
          <span className="font-medium">{t.admin.country}</span>
          <select
            className="mt-1 w-full rounded-xl border border-sand-300 px-3 py-2"
            value={country}
            onChange={(e) => setCountry((e.target.value || "") as "" | CountryCode)}
          >
            <option value="">{t.admin.countryNone}</option>
            {STORE_MARKETS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.nameAr} / {c.nameEn}
              </option>
            ))}
          </select>
        </label>
        <Field label={t.admin.slug} value={slug} onChange={setSlug} />
        <Field label={t.admin.image} value={image} onChange={setImage} placeholder="https://..." />
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={saveNow}
            disabled={saving}
            className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {t.admin.save}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin?tab=categories")}
            className="rounded-xl border border-sand-300 px-6 py-3 text-sm font-semibold"
          >
            {t.admin.cancel}
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
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls = "mt-1 w-full rounded-xl border border-sand-300 px-3 py-2";
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      {textarea ? (
        <textarea
          className={cls}
          rows={3}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={cls}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
