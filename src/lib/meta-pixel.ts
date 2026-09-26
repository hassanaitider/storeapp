import { META_PIXEL_ID, isMetaPixelConfigured } from "@/lib/meta-config";
import {
  genEventId,
  trackBoth,
  trackViewContent as fbViewContent,
  trackAddToCart as fbAddToCart,
  trackInitiateCheckout as fbInitiateCheckout,
  trackPurchase as fbPurchase,
  type TrackBothUserData,
} from "@/lib/fb";

export { META_PIXEL_ID, isMetaPixelConfigured, genEventId, trackBoth };
export type { TrackBothUserData as MetaUserHints };

export type MetaContentItem = {
  id: string;
  quantity: number;
  item_price?: number;
};

export function newEventId(): string {
  return genEventId();
}

export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  eventId?: string,
  userData?: TrackBothUserData
) {
  if (!isMetaPixelConfigured()) return "";
  return trackBoth(event, params, { eventId, userData });
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

/** Standard ViewContent — value in USD */
export function trackViewContent(input: {
  contentId: string;
  contentName: string;
  value: number;
  currency?: string;
}) {
  if (!isMetaPixelConfigured()) return "";
  return fbViewContent({
    content_name: input.contentName,
    content_ids: [input.contentId],
    content_type: "product",
    value: input.value,
    currency: "USD",
  });
}

/** Standard AddToCart — value in USD */
export function trackAddToCart(input: {
  contentId: string;
  contentName?: string;
  value: number;
  currency?: string;
  quantity?: number;
}) {
  if (!isMetaPixelConfigured()) return "";
  return fbAddToCart({
    content_ids: [input.contentId],
    value: input.value,
    currency: "USD",
    content_name: input.contentName,
    content_type: "product",
  });
}

/** Standard InitiateCheckout */
export function trackInitiateCheckout(input?: {
  value?: number;
  currency?: string;
  numItems?: number;
  contents?: MetaContentItem[];
}) {
  if (!isMetaPixelConfigured()) return "";
  if (!input) return fbInitiateCheckout();
  return fbInitiateCheckout({
    value: input.value,
    currency: "USD",
    num_items: input.numItems,
    content_ids: input.contents?.map((c) => c.id),
  });
}

/** Standard Purchase — value in USD */
export function trackPurchase(
  input: {
    orderId: string;
    value: number;
    currency?: string;
    contents?: MetaContentItem[];
  },
  userData?: TrackBothUserData
) {
  if (!isMetaPixelConfigured()) return "";
  return fbPurchase(
    {
      value: input.value,
      currency: "USD",
      content_ids: input.contents?.map((c) => c.id),
      order_id: input.orderId,
    },
    userData
  );
}
