import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "admin_session";
const SESSION_DAYS = 7;

export function getAdminCredentials() {
  return {
    username: (process.env.ADMIN_USERNAME || "admin").trim(),
    password: (process.env.ADMIN_PASSWORD || "SmartShop2026").trim(),
  };
}

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "cargolf-admin-session-secret"
  );
}

function b64url(input: string | Buffer) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64");
}

export function createAdminSessionToken(username: string): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${username}:${exp}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest();
  return `${b64url(payload)}.${b64url(sig)}`;
}

export function verifyAdminSessionToken(
  token: string | undefined | null
): { ok: true; username: string } | { ok: false } {
  if (!token || !token.includes(".")) return { ok: false };
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return { ok: false };
    const payload = fromB64url(payloadB64).toString("utf8");
    const expected = createHmac("sha256", getSecret()).update(payload).digest();
    const actual = fromB64url(sigB64);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      return { ok: false };
    }
    const [username, expRaw] = payload.split(":");
    const exp = Number(expRaw);
    if (!username || !Number.isFinite(exp) || Date.now() > exp) {
      return { ok: false };
    }
    const { username: expectedUser } = getAdminCredentials();
    if (username !== expectedUser) return { ok: false };
    return { ok: true, username };
  } catch {
    return { ok: false };
  }
}

export function verifyAdminPassword(username: string, password: string) {
  const creds = getAdminCredentials();
  const uOk =
    username.length === creds.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(creds.username));
  const pOk =
    password.length === creds.password.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(creds.password));
  return uOk && pOk;
}

export function adminCookieOptions(maxAgeSeconds = SESSION_DAYS * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
