import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { friendships, users } from "@/lib/db/schema";

/**
 * Mutual-follow friends (base-version gamification, added at Rasmus's
 * request alongside Ship 4 — see `QUESTIONS.md`'s 2026-09-04 entry and
 * `docs/FEATURES.md` section 4). A request is one row, `pending`, from
 * requester to target. Accepting writes **two** `accepted` rows — one per
 * direction — so "list my friends" is always a simple one-sided query
 * (`where userId = me and status = 'accepted'`) rather than needing an OR
 * across both columns on every read. There is deliberately no query here
 * that ranks or lists anyone beyond a user's own accepted friends and
 * pending requests — no global or public listing exists in this module.
 */

export type Sober = {
  id: string;
  nimi: string | null;
  pilt: string | null;
};

/** Sends a friend request. A no-op if a row between these two ids already
 * exists in either direction (pending or accepted) — idempotent, so a
 * double-click or retry never errors. */
export async function saadaSobrakutse(
  saatjaId: string,
  saajaId: string,
): Promise<void> {
  if (saatjaId === saajaId) {
    throw new Error("cannot send a friend request to yourself");
  }

  const olemasolev = await db
    .select({ userId: friendships.userId })
    .from(friendships)
    .where(
      and(eq(friendships.userId, saajaId), eq(friendships.friendId, saatjaId)),
    );
  if (olemasolev.length > 0) return; // they already requested/accepted us

  await db
    .insert(friendships)
    .values({ userId: saatjaId, friendId: saajaId, status: "pending" })
    .onConflictDoNothing();
}

/** Accepts a pending request addressed to `saajaId` from `saatjaId`,
 * writing both directions as `accepted` in one transaction. Throws if no
 * such pending request exists — the caller only offers this action for a
 * request it already knows is pending. */
export async function kinnitaSobrakutse(
  saajaId: string,
  saatjaId: string,
): Promise<void> {
  await db.transaction(async (tx) => {
    const updated = await tx
      .update(friendships)
      .set({ status: "accepted" })
      .where(
        and(
          eq(friendships.userId, saatjaId),
          eq(friendships.friendId, saajaId),
          eq(friendships.status, "pending"),
        ),
      )
      .returning({ userId: friendships.userId });

    if (updated.length === 0) {
      throw new Error("no pending friend request from this user");
    }

    await tx
      .insert(friendships)
      .values({ userId: saajaId, friendId: saatjaId, status: "accepted" })
      .onConflictDoUpdate({
        target: [friendships.userId, friendships.friendId],
        set: { status: "accepted" },
      });
  });
}

/** Declines a pending request, or removes an existing friendship — either
 * way, deletes both directions so no stale one-sided row lingers. */
export async function eemaldaSober(
  userId: string,
  teineId: string,
): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .delete(friendships)
      .where(
        and(eq(friendships.userId, userId), eq(friendships.friendId, teineId)),
      );
    await tx
      .delete(friendships)
      .where(
        and(eq(friendships.userId, teineId), eq(friendships.friendId, userId)),
      );
  });
}

/** This user's accepted friends. */
export async function getSobrad(userId: string): Promise<Sober[]> {
  const rows = await db
    .select({ id: users.id, nimi: users.name, pilt: users.image })
    .from(friendships)
    .innerJoin(users, eq(users.id, friendships.friendId))
    .where(and(eq(friendships.userId, userId), eq(friendships.status, "accepted")));
  return rows;
}

/** Pending requests addressed to this user, awaiting their response. */
export async function getOotelKutsed(userId: string): Promise<Sober[]> {
  const rows = await db
    .select({ id: users.id, nimi: users.name, pilt: users.image })
    .from(friendships)
    .innerJoin(users, eq(users.id, friendships.userId))
    .where(and(eq(friendships.friendId, userId), eq(friendships.status, "pending")));
  return rows;
}
