import { list, put } from "@vercel/blob";

const CATALOG_BLOB_PATH = "store/catalog.json";

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined;
}

export function catalogBlobConfigured() {
  return Boolean(blobToken());
}

/** Read raw catalog JSON from Vercel Blob (production durable store). */
export async function readCatalogBlobRaw(): Promise<string | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const { blobs } = await list({
      prefix: CATALOG_BLOB_PATH,
      token,
    });
    const blob =
      blobs.find((b) => b.pathname === CATALOG_BLOB_PATH) ?? blobs[0];
    if (!blob?.url) return null;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.text();
  } catch (err) {
    console.error("catalog blob read failed", err);
    return null;
  }
}

/** Persist catalog JSON to Vercel Blob. Returns public URL on success. */
export async function writeCatalogBlobRaw(raw: string): Promise<string | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const blob = await put(CATALOG_BLOB_PATH, raw, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token,
    });
    return blob.url;
  } catch (err) {
    console.error("catalog blob write failed", err);
    return null;
  }
}
