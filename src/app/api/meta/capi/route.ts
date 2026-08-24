import { NextResponse } from "next/server";
import {
  sendMetaCapiEvents,
  type CapiCustomData,
  type CapiUserData,
} from "@/lib/meta-capi";
import { getMetaCapiAccessToken } from "@/lib/meta-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  customData?: CapiCustomData;
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

  const eventName = body.eventName?.trim();
  const eventId = body.eventId?.trim();
  if (!eventName || !eventId) {
    return NextResponse.json(
      { ok: false, error: "eventName and eventId required" },
      { status: 400 }
    );
  }

  const userData: CapiUserData = {
    ...(body.userData ?? {}),
    clientIpAddress: clientIp(request),
    clientUserAgent: request.headers.get("user-agent") || undefined,
  };

  const result = await sendMetaCapiEvents([
    {
      eventName,
      eventId,
      eventSourceUrl: body.eventSourceUrl,
      userData,
      customData: body.customData,
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
