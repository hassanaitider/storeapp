"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import ProductPage from "@/app/product/[slug]/page";
import { useStore } from "@/context/StoreContext";
import { isStoreMarket } from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

/** /{country}/product/{slug} — the market comes from the URL, never from a fallback listing. */
export default function CountryProductPage() {
  const params = useParams();
  const code = String(params.country ?? "").toUpperCase();
  const valid = isStoreMarket(code);
  const { country, setViewCountry } = useStore();
  // Render only once the store shows this market, so the page never resolves another country's listing.
  const [readyFor, setReadyFor] = useState<string | null>(
    country === code ? code : null
  );

  useEffect(() => {
    if (!valid) return;
    setViewCountry(code as CountryCode);
    setReadyFor(code);
  }, [valid, code, setViewCountry]);

  if (!valid) notFound();
  if (readyFor !== code) return null;
  return <ProductPage />;
}
