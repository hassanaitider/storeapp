/** URLs that survive refresh / serverless cold starts */
export function isDurableMediaUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  if (url.startsWith("/api/media/")) return false;
  if (url.startsWith("data:image/")) return true;
  if (url.startsWith("https://") || url.startsWith("http://")) return true;
  if (url.startsWith("/products/")) return true;
  if (url.startsWith("/uploads/")) return true;
  if (url.startsWith("/brand/")) return true;
  return false;
}

export function needsUnoptimizedImage(src: string) {
  return (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.startsWith("/api/media/") ||
    /\.gif($|\?)/i.test(src) ||
    src.startsWith("/products/") ||
    src.startsWith("/uploads/")
  );
}
