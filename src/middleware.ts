import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_COUNTRY, isStoreMarket, isValidCountry } from "./lib/countries";
import {
  ADMIN_COOKIE,
  verifyAdminSessionEdge,
} from "./lib/admin-auth-edge";

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

  const response = NextResponse.next();
  const existing = request.cookies.get("geo-country")?.value;
  if (existing && isValidCountry(existing) && isStoreMarket(existing)) {
    return response;
  }

  const headerCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  const code = headerCountry.toUpperCase();
  if (isValidCountry(code)) {
    const market = isStoreMarket(code) ? code : DEFAULT_COUNTRY;
    response.cookies.set("geo-country", market, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|uploads|products).*)",
  ],
};
