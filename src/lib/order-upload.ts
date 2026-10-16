import type { Order } from "./types";

const QUEUE_KEY = "smartshop.pendingOrders";
const RETRY_DELAYS_MS = [0, 2000, 5000, 10000, 20000];

type QueuedOrder = Order & {
  metaPixel?: { fbp?: string; fbc?: string; eventSourceUrl?: string };
};

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function metaFromBrowser(): QueuedOrder["metaPixel"] {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
  };
}

function readQueue(): QueuedOrder[] {
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    const list = raw ? (JSON.parse(raw) as QueuedOrder[]) : [];
    return Array.isArray(list) ? list.filter((o) => o?.id) : [];
  } catch {
    return [];
  }
}

function writeQueue(list: QueuedOrder[]) {
  try {
    if (list.length) window.localStorage.setItem(QUEUE_KEY, JSON.stringify(list));
    else window.localStorage.removeItem(QUEUE_KEY);
  } catch {
    /* storage full or blocked — the in-memory retries still run */
  }
}

function enqueue(order: QueuedOrder) {
  writeQueue([...readQueue().filter((o) => o.id !== order.id), order]);
}

function dequeue(id: string) {
  writeQueue(readQueue().filter((o) => o.id !== id));
}

/** "ok" = saved, "rejected" = server refused the payload (retrying won't help), "failed" = network/server error */
async function postOrder(order: QueuedOrder): Promise<"ok" | "rejected" | "failed"> {
  try {
    const { metaPixel, ...rest } = order;
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rest,
        metaPixel: metaPixel ?? metaFromBrowser(),
      }),
      keepalive: true,
    });
    if (res.ok) return "ok";
    return res.status >= 400 && res.status < 500 ? "rejected" : "failed";
  } catch {
    return "failed";
  }
}

const inFlight = new Set<string>();

async function uploadWithRetry(order: QueuedOrder) {
  if (inFlight.has(order.id)) return;
  inFlight.add(order.id);
  try {
    for (const delay of RETRY_DELAYS_MS) {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      const result = await postOrder(order);
      if (result === "ok" || result === "rejected") {
        if (result === "rejected") console.error("order rejected by server", order.id);
        dequeue(order.id);
        return;
      }
    }
    console.error("order upload failed, will retry on next visit", order.id);
  } finally {
    inFlight.delete(order.id);
  }
}

/**
 * Saves the order on the server. The order stays queued in the buyer's
 * browser until the server confirms, so a weak connection doesn't lose it.
 */
export function uploadOrder(order: Order) {
  if (typeof window === "undefined") return;
  const queued: QueuedOrder = { ...order, metaPixel: metaFromBrowser() };
  enqueue(queued);
  void uploadWithRetry(queued);
}

/** Re-sends orders that never reached the server on a previous visit. */
export function flushPendingOrders() {
  if (typeof window === "undefined") return;
  for (const order of readQueue()) void uploadWithRetry(order);
}
