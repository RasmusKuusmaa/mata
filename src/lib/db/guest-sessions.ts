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
  teemaId: TeemaId;
  raskus: Raskus;
  oige: boolean;
}): Promise<void> {
  await ensureGuestSession(input.guestId);
  await db.insert(attempts).values({
    guestSessionId: input.guestId,
    teemaId: input.teemaId,
    raskus: input.raskus,
    oige: input.oige,
  });
}
