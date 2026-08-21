"use client";

import { sanitizeProductHtml, htmlToPlain } from "@/lib/rich-html";
import { cn } from "@/lib/utils";

export function ProductHtmlBody({
  html,
  className,
  fallback,
}: {
  html: string;
  className?: string;
  fallback?: string;
}) {
  const safe = sanitizeProductHtml(html);
  const plain = htmlToPlain(safe);

  if (!plain && !safe.includes("<img")) {
    if (fallback) {
      return <p className={cn("product-lead", className)}>{fallback}</p>;
    }
    return null;
  }

  // Plain text stored without tags
  if (plain && !/<[a-z]/i.test(safe)) {
    return <p className={cn("product-lead", className)}>{plain}</p>;
  }

  return (
    <div
      className={cn("prose-product product-body", className)}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
