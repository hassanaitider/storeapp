import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { isValidCountry } from "@/lib/countries";
import { sendMetaCapiEvents } from "@/lib/meta-capi";
import { getCapiTarget } from "@/lib/meta-config";
import { pixelIdForCountry } from "@/lib/meta-pixels";
import {
  deleteOrderBlob,
  listOrderBlobs,
  listTrashedOrderBlobs,
  restoreOrderBlob,
  saveOrderBlob,
} from "@/lib/orders-blob";
import type { CountryCode, Order } from "@/lib/types";
import { normalizeCapiUserData } from "@/app/api/fb-capi/user-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_CHARS = 20_000;

function cookieFromRequest(request: Request, name: string): string | undefined {
  const raw = request.headers.get("cookie") || "";
  const match = raw.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function clientIp(request: Request): string | undefined {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    undefined
  );
}

/**
 * Always send Purchase via CAPI when the order is saved — same event_id as the
 * browser pixel so Meta dedupes. Survives ad blockers / closed tabs / aborted keepalive.
 */
async function sendOrderPurchaseCapi(
  request: Request,
  order: Order,
  meta?: { fbp?: string; fbc?: string; eventSourceUrl?: string }
) {
  const pixelId = pixelIdForCountry(order.country as CountryCode);
  const target = getCapiTarget(pixelId);
  if (!target) {
    console.error("order CAPI skipped: no_token_for_pixel", pixelId, order.id);
    return;
  }
  const nameParts = order.customer.name.trim().split(/\s+/);
  const userData = normalizeCapiUserData(
    {
      phone: order.customer.phone,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" ") || undefined,
      city: order.customer.city,
      country: order.country,
      externalId: order.id,
      fbp: meta?.fbp || cookieFromRequest(request, "_fbp"),
      fbc: meta?.fbc || cookieFromRequest(request, "_fbc"),
      clientIpAddress: clientIp(request),
      clientUserAgent: request.headers.get("user-agent") || undefined,
    },
    request
  );
  const result = await sendMetaCapiEvents(
    [
      {
        eventName: "Purchase",
        eventId: order.id,
        eventSourceUrl: meta?.eventSourceUrl,
        userData,
        customData: {
          value: Math.round(order.totalUSD * 100) / 100,
          currency: "USD",
          order_id: order.id,
          content_ids: order.items.map((i) => i.productId),
          content_type: "product",
          contents: order.items.map((i) => ({
            id: i.productId,
            quantity: i.quantity,
          })),
          num_items: order.items.reduce((n, i) => n + i.quantity, 0),
        },
      },
    ],
    target
  );
  if (!result.ok) {
    console.error("order CAPI Purchase failed", order.id, result.status, result.body);
  }
}

function text(value: unknown, max = 500): string | undefined {
  return typeof value === "string" ? value.slice(0, max) : undefined;
}

function sanitizeOrder(raw: Partial<Order>): Order | null {
  const c = raw.customer;
  if (!raw.id || typeof raw.id !== "string" || !c || typeof c !== "object") return null;
  if (!text(c.name)?.trim() || !text(c.phone)?.trim()) return null;
  if (typeof raw.country !== "string" || !isValidCountry(raw.country)) return null;
  const items = Array.isArray(raw.items)
    ? raw.items.slice(0, 20).filter((i) => i && typeof i.productId === "string")
    : [];
  if (!items.length) return null;
  return {
    id: raw.id.slice(0, 64),
    items: items.map((i) => ({
      productId: i.productId.slice(0, 120),
      quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
      ...(typeof i.lineTotalUSD === "number" ? { lineTotalUSD: i.lineTotalUSD } : {}),
    })),
    customer: {
      name: text(c.name, 200)!,
      phone: text(c.phone, 60)!,
      city: text(c.city) ?? "",
      address: text(c.address) ?? "",
      notes: text(c.notes, 1000),
      state: text(c.state),
      neighborhood: text(c.neighborhood),
      district: text(c.district),
      postalCode: text(c.postalCode, 40),
      nationalId: text(c.nationalId, 60),
    },
    country: raw.country,
    currency: raw.currency as Order["currency"],
    locale: raw.locale as Order["locale"],
    paymentMethod: "cod",
    totalUSD: typeof raw.totalUSD === "number" ? raw.totalUSD : 0,
    createdAt:
      typeof raw.createdAt === "string" && !Number.isNaN(Date.parse(raw.createdAt))
        ? raw.createdAt
        : new Date().toISOString(),
    status: "pending",
  };
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!raw || raw.length > MAX_BODY_CHARS) {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }
    const parsed = JSON.parse(raw) as Partial<Order> & {
      metaPixel?: { fbp?: string; fbc?: string; eventSourceUrl?: string };
    };
    const order = sanitizeOrder(parsed);
    if (!order) {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }
    const saved = await saveOrderBlob(order);
    if (!saved) {
      console.error("order not persisted: BLOB_READ_WRITE_TOKEN missing", order.id);
      return NextResponse.json({ ok: false, error: "storage unavailable" }, { status: 503 });
    }
    // Await CAPI briefly — on Vercel, void after return often never runs.
    // Cap wait so a slow Meta never blocks the buyer's confirmation.
    try {
      await Promise.race([
        sendOrderPurchaseCapi(request, order, parsed.metaPixel),
        new Promise<void>((resolve) => setTimeout(resolve, 4000)),
      ]);
    } catch (err) {
      console.error("order CAPI unexpected", order.id, err);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("order save failed", err);
    return NextResponse.json({ ok: false, error: "save failed" }, { status: 500 });
  }
}

async function isAdmin() {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_COOKIE)?.value).ok;
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id")?.trim() ?? "";
  if (!/^[\w-]{1,64}$/.test(id)) {
    return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
  }
  try {
    const removed = await deleteOrderBlob(id);
    return NextResponse.json({ ok: true, removed });
  } catch (err) {
    console.error("order delete failed", err);
    return NextResponse.json({ ok: false, error: "delete failed" }, { status: 500 });
  }
}

/** Restores an order from the trash: PATCH /api/orders?id=… */
export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id")?.trim() ?? "";
  if (!/^[\w-]{1,64}$/.test(id)) {
    return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
  }
  try {
    const order = await restoreOrderBlob(id);
    if (!order) {
      return NextResponse.json({ ok: false, error: "not in trash" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error("order restore failed", err);
    return NextResponse.json({ ok: false, error: "restore failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const trash = new URL(request.url).searchParams.get("trash") === "1";
    const orders = trash ? await listTrashedOrderBlobs() : await listOrderBlobs();
    return NextResponse.json(
      { ok: true, orders },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("order list failed", err);
    return NextResponse.json({ ok: false, error: "list failed" }, { status: 500 });
  }
}
