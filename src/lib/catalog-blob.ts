import { list, put } from "@vercel/blob";

const CATALOG_BLOB_PATH = "store/catalog.json";

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined;
}

export function catalogBlobConfigured() {
  return Boolean(blobToken());
}

// list() is a metered "advanced operation"; the URL never changes (no random suffix), so look it up once per instance.
type GlobalBlobUrl = { __smartShopCatalogBlobUrl?: string };
const urlCache = globalThis as GlobalBlobUrl;

async function catalogBlobUrl(token: string): Promise<string | null> {
  if (urlCache.__smartShopCatalogBlobUrl) return urlCache.__smartShopCatalogBlobUrl;
  const { blobs } = await list({ prefix: CATALOG_BLOB_PATH, token });
  const blob = blobs.find((b) => b.pathname === CATALOG_BLOB_PATH) ?? blobs[0];
  if (blob?.url) urlCache.__smartShopCatalogBlobUrl = blob.url;
  return blob?.url ?? null;
}

/** Read raw catalog JSON from Vercel Blob (production durable store). */
export async function readCatalogBlobRaw(): Promise<string | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const url = await catalogBlobUrl(token);
    if (!url) return null;
    const res = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
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
    urlCache.__smartShopCatalogBlobUrl = blob.url;
    return blob.url;
  } catch (err) {
    console.error("catalog blob write failed", err);
    return null;
  }
}
