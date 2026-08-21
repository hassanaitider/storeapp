"use client";

import { useStore } from "@/context/StoreContext";
import { getDictionary } from "@/lib/i18n";

export function useT() {
  const { locale } = useStore();
  return getDictionary(locale);
}

export function useLocale() {
  const { locale, setLocale, currency, setCurrency } = useStore();
  return { locale, setLocale, currency, setCurrency, isRtl: locale === "ar" };
}
