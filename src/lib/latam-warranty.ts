import { currencyForCountry } from "./countries";
import { formatLocalAmount, getCurrency } from "./currency";
import type { CountryCode } from "./types";

export const WARRANTY_USD_PER_UNIT = 2;
export const WARRANTY_MONTHS = 6;

/** $2 per piece in the market's currency, rounded to a clean shelf figure. */
export function warrantyUnitLocal(country: CountryCode): number {
  const code = currencyForCountry(country);
  if (code === "USD") return WARRANTY_USD_PER_UNIT;
  const raw = WARRANTY_USD_PER_UNIT * (getCurrency(code).rate || 1);
  if (raw >= 1000) return Math.round(raw / 100) * 100;
  if (raw >= 100) return Math.round(raw / 10) * 10;
  return Math.round(raw);
}

export function warrantyUnitLabel(country: CountryCode): string {
  return formatLocalAmount(warrantyUnitLocal(country), currencyForCountry(country), "es");
}

/** Line added to the order notes so the warehouse sees the warranty. */
export function warrantyOrderNote(country: CountryCode, qty: number): string {
  const total = formatLocalAmount(
    warrantyUnitLocal(country) * qty,
    currencyForCountry(country),
    "es"
  );
  return `Garantía ${WARRANTY_MONTHS} meses: sí (${qty} × ${warrantyUnitLabel(country)} = ${total})`;
}
