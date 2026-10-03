import { del, list, put } from "@vercel/blob";
import type { Order } from "./types";

const ORDERS_PREFIX = "orders/";
const MAX_LISTED = 1000;

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined;
}

export function ordersBlobConfigured() {
  return Boolean(blobToken());
}

/**
 * One blob per order so concurrent checkouts never overwrite each other.
 * The random suffix keeps the public URL unguessable.
 */
export async function saveOrderBlob(order: Order): Promise<boolean> {
  const token = blobToken();
  if (!token) return false;
  const stamp = order.createdAt.replace(/[^0-9]/g, "").slice(0, 14);
  await put(`${ORDERS_PREFIX}${stamp}-${order.id}.json`, JSON.stringify(order), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
    token,
  });
  return true;
}

/** Returns how many blobs were removed (0 when the order only existed locally). */
export async function deleteOrderBlob(id: string): Promise<number> {
  const token = blobToken();
  if (!token) return 0;
  const matches: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: ORDERS_PREFIX, cursor, limit: 1000, token });
    for (const b of page.blobs) {
      if (b.pathname.includes(`-${id}-`) || b.pathname.endsWith(`-${id}.json`)) {
        matches.push(b.url);
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  if (matches.length) await del(matches, { token });
  return matches.length;
}

export async function listOrderBlobs(): Promise<Order[]> {
  const token = blobToken();
  if (!token) return [];
  const urls: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: ORDERS_PREFIX, cursor, limit: 1000, token });
    urls.push(...page.blobs.map((b) => b.url));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor && urls.length < MAX_LISTED);

  const orders = await Promise.all(
    urls.slice(0, MAX_LISTED).map(async (url) => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        return res.ok ? ((await res.json()) as Order) : null;
      } catch {
        return null;
      }
    })
  );
  return orders
    .filter((o): o is Order => Boolean(o?.id))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
