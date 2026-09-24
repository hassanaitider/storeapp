"use client";

/**
 * Convert plain text product descriptions to minimal HTML for the rich editor.
 * If already HTML, return as-is.
 */
export function toEditorHtml(raw: string | undefined | null): string {
  const text = (raw ?? "").trim();
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<p style="text-align: center">${escaped}</p>`;
}

/** Strip tags for short plain previews / SEO fallbacks */
export function htmlToPlain(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Very small sanitizer for product body HTML (admin-authored). */
export function sanitizeProductHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/<img\b([^>]*)>/gi, (_match, attrs: string) => {
      let next = attrs;
      if (!/\bwidth\s*=/i.test(next)) {
        next += ` width="1200"`;
      }
      if (!/\bheight\s*=/i.test(next)) {
        next += ` height="1200"`;
      }
      if (!/\bloading\s*=/i.test(next)) {
        next += ` loading="lazy"`;
      }
      if (!/\bdecoding\s*=/i.test(next)) {
        next += ` decoding="async"`;
      }
      return `<img${next}>`;
    });
}
