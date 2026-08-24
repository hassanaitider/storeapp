"use client";

import { MapPin } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getCountry } from "@/lib/countries";
import { getCurrency } from "@/lib/currency";

export function MarketBanner() {
  const { locale, country, currency, geoReady, hydrated } = useStore();
  const c = getCountry(country);
  const cur = getCurrency(currency);

  if (!hydrated) return null;

  return (
    <div className="border-b border-brand-200 bg-brand-800 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <MapPin className="h-4 w-4 shrink-0 text-brand-200" />
        <p className="text-sm">
          {locale === "ar" ? (
            <>
              سوقك حسب عنوان الـ IP:{" "}
              <strong>
                {c.flag} {c.nameAr}
              </strong>{" "}
              — نعرض فقط المنتجات المتاحة في دولتك — العملة:{" "}
              <strong>
                {cur.nameAr} ({cur.symbol})
              </strong>
              {!geoReady ? " …" : ""}
            </>
          ) : (
            <>
              Market by IP:{" "}
              <strong>
                {c.flag} {c.nameEn}
              </strong>{" "}
              — only products available in your country — Currency:{" "}
              <strong>
                {cur.nameEn} ({cur.symbol})
              </strong>
              {!geoReady ? " …" : ""}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
