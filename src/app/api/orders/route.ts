import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { isValidCountry } from "@/lib/countries";
import { listOrderBlobs, saveOrderBlob } from "@/lib/orders-blob";
import type { Order } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_CHARS = 20_000;

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
    const order = sanitizeOrder(JSON.parse(raw) as Partial<Order>);
    if (!order) {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }
    const saved = await saveOrderBlob(order);
    if (!saved) {
      console.error("order not persisted: BLOB_READ_WRITE_TOKEN missing", order.id);
      return NextResponse.json({ ok: false, error: "storage unavailable" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("order save failed", err);
    return NextResponse.json({ ok: false, error: "save failed" }, { status: 500 });
  }
}

export async function GET() {
  const jar = await cookies();
  if (!verifyAdminSessionToken(jar.get(ADMIN_COOKIE)?.value).ok) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const orders = await listOrderBlobs();
    return NextResponse.json(
      { ok: true, orders },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("order list failed", err);
    return NextResponse.json({ ok: false, error: "list failed" }, { status: 500 });
  }
}
