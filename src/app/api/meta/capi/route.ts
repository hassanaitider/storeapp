import { NextResponse } from "next/server";
import {
  sendMetaCapiEvents,
  type CapiCustomData,
  type CapiUserData,
} from "@/lib/meta-capi";
import { getMetaCapiAccessToken } from "@/lib/meta-config";
import { normalizeCapiUserData } from "../../fb-capi/user-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  eventName?: string;
  eventId?: string;
  event_name?: string;
  event_id?: string;
  eventSourceUrl?: string;
  event_source_url?: string;
  customData?: CapiCustomData;
  custom_data?: CapiCustomData;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    externalId?: string;
    fbp?: string;
    fbc?: string;
  };
  user_data?: Body["userData"];
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

/** Legacy alias — prefer POST /api/fb-capi */
export async function POST(request: Request) {
  if (!getMetaCapiAccessToken()) {
    return NextResponse.json(
      { ok: false, error: "capi_not_configured" },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const eventName = (body.eventName || body.event_name)?.trim();
  const eventId = (body.eventId || body.event_id)?.trim();
  if (!eventName || !eventId) {
    return NextResponse.json(
      { ok: false, error: "eventName and eventId required" },
      { status: 400 }
    );
  }

  const rawUser = body.userData || body.user_data || {};
  const cookies = request.headers.get("cookie") || "";
  const cookie = (name: string) =>
    cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))?.[1];
  const userData: CapiUserData = normalizeCapiUserData(
    {
      ...rawUser,
      fbp: rawUser.fbp || cookie("_fbp"),
      fbc: rawUser.fbc || cookie("_fbc"),
      clientIpAddress: clientIp(request),
      clientUserAgent: request.headers.get("user-agent") || undefined,
    },
    request
  );

  const result = await sendMetaCapiEvents([
    {
      eventName,
      eventId,
      eventSourceUrl: body.eventSourceUrl || body.event_source_url,
      userData,
      customData: body.customData || body.custom_data,
    },
  ]);

  if (!result.ok) {
    console.error("Meta CAPI error", result.status, result.body);
    return NextResponse.json(
      { ok: false, error: "capi_failed", detail: result.body },
      { status: result.status || 502 }
    );
  }

  return NextResponse.json({ ok: true, result: result.body });
}
