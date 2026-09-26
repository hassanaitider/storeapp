/** Public Meta Pixel ID — أبو يحيى only (9644…). Never use 1751… (محمد). */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
  process.env.FB_PIXEL_ID?.trim() ||
  "964436486676478";

export function isMetaPixelConfigured(): boolean {
  return META_PIXEL_ID.length > 0;
}

/**
 * Server-only Conversions API token.
 * Prefer FB_CAPI_TOKEN (Events Manager → Settings → Generate access token).
 * META_CAPI_ACCESS_TOKEN kept as fallback.
 */
export function getMetaCapiAccessToken(): string | null {
  const token =
    process.env.FB_CAPI_TOKEN?.trim() ||
    process.env.META_CAPI_ACCESS_TOKEN?.trim();
  return token || null;
}

/** Server Pixel ID for Graph API */
export function getFbPixelId(): string {
  return (
    process.env.FB_PIXEL_ID?.trim() ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
    "964436486676478"
  );
}

/** Graph API version for CAPI */
export const META_GRAPH_API_VERSION = "v19.0";
