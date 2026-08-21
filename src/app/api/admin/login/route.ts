import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "missing_credentials" },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(username, password)) {
      return NextResponse.json(
        { ok: false, error: "invalid_credentials" },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(username);
    const res = NextResponse.json({ ok: true, username });
    res.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "login_failed" }, { status: 500 });
  }
}
