/**
 * Edge-safe session helpers for middleware (Web Crypto).
 * Node routes use src/lib/admin-auth.ts
 */

export const ADMIN_COOKIE = "admin_session";

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "cargolf-admin-session-secret"
  );
}

function b64urlFromBytes(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]!);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function bytesFromB64url(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

export async function verifyAdminSessionEdge(
  token: string | undefined
): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return false;
    const payloadBytes = bytesFromB64url(payloadB64);
    const payload = new TextDecoder().decode(payloadBytes);
    const expected = await hmac(payload);
    const actual = bytesFromB64url(sigB64);
    if (!timingSafeEqual(expected, actual)) return false;
    const [username, expRaw] = payload.split(":");
    const exp = Number(expRaw);
    if (!username || !Number.isFinite(exp) || Date.now() > exp) return false;
    const expectedUser = (process.env.ADMIN_USERNAME || "admin").trim();
    return username === expectedUser;
  } catch {
    return false;
  }
}

/** Create token with Web Crypto (same format as Node HMAC) */
export async function createAdminSessionTokenEdge(
  username: string
): Promise<string> {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `${username}:${exp}`;
  const sig = await hmac(payload);
  return `${b64urlFromBytes(new TextEncoder().encode(payload))}.${b64urlFromBytes(sig)}`;
}
