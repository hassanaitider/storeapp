"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function isGifUrl(url: string) {
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".gif") ||
    clean.includes("image/gif") ||
    clean.includes("data:image/gif") ||
    // Animated product demos converted from GIF → WebP
    /-demo\.webp$/i.test(clean)
  );
}

/** Prefer a still for cards/cart — GIFs stay in the product gallery */
export function productCoverSrc(images: string[] | undefined | null): string {
  const list = (images ?? []).filter(Boolean);
  const still = list.find((u) => !isGifUrl(u));
  return still || list[0] || "/products/car-vacuum.webp";
}

/** Default intrinsic ratio for product stills (reserves space before load). */
export const PRODUCT_MEDIA_WIDTH = 1200;
export const PRODUCT_MEDIA_HEIGHT = 1200;

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Fill a `relative` parent (like next/image fill) */
  fill?: boolean;
  priority?: boolean;
  /** Intrinsic width hint for CLS (defaults to square product media). */
  width?: number;
  /** Intrinsic height hint for CLS (defaults to square product media). */
  height?: number;
};

/**
 * Native img for reliable local/static/data/GIF display (avoids next/image blanks).
 * Always emits width/height so the browser can reserve aspect-ratio before paint.
 */
export function ProductImage({
  src,
  alt,
  className,
  fill,
  priority,
  width = PRODUCT_MEDIA_WIDTH,
  height = PRODUCT_MEDIA_HEIGHT,
}: Props) {
  const [current, setCurrent] = useState(src);
  const fallback = "/products/car-vacuum.webp";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current || fallback}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className={cn(
        fill && "absolute inset-0 h-full w-full",
        className
      )}
    />
  );
}
