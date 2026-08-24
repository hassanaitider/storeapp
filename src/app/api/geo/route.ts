import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import {
  DEFAULT_COUNTRY,
  isStoreMarket,
  isValidCountry,
} from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

type GeoSource =
  | "vercel"
  | "cloudflare"
  | "ip-api"
  | "cookie"
  | "default";

function normalizeCountry(raw: string | null | undefined): CountryCode | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (!isValidCountry(code)) return null;
  return code as CountryCode;
}

/** Map any detected ISO country to an active store market when possible. */
function toStoreMarket(code: CountryCode): CountryCode {
  return isStoreMarket(code) ? code : DEFAULT_COUNTRY;
}

function clientIp(headerStore: Headers): string | null {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    headerStore.get("x-real-ip") ||
    headerStore.get("cf-connecting-ip") ||
    headerStore.get("true-client-ip") ||
    null
  );
}

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "0.0.0.0") return true;
  if (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.")
  ) {
    return true;
  }
  const m = /^172\.(\d+)\./.exec(ip);
  if (m) {
    const second = Number(m[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

async function lookupCountryByIp(ip: string): Promise<CountryCode | null> {
  if (isPrivateIp(ip)) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  try {
    // Primary: ipapi.co
    const res = await fetch(
      `https://ipapi.co/${encodeURIComponent(ip)}/country_code/`,
      {
        signal: controller.signal,
        headers: { Accept: "text/plain" },
        cache: "no-store",
      }
    );
    if (res.ok) {
      const text = (await res.text()).trim();
      const code = normalizeCountry(text);
      if (code) return code;
    }
  } catch {
    /* try fallback */
  }

  try {
    // Fallback: ipwho.is
    const res = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}?fields=country_code,success`,
      {
        signal: controller.signal,
        cache: "no-store",
      }
    );
    if (res.ok) {
      const data = (await res.json()) as {
        success?: boolean;
        country_code?: string;
      };
      if (data.success !== false) {
        return normalizeCountry(data.country_code);
      }
    }
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }

  return null;
}

/**
 * Resolve visitor country from IP on every request.
 * Priority: CDN geo headers → live IP lookup → cookie → default.
 */
export async function GET() {
  try {
    const headerStore = await headers();
    const cookieStore = await cookies();

    const vercel = headerStore.get("x-vercel-ip-country");
    const cloudflare = headerStore.get("cf-ipcountry");
    const fromHeader = normalizeCountry(vercel || cloudflare);
    const fromCookie = normalizeCountry(
      cookieStore.get("geo-country")?.value
    );

    let detected: CountryCode | null = null;
    let source: GeoSource = "default";

    if (fromHeader) {
      detected = fromHeader;
      source = vercel ? "vercel" : "cloudflare";
    } else {
      const ip = clientIp(headerStore);
      if (ip) {
        const byIp = await lookupCountryByIp(ip);
        if (byIp) {
          detected = byIp;
          source = "ip-api";
        }
      }

      // Cookie only as last resort (may be stale from another network)
      if (!detected && fromCookie) {
        detected = fromCookie;
        source = "cookie";
      }
    }

    const country = toStoreMarket(detected ?? DEFAULT_COUNTRY);

    const response = NextResponse.json({
      country,
      detected: detected ?? null,
      source,
      isStoreMarket: isStoreMarket(country),
    });

    response.cookies.set("geo-country", country, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    return response;
  } catch {
    return NextResponse.json({
      country: DEFAULT_COUNTRY,
      detected: null,
      source: "default" as GeoSource,
      isStoreMarket: true,
    });
  }
}
