import { del, list, put } from "@vercel/blob";
import type { Order } from "./types";

const ORDERS_PREFIX = "orders/";
const TRASH_PREFIX = "orders-trash/";
const MAX_LISTED = 1000;

function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || undefined;
}

export function ordersBlobConfigured() {
  return Boolean(blobToken());
}

function orderPath(prefix: string, order: Order) {
  const stamp = order.createdAt.replace(/[^0-9]/g, "").slice(0, 14);
  return `${prefix}${stamp}-${order.id}.json`;
}

async function putOrder(prefix: string, order: Order, token: string) {
  await put(orderPath(prefix, order), JSON.stringify(order), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
    token,
  });
}

/**
 * One blob per order so concurrent checkouts never overwrite each other.
 * The random suffix keeps the public URL unguessable.
 */
export async function saveOrderBlob(order: Order): Promise<boolean> {
  const token = blobToken();
  if (!token) return false;
  await putOrder(ORDERS_PREFIX, order, token);
  return true;
}

async function findOrderBlobUrls(prefix: string, id: string, token: string): Promise<string[]> {
  const matches: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000, token });
    for (const b of page.blobs) {
      if (b.pathname.includes(`-${id}-`) || b.pathname.endsWith(`-${id}.json`)) {
        matches.push(b.url);
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return matches;
}

async function readOrder(url: string): Promise<Order | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const order = (await res.json()) as Order;
    return order?.id ? order : null;
  } catch {
    return null;
  }
}

/**
 * Moves the order to the trash instead of erasing it, so a mistaken delete
 * can be restored from the admin. Returns how many blobs were moved.
 */
export async function deleteOrderBlob(id: string): Promise<number> {
  const token = blobToken();
  if (!token) return 0;
  const urls = await findOrderBlobUrls(ORDERS_PREFIX, id, token);
  if (!urls.length) return 0;
  const order = await readOrder(urls[0]);
  if (!order) throw new Error("order unreadable, not deleted");
  await putOrder(TRASH_PREFIX, { ...order, deletedAt: new Date().toISOString() }, token);
  await del(urls, { token });
  return urls.length;
}

/** Puts a trashed order back into the live list. Returns null when it is not in the trash. */
export async function restoreOrderBlob(id: string): Promise<Order | null> {
  const token = blobToken();
  if (!token) return null;
  const urls = await findOrderBlobUrls(TRASH_PREFIX, id, token);
  if (!urls.length) return null;
  const trashed = await readOrder(urls[0]);
  if (!trashed) return null;
  const order: Order = { ...trashed };
  delete order.deletedAt;
  await putOrder(ORDERS_PREFIX, order, token);
  await del(urls, { token });
  return order;
}

async function listOrdersUnder(prefix: string): Promise<Order[]> {
  const token = blobToken();
  if (!token) return [];
  const urls: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000, token });
    urls.push(...page.blobs.map((b) => b.url));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor && urls.length < MAX_LISTED);

  const orders = await Promise.all(urls.slice(0, MAX_LISTED).map(readOrder));
  return orders
    .filter((o): o is Order => Boolean(o?.id))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listOrderBlobs(): Promise<Order[]> {
  return listOrdersUnder(ORDERS_PREFIX);
}

export function listTrashedOrderBlobs(): Promise<Order[]> {
  return listOrdersUnder(TRASH_PREFIX);
}
