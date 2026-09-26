import { META_PIXEL_ID, isMetaPixelConfigured } from "@/lib/meta-config";
import { genEventId, trackBoth, type TrackBothUserData } from "@/lib/fb";

export { META_PIXEL_ID, isMetaPixelConfigured, genEventId, trackBoth };
export type { TrackBothUserData as MetaUserHints };

export type MetaContentItem = {
  id: string;
  quantity: number;
  item_price?: number;
};

/** @deprecated use genEventId */
export function newEventId(): string {
  return genEventId();
}

/**
 * Browser Pixel + matching Conversions API event (same event_id → dedupe).
 */
export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
  userData?: TrackBothUserData
) {
  if (!isMetaPixelConfigured()) return "";
  return trackBoth(event, params ?? {}, { eventId, userData });
}

export function trackPageView(eventId?: string) {
  return trackMeta("PageView", undefined, eventId);
}

export function pageview(eventId?: string) {
  return trackPageView(eventId);
}

export function event(
  name: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  return trackMeta(name, params, eventId);
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
  userData?: TrackBothUserData
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

/** Head snippet: init only — PageView via trackBoth (MetaPixel) for Browser+Server */
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
`.trim();
}
