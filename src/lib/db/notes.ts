import { and, desc, eq } from "drizzle-orm";
import type { TeemaId } from "@/content/types";
import { db } from "./client";
import { notes } from "./schema";

export type Note = typeof notes.$inferSelect;

export async function getNote(
  userId: string,
  teemaId: TeemaId,
): Promise<Note | null> {
  const rows = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, userId), eq(notes.teemaId, teemaId)));
  return rows[0] ?? null;
}

export async function getAllNotes(userId: string): Promise<Note[]> {
  return db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(desc(notes.updatedAt));
}

/**
 * Upserts a topic's note (todo.md Ship 3.10) — one row per user per topic,
 * safe to call on every debounced autosave tick from the client.
 */
export async function saveNote(
  userId: string,
  teemaId: TeemaId,
  sisu: string,
): Promise<void> {
  const existing = await getNote(userId, teemaId);
  if (existing) {
    await db
      .update(notes)
      .set({ sisu, updatedAt: new Date() })
      .where(eq(notes.id, existing.id));
    return;
  }
  await db.insert(notes).values({ userId, teemaId, sisu });
}
