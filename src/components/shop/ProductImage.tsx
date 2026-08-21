"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function isGifUrl(url: string) {
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".gif") ||
    clean.includes("image/gif") ||
    clean.includes("data:image/gif")
  );
}

/** Prefer a still for cards/cart — GIFs stay in the product gallery */
export function productCoverSrc(images: string[] | undefined | null): string {
  const list = (images ?? []).filter(Boolean);
  const still = list.find((u) => !isGifUrl(u));
  return still || list[0] || "/products/car-vacuum.png";
}

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Fill a `relative` parent (like next/image fill) */
  fill?: boolean;
  priority?: boolean;
};

/**
 * Native img for reliable local/static/data/GIF display (avoids next/image blanks).
 */
export function ProductImage({
  src,
  alt,
  className,
  fill,
  priority,
}: Props) {
  const [current, setCurrent] = useState(src);
  const fallback = "/products/car-vacuum.png";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current || fallback}
      alt={alt}
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
