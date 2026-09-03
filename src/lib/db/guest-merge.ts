import { eq } from "drizzle-orm";
import { db } from "./client";
import { attempts } from "./schema";

/**
 * On first sign-in (Ship 3.4), transfers every attempt a guest cookie owns
 * onto the new account. Idempotent: re-running for a guest id that's
 * already been merged (or was never used) updates zero rows. The guest id
 * itself is never deleted — `attempts.guestSessionId` stays populated as a
 * historical record even after the merge.
 */
export async function mergeGuestIntoUser(
  guestId: string,
  userId: string,
): Promise<void> {
  await db
    .update(attempts)
    .set({ userId })
    .where(eq(attempts.guestSessionId, guestId));
}
