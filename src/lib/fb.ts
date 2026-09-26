/**
 * Facebook Pixel Standard events + CAPI (same event_id for dedupe).
 * Always use fbq('track', …) — never trackCustom — so Events Manager shows Standard.
 */

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

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventOrId: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
  }
}

/**
 * Standard Pixel event + matching CAPI.
 * Uses fbq('track', eventName, …) only — Standard, not Custom.
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
  const { fbp, fbc } = getFbpFbc();
  const params = customData && Object.keys(customData).length > 0 ? customData : undefined;

  // Browser — Standard event API (exact Meta format)
  if (typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params, { eventID: eventId });
    } else {
      // e.g. fbq('track', 'InitiateCheckout') / PageView
      window.fbq("track", eventName, {}, { eventID: eventId });
    }
  }

  // Server CAPI — same event_id
  void fetch("/api/fb-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
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
