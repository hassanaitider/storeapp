import { NextResponse } from "next/server";
import {
  sendMetaCapiEvents,
  type CapiCustomData,
  type CapiUserData,
} from "@/lib/meta-capi";
import { getMetaCapiAccessToken } from "@/lib/meta-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FbCapiBody = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  user_data?: {
    fbp?: string;
    fbc?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    externalId?: string;
  };
  custom_data?: CapiCustomData;
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  userData?: FbCapiBody["user_data"];
  customData?: CapiCustomData;
};

function clientIp(request: Request): string | undefined {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

function cookieFromRequest(request: Request, name: string): string | undefined {
  const raw = request.headers.get("cookie") || "";
  const match = raw.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Facebook Conversions API — POST /api/fb-capi
 * Production only (no test_event_code).
 * Graph: v19.0 / {FB_PIXEL_ID}/events
 */
export async function POST(request: Request) {
  if (!getMetaCapiAccessToken()) {
    return NextResponse.json(
      {
        ok: false,
        error: "capi_not_configured",
        hint: "Set FB_CAPI_TOKEN in .env.local and Vercel env, then redeploy",
      },
      { status: 503 }
    );
  }

  let body: FbCapiBody;
  try {
    body = (await request.json()) as FbCapiBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const eventName = (body.event_name || body.eventName)?.trim();
  const eventId = (body.event_id || body.eventId)?.trim();
  if (!eventName || !eventId) {
    return NextResponse.json(
      { ok: false, error: "event_name and event_id required" },
      { status: 400 }
    );
  }

  const rawUser = body.user_data || body.userData || {};
  const userData: CapiUserData = {
    ...rawUser,
    fbp: rawUser.fbp || cookieFromRequest(request, "_fbp"),
    fbc: rawUser.fbc || cookieFromRequest(request, "_fbc"),
    clientIpAddress: clientIp(request),
    clientUserAgent: request.headers.get("user-agent") || undefined,
  };

  const result = await sendMetaCapiEvents([
    {
      eventName,
      eventId,
      eventSourceUrl: body.event_source_url || body.eventSourceUrl,
      userData,
      customData: body.custom_data || body.customData,
    },
  ]);

  if (!result.ok) {
    console.error("FB CAPI error", result.status, result.body);
    return NextResponse.json(
      { ok: false, error: "capi_failed", detail: result.body },
      { status: result.status || 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    facebook: result.body,
  });
}
