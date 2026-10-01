/**
 * Facebook Pixel Standard events + CAPI (same event_id for dedupe).
 * Always Standard events (trackSingle), never trackCustom.
 */

import { LATAM_PIXEL_ID, getActivePixelId } from "@/lib/meta-pixels";

export function getFbpFbc(): { fbp?: string; fbc?: string } {
  if (typeof document === "undefined") return {};
  const read = (name: string): string | undefined => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
    );
    return match?.[1] ? decodeURIComponent(match[1]) : undefined;
  };
  return { fbp: read("_fbp"), fbc: read("_fbc") };
}

export function genEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export type TrackBothUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  externalId?: string;
};

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: Fbq;
  loaded?: boolean;
  version?: string;
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Standard Meta loader stub; events queue until fbevents.js arrives. */
function ensureFbq(): Fbq {
  if (window.fbq) return window.fbq;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue!.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  // Page views are sent per pixel by the app; fbevents' history hook would hit every pixel.
  n.disablePushState = true;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  return n;
}

const initialisedPixels = new Set<string>();

function ensurePixel(fbq: Fbq, pixelId: string) {
  if (initialisedPixels.has(pixelId)) return;
  initialisedPixels.add(pixelId);
  // Automatic events (button clicks, metadata) go to every initialised pixel.
  fbq("set", "autoConfig", false, pixelId);
  fbq("init", pixelId);
}

/**
 * Standard Pixel event + matching CAPI, sent only to the visitor's market pixel.
 * Uses fbq('trackSingle', pixelId, eventName, …) — Standard, not Custom.
 */
export function trackBoth(
  eventName: string,
  customData?: Record<string, unknown>,
  options?: {
    eventId?: string;
    userData?: TrackBothUserData;
  }
): string {
  if (typeof window === "undefined") return "";

  const eventId = options?.eventId || genEventId();
  const pixelId = getActivePixelId();
  if (!pixelId) return eventId;
  const { fbp, fbc } = getFbpFbc();
  const params = customData && Object.keys(customData).length > 0 ? customData : undefined;

  const fbq = ensureFbq();
  ensurePixel(fbq, pixelId);
  fbq("trackSingle", pixelId, eventName, params ?? {}, { eventID: eventId });

  // Server CAPI only holds the LATAM pixel's token
  if (pixelId !== LATAM_PIXEL_ID) return eventId;
  void fetch("/api/fb-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      pixel_id: pixelId,
      user_data: {
        ...(options?.userData ?? {}),
        fbp,
        fbc,
      },
      custom_data: params ?? {},
    }),
    keepalive: true,
  }).catch(() => {});

  return eventId;
}

/** Convenience aliases matching Meta Standard event names */
export function trackViewContent(data: {
  content_name: string;
  content_ids: string[];
  content_type?: string;
  value: number;
  currency?: string;
}) {
  return trackBoth("ViewContent", {
    content_name: data.content_name,
    content_ids: data.content_ids,
    content_type: data.content_type ?? "product",
    value: data.value,
    currency: data.currency ?? "USD",
  });
}

export function trackAddToCart(data: {
  content_ids: string[];
  value: number;
  currency?: string;
  content_name?: string;
  content_type?: string;
}) {
  return trackBoth("AddToCart", {
    content_ids: data.content_ids,
    value: data.value,
    currency: data.currency ?? "USD",
    ...(data.content_name ? { content_name: data.content_name } : {}),
    content_type: data.content_type ?? "product",
  });
}

export function trackInitiateCheckout(data?: {
  value?: number;
  currency?: string;
  content_ids?: string[];
  num_items?: number;
}) {
  if (!data || Object.keys(data).length === 0) {
    return trackBoth("InitiateCheckout");
  }
  return trackBoth("InitiateCheckout", {
    ...(data.value != null ? { value: data.value } : {}),
    currency: data.currency ?? "USD",
    ...(data.content_ids ? { content_ids: data.content_ids } : {}),
    ...(data.num_items != null ? { num_items: data.num_items } : {}),
  });
}

export function trackPurchase(data: {
  value: number;
  currency?: string;
  content_ids?: string[];
  order_id?: string;
}, userData?: TrackBothUserData) {
  return trackBoth(
    "Purchase",
    {
      value: data.value,
      currency: data.currency ?? "USD",
      ...(data.content_ids ? { content_ids: data.content_ids } : {}),
      ...(data.order_id ? { order_id: data.order_id } : {}),
    },
    { eventId: data.order_id, userData }
  );
}
