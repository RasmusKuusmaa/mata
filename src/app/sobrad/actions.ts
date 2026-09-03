"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import {
  eemaldaSober,
  kinnitaSobrakutse,
  saadaSobrakutse,
} from "@/lib/social/friends";
import { getCurrentUserId } from "@/lib/session/user";

export async function saadaKutseEpostiga(formData: FormData): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");

  const email = String(formData.get("email") ?? "").trim();
  const rows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));
  const target = rows[0];
  if (!target) throw new Error("no account with that email");

  await saadaSobrakutse(userId, target.id);
}

export async function kinnitaKutse(saatjaId: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");
  await kinnitaSobrakutse(userId, saatjaId);
}

export async function eemaldaVoiLoobu(teineId: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");
  await eemaldaSober(userId, teineId);
}
