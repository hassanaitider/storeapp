import type { CapiUserData } from "@/lib/meta-capi";
import { getCountry, isValidCountry } from "@/lib/countries";

function header(request: Request, name: string): string | undefined {
  const raw = request.headers.get(name)?.trim();
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function countryCode(value: string | undefined): string | undefined {
  const code = value?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : undefined;
}

/** Meta `ph`: digits only, with the country calling code, no leading 0 / 00. */
function phoneWithCountryCode(phone: string | undefined, country?: string) {
  let digits = phone?.replace(/\D/g, "") ?? "";
  if (!digits) return undefined;
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (!country || !isValidCountry(country)) return digits;
  const dial = getCountry(country).dial.replace(/\D/g, "");
  if (phone?.trim().startsWith("+") || digits.startsWith(dial)) return digits;
  return dial + digits.replace(/^0+/, "");
}

/**
 * Checkout sends "Dept / Municipio / Poblado" or "Colonia, Municipio, Estado" / "City, Province";
 * Meta `ct` wants the city alone: lowercase a–z, no accents, spaces or punctuation.
 */
function cityName(city: string | undefined) {
  if (!city?.trim()) return undefined;
  const parts = city.split(city.includes(" / ") ? " / " : ",").map((p) => p.trim()).filter(Boolean);
  const pick = parts.length >= 3 || city.includes(" / ") ? parts[1] ?? parts[0] : parts[0];
  const clean = pick
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
  return clean || undefined;
}

/** Raw shopper data → values ready for SHA-256 in `sendMetaCapiEvents`; IP geo fills ct/country when absent. */
export function normalizeCapiUserData(
  raw: CapiUserData,
  request: Request
): CapiUserData {
  const country = countryCode(raw.country) ?? countryCode(header(request, "x-vercel-ip-country"));
  return {
    ...raw,
    email: raw.email?.trim().toLowerCase() || undefined,
    phone: phoneWithCountryCode(raw.phone, country),
    city: cityName(raw.city) ?? cityName(header(request, "x-vercel-ip-city")),
    country: country?.toLowerCase(),
  };
}
