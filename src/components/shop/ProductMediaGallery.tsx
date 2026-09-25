"use client";

import Image from "next/image";
import { Film, ImageIcon, Trash2, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";
import { useT } from "@/hooks/useT";
import {
  ImageUploadButton,
  needsUnoptimizedImage,
  uploadMediaFile,
} from "@/components/shop/ImageUploadButton";
import { pickText } from "@/lib/localized";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/lib/types";

export function isGifUrl(url: string) {
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".gif") ||
    clean.includes("image/gif") ||
    // Animated product demos converted from GIF → WebP
    /-demo\.webp$/i.test(clean)
  );
}

/** Prefer a still for LCP — multi-MB GIFs stay out of the first paint. */
export function preferredMediaIndex(images: string[] | undefined): number {
  const list = images ?? [];
  const still = list.findIndex((u) => Boolean(u) && !isGifUrl(u));
  if (still >= 0) return still;
  const any = list.findIndex(Boolean);
  return any >= 0 ? any : 0;
}

export function splitProductMedia(images: string[]) {
  const gifs: { url: string; index: number }[] = [];
  const stills: { url: string; index: number }[] = [];
  images.forEach((url, index) => {
    if (isGifUrl(url)) gifs.push({ url, index });
    else stills.push({ url, index });
  });
  return { gifs, stills };
}

type Props = {
  product: Product;
  locale: Locale;
  activeImg: number;
  onSelect: (index: number) => void;
  /** Admin only — visitors never see upload/replace/delete */
  editable?: boolean;
  onUploaded?: (url: string) => void;
  onReplace?: (index: number, url: string) => void;
  onDelete?: (index: number) => void;
  discount?: number;
};

function MediaActions({
  onReplace,
  onDelete,
  confirmLabel,
  replaceLabel,
  deleteLabel,
  size = "sm",
}: {
  onReplace: (file: File) => void | Promise<void>;
  onDelete: () => void;
  confirmLabel: string;
  replaceLabel: string;
  deleteLabel: string;
  size?: "sm" | "md";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      await onReplace(file);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const btn = size === "sm" ? "h-7 w-7 rounded-lg" : "h-9 w-9 rounded-xl";

  return (
    <div
      className="absolute end-1.5 top-1.5 z-20 flex gap-1"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        disabled={busy}
        title={replaceLabel}
        aria-label={replaceLabel}
        className={cn(
          "inline-flex items-center justify-center border border-white/80 bg-white/95 text-brand-700 shadow-sm backdrop-blur-sm transition hover:bg-brand-50 disabled:opacity-60",
          btn
        )}
        onClick={() => inputRef.current?.click()}
      >
        <RefreshCw className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      </button>
      <button
        type="button"
        title={deleteLabel}
        aria-label={deleteLabel}
        className={cn(
          "inline-flex items-center justify-center border border-white/80 bg-white/95 text-red-600 shadow-sm backdrop-blur-sm transition hover:bg-red-50",
          btn
        )}
        onClick={() => {
          if (window.confirm(confirmLabel)) onDelete();
        }}
      >
        <Trash2 className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="*/*"
        className="hidden"
        onChange={(e) => void pick(e.target.files?.[0])}
      />
    </div>
  );
}

export function ProductMediaGallery({
  product,
  locale,
  activeImg,
  onSelect,
  editable = false,
  onUploaded,
  onReplace,
  onDelete,
  discount = 0,
}: Props) {
  const t = useT();
  const { gifs, stills } = splitProductMedia(product.images);
  const activeUrl = product.images[activeImg] ?? product.images[0];
  const activeIsGif = activeUrl ? isGifUrl(activeUrl) : false;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const canEdit = Boolean(editable && onUploaded && onReplace && onDelete);

  const replaceFile = async (index: number, file: File) => {
    if (!onReplace) return;
    try {
      const url = await uploadMediaFile(file);
      onReplace(index, url);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return (
    <div className="space-y-8">
      {lightboxOpen && activeUrl ? (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightboxOpen(false);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeUrl}
            alt={pickText(product, "name", locale)}
            width={1200}
            height={1200}
            className={activeIsGif ? "media-full--gif" : undefined}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}

      <section aria-label={t.product.mediaHero}>
        {canEdit ? (
          <p className="product-label mb-3">{t.product.mediaHero}</p>
        ) : null}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[1.35rem] border border-sand-200 bg-white shadow-sm",
            "media-slot media-slot--hero min-h-[16rem] sm:min-h-[22rem]"
          )}
        >
          {activeUrl ? (
            <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-4">
              <button
                type="button"
                className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
                onClick={() => setLightboxOpen(true)}
                aria-label={
                  locale === "ar"
                    ? "عرض بالحجم الكامل"
                    : locale === "es"
                      ? "Ver a tamaño completo"
                      : "View full size"
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeUrl}
                  alt={pickText(product, "name", locale)}
                  width={1200}
                  height={1200}
                  className={cn(
                    "media-full max-h-[min(90vh,56rem)] w-full",
                    activeIsGif && "media-full--gif"
                  )}
                  decoding="async"
                  loading="eager"
                />
              </button>
              {discount > 0 && (
                <span className="pointer-events-none absolute start-4 top-4 rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-bold text-white">
                  {t.product.save} {discount}%
                </span>
              )}
              {activeIsGif && (
                <span className="pointer-events-none absolute end-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-ink-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  <Film className="h-3.5 w-3.5" />
                  GIF
                </span>
              )}
              {canEdit ? (
                <>
                  <MediaActions
                    size="md"
                    replaceLabel={t.product.replaceMedia}
                    deleteLabel={t.product.deleteMedia}
                    confirmLabel={t.product.deleteMediaConfirm}
                    onReplace={(file) => void replaceFile(activeImg, file)}
                    onDelete={() => onDelete!(activeImg)}
                  />
                  <div className="absolute end-4 bottom-4 z-10">
                    <ImageUploadButton
                      size="lg"
                      label={t.product.uploadMedia}
                      onUploaded={onUploaded!}
                    />
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div className="relative flex min-h-[16rem] flex-col items-center justify-center gap-2 text-[var(--muted)]">
              <ImageIcon className="h-10 w-10 opacity-40" />
              {canEdit ? (
                <div className="absolute end-4 bottom-4 z-10">
                  <ImageUploadButton
                    size="lg"
                    label={t.product.uploadMedia}
                    onUploaded={onUploaded!}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
        {activeUrl ? (
          <p className="product-caption mt-2">
            {locale === "ar"
              ? "اضغط على الصورة أو الـ GIF لعرضها بوضوح بالحجم الكامل"
              : "Tap the image or GIF to view it full size clearly"}
          </p>
        ) : null}
      </section>

      {(stills.length > 0 || canEdit) && (
        <section aria-label={t.product.mediaStills}>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="product-label">{t.product.mediaStills}</p>
              {canEdit ? (
                <p className="product-caption mt-1">
                  {locale === "ar"
                    ? "اضغط للعرض · استبدال أو مسح من الأيقونات"
                    : "Tap to view · replace or delete from icons"}
                </p>
              ) : null}
            </div>
            {canEdit ? (
              <ImageUploadButton size="sm" onUploaded={onUploaded!} />
            ) : null}
          </div>

          {stills.length === 0 ? (
            canEdit ? (
              <div className="flex min-h-[6.5rem] items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-4 text-center">
                <p className="product-caption">
                  {locale === "ar"
                    ? "مكان مخصص لصور المنتج — ارفع صورة من الزر أعلاه"
                    : "Photo slots — upload from the button above"}
                </p>
              </div>
            ) : null
          ) : (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {stills.map(({ url, index }) => (
                <div
                  key={`still-${index}-${url}`}
                  className={cn(
                    "group relative aspect-square overflow-hidden rounded-xl border-2 bg-sand-100 transition",
                    activeImg === index
                      ? "border-brand-600 ring-2 ring-brand-600/20"
                      : "border-transparent opacity-90 hover:opacity-100"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    className="absolute inset-0"
                    aria-label={`${t.product.mediaStills} ${index + 1}`}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      sizes="(max-width:640px) 25vw, 160px"
                      unoptimized={needsUnoptimizedImage(url)}
                      loading="lazy"
                      className="object-contain p-1"
                    />
                  </button>
                  {canEdit ? (
                    <MediaActions
                      replaceLabel={t.product.replaceMedia}
                      deleteLabel={t.product.deleteMedia}
                      confirmLabel={t.product.deleteMediaConfirm}
                      onReplace={(file) => void replaceFile(index, file)}
                      onDelete={() => onDelete!(index)}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {(gifs.length > 0 || canEdit) && (
        <section aria-label={t.product.mediaGifs}>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="product-label inline-flex items-center gap-2">
                <Film className="h-4 w-4 text-brand-600" />
                {t.product.mediaGifs}
              </p>
              {canEdit ? (
                <p className="product-caption mt-1">{t.product.mediaGifsHint}</p>
              ) : null}
            </div>
            {canEdit ? (
              <ImageUploadButton
                size="sm"
                label="GIF"
                onUploaded={onUploaded!}
              />
            ) : null}
          </div>

          {gifs.length === 0 ? (
            canEdit ? (
              <div className="relative flex min-h-[9rem] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-brand-300/60 bg-[repeating-linear-gradient(-45deg,rgba(63,139,116,0.06),rgba(63,139,116,0.06)_8px,rgba(230,221,208,0.4)_8px,rgba(230,221,208,0.4)_16px)] px-4 text-center">
                <p className="product-caption max-w-xs text-brand-800/80">
                  {locale === "ar"
                    ? "حاوية GIF جاهزة — ارفع ملف .gif لعرض حركة المنتج هنا"
                    : "GIF slot ready — upload a .gif to show motion here"}
                </p>
              </div>
            ) : null
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gifs.map(({ url, index }) => (
                <div
                  key={`gif-${index}-${url}`}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-2xl border-2 bg-sand-100 transition",
                    activeImg === index
                      ? "border-brand-600 ring-2 ring-brand-600/20"
                      : "border-sand-200 hover:border-brand-400"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    className="absolute inset-0"
                    aria-label={`GIF ${index + 1}`}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      unoptimized
                      loading="lazy"
                      className="object-contain p-1"
                      sizes="(max-width:640px) 45vw, 200px"
                    />
                  </button>
                  <span className="pointer-events-none absolute start-2 top-2 rounded bg-ink-900/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    GIF
                  </span>
                  {canEdit ? (
                    <MediaActions
                      replaceLabel={t.product.replaceMedia}
                      deleteLabel={t.product.deleteMedia}
                      confirmLabel={t.product.deleteMediaConfirm}
                      onReplace={(file) => void replaceFile(index, file)}
                      onDelete={() => onDelete!(index)}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
