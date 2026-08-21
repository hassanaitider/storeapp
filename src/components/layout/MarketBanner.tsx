"use client";

import { MapPin } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { STORE_MARKETS, getCountry } from "@/lib/countries";
import { getCurrency } from "@/lib/currency";
import type { CountryCode } from "@/lib/types";

export function MarketBanner() {
  const { locale, country, currency, setCountry, geoReady, hydrated } =
    useStore();
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
              سوقك الحالي:{" "}
              <strong>
                {c.flag} {c.nameAr}
              </strong>{" "}
              — العملة:{" "}
              <strong>
                {cur.nameAr} ({cur.symbol})
              </strong>
              {!geoReady ? " …" : ""}
            </>
          ) : (
            <>
              Current market:{" "}
              <strong>
                {c.flag} {c.nameEn}
              </strong>{" "}
              — Currency:{" "}
              <strong>
                {cur.nameEn} ({cur.symbol})
              </strong>
              {!geoReady ? " …" : ""}
            </>
          )}
        </p>
        <label className="ms-auto flex items-center gap-2 text-sm">
          <span className="hidden text-brand-100 sm:inline">
            {locale === "ar" ? "غيّر الدولة" : "Change country"}
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryCode, true)}
            className="rounded-md border-0 bg-white px-2 py-1.5 text-sm font-medium text-ink-900"
          >
            {STORE_MARKETS.map((item) => (
              <option key={item.code} value={item.code}>
                {item.flag} {locale === "ar" ? item.nameAr : item.nameEn} ·{" "}
                {item.currency}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
