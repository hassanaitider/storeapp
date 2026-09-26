/**
 * Facebook Pixel + CAPI helpers (Browser + Server, same event_id).
 * Keep fbq('init') in the head snippet — use trackBoth for all track events.
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

/** Unique event_id shared by Browser Pixel + Conversions API (dedupe) */
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
 * Fire Browser Pixel + Server CAPI with the SAME event_id.
 * Critical for "Navigateur + Serveur" and Event Match Quality.
 */
export function trackBoth(
  eventName: string,
  customData: Record<string, unknown> = {},
  options?: {
    eventId?: string;
    userData?: TrackBothUserData;
  }
): string {
  if (typeof window === "undefined") return "";

  const eventId = options?.eventId || genEventId();
  const { fbp, fbc } = getFbpFbc();

  // Browser
  if (typeof window.fbq === "function") {
    const hasParams = customData && Object.keys(customData).length > 0;
    if (hasParams) {
      window.fbq("track", eventName, customData, { eventID: eventId });
    } else {
      window.fbq("track", eventName, {}, { eventID: eventId });
    }
  }

  // Server (CAPI) — same event_id for deduplication
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
      custom_data: customData,
    }),
    keepalive: true,
  }).catch(() => {
    /* best-effort */
  });

  return eventId;
}
