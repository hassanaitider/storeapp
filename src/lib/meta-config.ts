/** Public Meta Pixel ID — set NEXT_PUBLIC_META_PIXEL_ID in Vercel / .env */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";

export function isMetaPixelConfigured(): boolean {
  return META_PIXEL_ID.length > 0;
}

/** Server-only Conversions API token — set META_CAPI_ACCESS_TOKEN in Vercel / .env */
export function getMetaCapiAccessToken(): string | null {
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  return token || null;
}

export function getMetaTestEventCode(): string | null {
  const code = process.env.META_TEST_EVENT_CODE?.trim();
  return code || null;
}

export const META_GRAPH_API_VERSION = "v21.0";
