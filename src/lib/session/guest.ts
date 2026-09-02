export const GUEST_COOKIE_NAME = "guest_id";
export const GUEST_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const DEV_ONLY_FALLBACK_SECRET = "dev-only-insecure-guest-cookie-secret";

/**
 * Web Crypto (`crypto.subtle`), not `node:crypto` — `middleware.ts` imports
 * this module and Next.js Middleware runs on the Edge runtime, which has
 * no Node built-ins. Web Crypto works in both the Edge runtime and Node.
 */

/** Falls back to a fixed dev secret outside production so a fresh clone
 * works before `.env` is filled in — never in production, where a missing
 * secret is a misconfiguration worth failing loudly for. */
function secret(): string {
  const configured = process.env.GUEST_COOKIE_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") {
    throw new Error("GUEST_COOKIE_SECRET is not set");
  }
  return DEV_ONLY_FALLBACK_SECRET;
}

function base64UrlEncode(bytes: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function sign(id: string): Promise<string> {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    new TextEncoder().encode(id),
  );
  return base64UrlEncode(signature);
}

/** Signs a guest id for storage in a cookie, as `<id>.<hmac>`. */
export async function signGuestId(id: string): Promise<string> {
  return `${id}.${await sign(id)}`;
}

/** Constant-time string comparison — no `node:crypto.timingSafeEqual`
 * available on the Edge runtime. */
function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verifies a signed cookie value, returning the guest id it carries, or
 * `null` if the cookie is absent, malformed, or its signature doesn't
 * match — a forged or edited cookie is indistinguishable from a missing
 * one, so the caller always ends up minting a fresh guest id.
 */
export async function verifyGuestCookie(
  raw: string | undefined | null,
): Promise<string | null> {
  if (!raw) return null;

  const separatorIndex = raw.indexOf(".");
  if (separatorIndex === -1) return null;

  const id = raw.slice(0, separatorIndex);
  const signature = raw.slice(separatorIndex + 1);
  const expected = await sign(id);

  if (!timingSafeEqualStrings(signature, expected)) return null;

  return id;
}

export function generateGuestId(): string {
  return crypto.randomUUID();
}
