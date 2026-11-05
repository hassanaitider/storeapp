import { NextResponse } from "next/server";
import {
  sendMetaCapiEvents,
  type CapiCustomData,
  type CapiUserData,
} from "@/lib/meta-capi";
import { getCapiTargets } from "@/lib/meta-config";
import { normalizeCapiUserData } from "./user-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FbCapiBody = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  pixel_id?: string;
  pixel_ids?: string[];
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
  let body: FbCapiBody;
  try {
    body = (await request.json()) as FbCapiBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Each token belongs to one pixel; events go to every pixel that has a token.
  const targets = getCapiTargets(
    body.pixel_ids?.length ? body.pixel_ids : body.pixel_id ? [body.pixel_id] : null
  );
  if (!targets.length) {
    return NextResponse.json({ ok: true, skipped: "no_token_for_pixel" });
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
  const userData: CapiUserData = normalizeCapiUserData(
    {
      ...rawUser,
      fbp: rawUser.fbp || cookieFromRequest(request, "_fbp"),
      fbc: rawUser.fbc || cookieFromRequest(request, "_fbc"),
      clientIpAddress: clientIp(request),
      clientUserAgent: request.headers.get("user-agent") || undefined,
    },
    request
  );

  const results = await Promise.all(
    targets.map((target) =>
      sendMetaCapiEvents(
        [
          {
            eventName,
            eventId,
            eventSourceUrl: body.event_source_url || body.eventSourceUrl,
            userData,
            customData: body.custom_data || body.customData,
          },
        ],
        target
      )
    )
  );

  const failed = results.filter((r) => !r.ok);
  if (failed.length === results.length) {
    const first = failed[0];
    console.error("FB CAPI error", first.status, first.body);
    return NextResponse.json(
      { ok: false, error: "capi_failed", detail: first.body },
      { status: first.status || 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    pixels: targets.map((t) => t.pixelId),
    partial: failed.length > 0,
  });
}
