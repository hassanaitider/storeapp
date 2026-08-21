import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_COUNTRY, isValidCountry } from "@/lib/countries";
import type { CountryCode } from "@/lib/types";

export async function GET() {
  try {
    const headerStore = await headers();
    const cookieStore = await cookies();

    const fromHeader =
      headerStore.get("x-vercel-ip-country") ||
      headerStore.get("cf-ipcountry") ||
      "";

    const fromCookie = cookieStore.get("geo-country")?.value || "";

    let country: CountryCode = DEFAULT_COUNTRY;
    let source: "vercel" | "cloudflare" | "cookie" | "default" = "default";

    if (isValidCountry(fromHeader)) {
      country = fromHeader.toUpperCase() as CountryCode;
      source = headerStore.get("x-vercel-ip-country") ? "vercel" : "cloudflare";
    } else if (isValidCountry(fromCookie)) {
      country = fromCookie.toUpperCase() as CountryCode;
      source = "cookie";
    }

    // Do NOT call slow external IP APIs — they hang and freeze the dashboard.
    return NextResponse.json({ country, source });
  } catch {
    return NextResponse.json({
      country: DEFAULT_COUNTRY,
      source: "default",
    });
  }
}
