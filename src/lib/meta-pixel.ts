import { META_PIXEL_ID, isMetaPixelConfigured } from "@/lib/meta-config";

export { META_PIXEL_ID, isMetaPixelConfigured };

export type MetaContentItem = {
  id: string;
  quantity: number;
  item_price?: number;
};

export type MetaUserHints = {
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
    _fbq?: unknown;
    __metaInitialPageViewId?: string;
  }
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function sendCapi(input: {
  eventName: string;
  eventId: string;
  customData?: Record<string, unknown>;
  userData?: MetaUserHints;
}) {
  if (typeof window === "undefined") return;
  if (!isMetaPixelConfigured()) return;
  void fetch("/api/meta/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: input.eventName,
      eventId: input.eventId,
      eventSourceUrl: window.location.href,
      customData: input.customData,
      userData: {
        ...(input.userData ?? {}),
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      },
    }),
    keepalive: true,
  }).catch(() => {
    /* best-effort */
  });
}

/** Browser Pixel + matching Conversions API event (same event_id) */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  eventID?: string,
  userData?: MetaUserHints
) {
  if (!isMetaPixelConfigured()) return "";
  const id = eventID || newEventId();
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", event, params, { eventID: id });
    } else {
      window.fbq("track", event, {}, { eventID: id });
    }
  }
  sendCapi({
    eventName: event,
    eventId: id,
    customData: params,
    userData,
  });
  return id;
}

export function trackPageView(eventId?: string) {
  return trackMeta("PageView", undefined, eventId);
}

/** Alias / no-op-friendly name used by some Pixel snippets */
export function pageview(eventId?: string) {
  return trackPageView(eventId);
}

/** Generic event alias — forwards to trackMeta */
export function event(
  name: string,
  params?: Record<string, unknown>,
  eventID?: string
) {
  return trackMeta(name, params, eventID);
}

export function trackViewContent(input: {
  contentId: string;
  contentName: string;
  value: number;
  currency: string;
}) {
  return trackMeta("ViewContent", {
    content_ids: [input.contentId],
    content_name: input.contentName,
    content_type: "product",
    value: input.value,
    currency: input.currency,
  });
}

export function trackAddToCart(input: {
  contentId: string;
  contentName: string;
  value: number;
  currency: string;
  quantity?: number;
}) {
  const quantity = input.quantity ?? 1;
  const unitPrice =
    quantity > 0
      ? Math.round((input.value / quantity) * 100) / 100
      : input.value;
  return trackMeta("AddToCart", {
    content_ids: [input.contentId],
    content_name: input.contentName,
    content_type: "product",
    value: input.value,
    currency: input.currency,
    contents: [
      {
        id: input.contentId,
        quantity,
        item_price: unitPrice,
      },
    ] satisfies MetaContentItem[],
  });
}

export function trackInitiateCheckout(input: {
  value: number;
  currency: string;
  numItems: number;
  contents: MetaContentItem[];
}) {
  return trackMeta("InitiateCheckout", {
    value: input.value,
    currency: input.currency,
    num_items: input.numItems,
    content_type: "product",
    contents: input.contents,
    content_ids: input.contents.map((c) => c.id),
  });
}

export function trackPurchase(
  input: {
    orderId: string;
    value: number;
    currency: string;
    contents: MetaContentItem[];
  },
  userData?: MetaUserHints
) {
  return trackMeta(
    "Purchase",
    {
      value: input.value,
      currency: input.currency,
      content_type: "product",
      contents: input.contents,
      content_ids: input.contents.map((c) => c.id),
      num_items: input.contents.reduce((n, c) => n + c.quantity, 0),
      order_id: input.orderId,
    },
    input.orderId,
    userData
  );
}

/** Inline base code for <head> (init + PageView with eventID for CAPI dedupe) */
export function metaPixelHeadSnippet(): string {
  if (!isMetaPixelConfigured()) return "";
  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
(function(){
  var eid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('pv_' + Date.now());
  window.__metaInitialPageViewId = eid;
  fbq('track', 'PageView', {}, {eventID: eid});
})();
`.trim();
}
