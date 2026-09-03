"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/session/user";

/** Sets the user's own exam date (todo.md Ship 4.5) — creates the
 * `user_stats` row if this is the account's first write to it. */
export async function seadistaEksamiKuupaev(formData: FormData): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");

  const kuupaev = String(formData.get("eksamiKuupaev") ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(kuupaev)) return;

  await db
    .insert(userStats)
    .values({ userId, eksamiKuupaev: kuupaev })
    .onConflictDoUpdate({
      target: userStats.userId,
      set: { eksamiKuupaev: kuupaev },
    });
}

export async function getEksamiKuupaev(userId: string): Promise<string | null> {
  const rows = await db
    .select({ eksamiKuupaev: userStats.eksamiKuupaev })
    .from(userStats)
    .where(eq(userStats.userId, userId));
  return rows[0]?.eksamiKuupaev ?? null;
}
