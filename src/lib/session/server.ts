import { cookies } from "next/headers";
import { GUEST_COOKIE_NAME, verifyGuestCookie } from "./guest";

/**
 * Reads the current request's guest id. `middleware.ts` guarantees every
 * request already carries a valid signed cookie by the time a server
 * component or action runs, so a missing/invalid one here means the
 * middleware matcher doesn't cover this route — a configuration bug, not a
 * normal runtime case.
 */
export async function getGuestId(): Promise<string> {
  const store = await cookies();
  const guestId = await verifyGuestCookie(store.get(GUEST_COOKIE_NAME)?.value);
  if (guestId === null) {
    throw new Error(
      "no guest session cookie on this request — is middleware.ts's matcher covering this route?",
    );
  }
  return guestId;
}
