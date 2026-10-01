import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, isStoreMarket, isValidCountry } from "./lib/countries";
import {
  ADMIN_COOKIE,
  verifyAdminSessionEdge,
} from "./lib/admin-auth-edge";

/** Public HTML must not use no-store — it blocks back/forward cache (bfcache). */
function applyDocumentCacheHeaders(
  request: NextRequest,
  response: NextResponse,
  pathname: string
) {
  const accept = request.headers.get("accept") ?? "";
  const isHtmlDocument = accept.includes("text/html");
  if (!isHtmlDocument) return;
  if (pathname.startsWith("/api") || pathname.startsWith("/admin")) return;
  // Next.js defaults to "private, no-cache, no-store, …" on dynamic HTML.
  // Use revalidation without no-store so history navigations can use bfcache.
  response.headers.set(
    "Cache-Control",
    "private, max-age=0, must-revalidate"
  );
}

/**
 * Market a product URL renders in: `/{cc}/product/…`, else legacy `?country=`,
 * else the per-country id suffix (`prod-x-hn`).
 */
function productViewMarket(request: NextRequest): string | null {
  const { pathname, searchParams } = request.nextUrl;
  const prefixed = pathname.match(/^\/([a-z]{2})\/product\/[^/]+\/?$/i)?.[1]?.toUpperCase();
  if (prefixed) return isStoreMarket(prefixed) ? prefixed : null;
  const match = pathname.match(/^\/product\/([^/]+)\/?$/);
  if (!match) return null;
  const query = searchParams.get("country")?.toUpperCase() ?? "";
  if (query && isStoreMarket(query)) return query;
  const suffix = decodeURIComponent(match[1]).match(/-([a-z]{2})$/i)?.[1]?.toUpperCase();
  return suffix && isStoreMarket(suffix) ? suffix : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin UI (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifyAdminSessionEdge(token);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Logged-in users hitting login → dashboard
  if (pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await verifyAdminSessionEdge(token);
    if (ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Legacy /product/{x} whose market is known from the URL → /{cc}/product/{x}
  const legacyProduct = pathname.match(/^\/product\/([^/]+)\/?$/);
  if (legacyProduct) {
    const market = productViewMarket(request);
    if (market) {
      const url = request.nextUrl.clone();
      url.pathname = `/${market.toLowerCase()}/product/${legacyProduct[1]}`;
      url.searchParams.delete("country");
      return NextResponse.redirect(url, 308);
    }
  }

  const existing = request.cookies.get("geo-country")?.value;
  // Do not short-circuit on cookie alone — CDN headers can refresh market
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  const code = headerCountry.toUpperCase();

  // First paint must already use the final market/locale, otherwise the
  // RTL→LTR swap after hydration shifts the whole page (CLS).
  const baseMarket = isValidCountry(code)
    ? isStoreMarket(code)
      ? code
      : DEFAULT_COUNTRY
    : existing && isValidCountry(existing.toUpperCase()) && isStoreMarket(existing.toUpperCase())
      ? existing.toUpperCase()
      : DEFAULT_COUNTRY;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-store-market", baseMarket);
  const viewMarket = productViewMarket(request);
  if (viewMarket) requestHeaders.set("x-store-view-market", viewMarket);
  else requestHeaders.delete("x-store-view-market");

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  applyDocumentCacheHeaders(request, response, pathname);

  if (isValidCountry(code)) {
    const market = isStoreMarket(code) ? code : DEFAULT_COUNTRY;
    if (existing !== market) {
      response.cookies.set("geo-country", market, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
  } else if (!existing || !isValidCountry(existing) || !isStoreMarket(existing)) {
    // Leave cookie unset; /api/geo + client IP will resolve on load
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|uploads|products).*)",
  ],
};
