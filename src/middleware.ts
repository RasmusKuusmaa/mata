import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GUEST_COOKIE_MAX_AGE_SECONDS,
  GUEST_COOKIE_NAME,
  generateGuestId,
  signGuestId,
  verifyGuestCookie,
} from "@/lib/session/guest";

/**
 * Every request carries a signed anonymous guest-session cookie (Ship 1.7)
 * — minted here on first visit. Mutating `request.cookies` before calling
 * `NextResponse.next({ request })` makes the new cookie visible to server
 * components later in this same request, not just the next one.
 */
export async function middleware(request: NextRequest) {
  const existing = request.cookies.get(GUEST_COOKIE_NAME)?.value;
  if ((await verifyGuestCookie(existing)) !== null) {
    return NextResponse.next();
  }

  const signed = await signGuestId(generateGuestId());
  request.cookies.set(GUEST_COOKIE_NAME, signed);

  const response = NextResponse.next({ request });
  response.cookies.set(GUEST_COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GUEST_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
