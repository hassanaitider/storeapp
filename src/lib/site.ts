/** Canonical public site URL */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.cargolf.net";

export const SITE_HOST = "www.cargolf.net";
export const SITE_EMAIL = "support@cargolf.net";

/** Primary brand mark (WebP — header / footer) */
export const BRAND_LOGO_SRC = "/brand/smart-shop-logo.webp?v=3";
