import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SEED_PRODUCTS } from "@/lib/seed";
import { isSpanishMarket, isStoreMarket } from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

type Params = Promise<{ country: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { country, slug } = await params;
  const code = country.toUpperCase() as CountryCode;
  if (!isStoreMarket(code)) return {};
  const product =
    SEED_PRODUCTS.find(
      (p) => p.slug === decodeURIComponent(slug) && p.availableIn?.includes(code)
    ) ?? SEED_PRODUCTS.find((p) => p.slug === decodeURIComponent(slug));
  if (!product) return {};
  const spanish = isSpanishMarket(code);
  const name = spanish ? product.nameEs ?? product.nameEn : product.nameAr;
  const tagline = spanish
    ? "Envío gratis · Pago contra entrega"
    : "توصيل مجاني · الدفع عند الاستلام";
  return {
    title: `${name} — ${tagline}`,
    openGraph: {
      title: name,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default function CountryProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
