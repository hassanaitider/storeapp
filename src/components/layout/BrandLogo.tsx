"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import { BRAND_LOGO_SRC } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
  variant?: "light" | "dark";
};

/** Heights keep the full wordmark readable; no opaque plate behind the mark */
const SIZE_MAP = {
  sm: { box: "h-11 w-auto max-w-[9.5rem] sm:h-12 sm:max-w-[11rem]", img: 48 },
  md: { box: "h-12 w-auto max-w-[11rem] sm:h-14 sm:max-w-[13rem]", img: 56 },
  lg: { box: "h-14 w-auto max-w-[13rem] sm:h-16 sm:max-w-[15rem]", img: 64 },
} as const;

export function BrandLogo({
  className,
  showTagline = false,
  size,
  compact = false,
  variant = "light",
}: Props) {
  const t = useT();
  const dark = variant === "dark";
  const key = size ?? (compact ? "sm" : "md");
  const dim = SIZE_MAP[key];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 leading-none",
        className
      )}
      aria-label={t.brand}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center bg-transparent transition group-hover:scale-[1.02]",
          dark && "rounded-xl bg-white/92 px-2 py-1 shadow-sm",
          dim.box
        )}
      >
        <Image
          src={BRAND_LOGO_SRC}
          alt={t.brand}
          width={dim.img * 4}
          height={dim.img}
          className="h-full w-auto max-w-full object-contain object-right"
          priority
          unoptimized
        />
      </span>

      {showTagline ? (
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              "font-display font-semibold tracking-tight transition",
              dark
                ? "text-white group-hover:text-brand-100"
                : "text-brand-800 group-hover:text-brand-600",
              compact ? "text-lg" : "text-xl sm:text-2xl"
            )}
          >
            {t.brand}
          </span>
          <span
            className={cn(
              "mt-0.5 truncate text-[10px] font-medium tracking-[0.12em] sm:text-[11px]",
              dark ? "text-brand-300" : "text-brand-500"
            )}
          >
            {t.brandTagline}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
