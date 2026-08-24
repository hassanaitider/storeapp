/** Public Meta Pixel ID (safe for client) */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "2098415630739868";

/** Server-only Conversions API token — set in Vercel / .env */
export function getMetaCapiAccessToken(): string | null {
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  return token || null;
}

export function getMetaTestEventCode(): string | null {
  const code = process.env.META_TEST_EVENT_CODE?.trim();
  return code || null;
}

export const META_GRAPH_API_VERSION = "v21.0";
