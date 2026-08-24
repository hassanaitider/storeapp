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
  | "cookie"
  | "ip-api"
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
    null
  );
}

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "0.0.0.0") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("169.254.")) {
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
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(
      `https://ipapi.co/${encodeURIComponent(ip)}/country_code/`,
      {
        signal: controller.signal,
        headers: { Accept: "text/plain" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    return normalizeCountry(text);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

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

    let detected: CountryCode | null = fromHeader;
    let source: GeoSource = "default";

    if (fromHeader) {
      source = vercel ? "vercel" : "cloudflare";
    } else if (fromCookie) {
      detected = fromCookie;
      source = "cookie";
    } else {
      const ip = clientIp(headerStore);
      if (ip) {
        const byIp = await lookupCountryByIp(ip);
        if (byIp) {
          detected = byIp;
          source = "ip-api";
        }
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
