import type { Raskus, TeemaId } from "@/content/types";
import { db } from "./client";
import { attempts, guestSessions } from "./schema";

/** Idempotent: a guest's first attempt creates their session row, every
 * later one is a no-op. */
export async function ensureGuestSession(guestId: string): Promise<void> {
  await db.insert(guestSessions).values({ id: guestId }).onConflictDoNothing();
}

export async function recordAttempt(input: {
  guestId: string;
  /** Set when the caller is signed in — Ship 3.4's guest merge only
   * back-fills history made *before* sign-in; attempts made after sign-in
   * need this set directly so they're attributed without waiting for
   * another merge. */
  userId?: string;
  teemaId: TeemaId;
  raskus: Raskus;
  oige: boolean;
}): Promise<void> {
  await ensureGuestSession(input.guestId);
  await db.insert(attempts).values({
    guestSessionId: input.guestId,
    userId: input.userId,
    teemaId: input.teemaId,
    raskus: input.raskus,
    oige: input.oige,
  });
}
