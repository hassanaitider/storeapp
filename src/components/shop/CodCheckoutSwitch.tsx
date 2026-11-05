"use client";

import dynamic from "next/dynamic";
import type { ComponentType, RefObject } from "react";
import {
  formatArgentinaCodPrice,
  formatDominicanCodPrice,
  formatEcuadorCodPrice,
  formatHondurasCodPrice,
  formatLocalAmount,
  formatMexicoCodPrice,
  formatNicaraguaCodPrice,
  formatSalvadorCodPrice,
} from "@/lib/currency";
import { type CodCheckoutKind } from "@/lib/cod-markets";
import type { CountryCode, Locale, Product } from "@/lib/types";

export type CodCheckoutProps = {
  product: Product;
  country: CountryCode;
  qty: number;
  onQtyChange: (qty: number) => void;
  customColor: string;
  onCustomColorChange: (value: string) => void;
  formRef: RefObject<HTMLFormElement | null>;
  warranty: boolean;
  onWarrantyChange: (value: boolean) => void;
  onPlaceOrder: (payload: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  }) => void;
};

/** Geo trees are large — load only the checkout of the active market. */
const CHECKOUTS: Record<CodCheckoutKind, ComponentType<CodCheckoutProps>> = {
  latam: dynamic(
    () => import("@/components/shop/LatamCodCheckout").then((m) => m.LatamCodCheckout),
    { ssr: false }
  ),
  argentina: dynamic(
    () =>
      import("@/components/shop/ArgentinaCodCheckout").then(
        (m) => m.ArgentinaCodCheckout
      ),
    { ssr: false }
  ),
  mexico: dynamic(
    () => import("@/components/shop/MexicoCodCheckout").then((m) => m.MexicoCodCheckout),
    { ssr: false }
  ),
  dominican: dynamic(
    () =>
      import("@/components/shop/DominicanCodCheckout").then(
        (m) => m.DominicanCodCheckout
      ),
    { ssr: false }
  ),
  ecuador: dynamic(
    () => import("@/components/shop/EcuadorCodCheckout").then((m) => m.EcuadorCodCheckout),
    { ssr: false }
  ),
  salvador: dynamic(
    () =>
      import("@/components/shop/SalvadorCodCheckout").then(
        (m) => m.SalvadorCodCheckout
      ),
    { ssr: false }
  ),
  honduras: dynamic(
    () =>
      import("@/components/shop/HondurasCodCheckout").then(
        (m) => m.HondurasCodCheckout
      ),
    { ssr: false }
  ),
  nicaragua: dynamic(
    () =>
      import("@/components/shop/NicaraguaCodCheckout").then(
        (m) => m.NicaraguaCodCheckout
      ),
    { ssr: false }
  ),
};

const KIND_PRICE_FORMAT: Partial<Record<CodCheckoutKind, (amount: number) => string>> = {
  argentina: formatArgentinaCodPrice,
  mexico: formatMexicoCodPrice,
  dominican: formatDominicanCodPrice,
  ecuador: formatEcuadorCodPrice,
  salvador: formatSalvadorCodPrice,
  honduras: formatHondurasCodPrice,
  nicaragua: formatNicaraguaCodPrice,
};

/** Price string in the style of the market's COD form (falls back to the market currency). */
export function formatCodMarketPrice(
  kind: CodCheckoutKind | null,
  amount: number,
  currency: string,
  locale: Locale
): string {
  const format = kind ? KIND_PRICE_FORMAT[kind] : undefined;
  return format ? format(amount) : formatLocalAmount(amount, currency, locale);
}

/** Dedicated geo-aware COD form for a market. */
export function CodCheckout({
  kind,
  ...props
}: CodCheckoutProps & { kind: CodCheckoutKind }) {
  const Checkout = CHECKOUTS[kind];
  return <Checkout {...props} />;
}
