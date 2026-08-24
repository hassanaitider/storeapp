import { createHash } from "crypto";
import {
  META_GRAPH_API_VERSION,
  META_PIXEL_ID,
  getMetaCapiAccessToken,
  getMetaTestEventCode,
} from "@/lib/meta-config";

export type CapiUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  externalId?: string;
};

export type CapiCustomData = {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
  }>;
  num_items?: number;
  order_id?: string;
};

export type CapiEventInput = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  eventTime?: number;
  userData?: CapiUserData;
  customData?: CapiCustomData;
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function hashSha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashIfPresent(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  return hashSha256(normalize(value));
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits;
}

function buildUserData(user?: CapiUserData) {
  if (!user) return {};

  const ph = user.phone?.trim()
    ? hashSha256(normalizePhone(user.phone))
    : undefined;

  const out: Record<string, string | string[]> = {};
  const em = hashIfPresent(user.email);
  const fn = hashIfPresent(user.firstName);
  const ln = hashIfPresent(user.lastName);
  const ct = hashIfPresent(user.city);
  const country = hashIfPresent(user.country);
  const externalId = hashIfPresent(user.externalId);

  if (em) out.em = [em];
  if (ph) out.ph = [ph];
  if (fn) out.fn = [fn];
  if (ln) out.ln = [ln];
  if (ct) out.ct = [ct];
  if (country) out.country = [country];
  if (externalId) out.external_id = [externalId];
  if (user.clientIpAddress) out.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) out.client_user_agent = user.clientUserAgent;
  if (user.fbp) out.fbp = user.fbp;
  if (user.fbc) out.fbc = user.fbc;

  return out;
}

/** Send one or more events to Meta Conversions API */
export async function sendMetaCapiEvents(
  events: CapiEventInput[]
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const accessToken = getMetaCapiAccessToken();
  if (!accessToken) {
    return { ok: false, status: 0, body: { error: "missing META_CAPI_ACCESS_TOKEN" } };
  }
  if (!events.length) {
    return { ok: false, status: 400, body: { error: "no events" } };
  }

  const data = events.map((ev) => ({
    event_name: ev.eventName,
    event_time: ev.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: ev.eventId,
    event_source_url: ev.eventSourceUrl,
    action_source: "website",
    user_data: buildUserData(ev.userData),
    custom_data: ev.customData,
  }));

  const payload: Record<string, unknown> = {
    data,
    access_token: accessToken,
  };

  const testCode = getMetaTestEventCode();
  if (testCode) payload.test_event_code = testCode;

  const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${META_PIXEL_ID}/events`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error("Meta CAPI request failed", err);
    return { ok: false, status: 500, body: { error: "network" } };
  }
}
