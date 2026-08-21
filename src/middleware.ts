import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidCountry } from "./lib/countries";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const existing = request.cookies.get("geo-country")?.value;
  if (existing && isValidCountry(existing)) {
    return response;
  }

  const headerCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  const code = headerCountry.toUpperCase();
  if (isValidCountry(code)) {
    response.cookies.set("geo-country", code, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|uploads|products|api/upload).*)",
  ],
};
