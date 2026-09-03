"use server";

import type { TeemaId } from "@/content/types";
import { getNote, saveNote } from "@/lib/db/notes";
import { getTopicState, setManualReview } from "@/lib/db/topic-state";
import { getCurrentUserId } from "@/lib/session/user";

export type TeemaKasutajaAndmed = {
  manualReview: boolean;
  sisu: string;
};

/** `null` for a guest — the caller renders nothing personalized rather
 * than a broken/empty form. */
export async function getTeemaKasutajaAndmed(
  teemaId: TeemaId,
): Promise<TeemaKasutajaAndmed | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const [state, note] = await Promise.all([
    getTopicState(userId, teemaId),
    getNote(userId, teemaId),
  ]);
  return {
    manualReview: state?.manualReview ?? false,
    sisu: note?.sisu ?? "",
  };
}

export async function lulitaKordamine(
  teemaId: TeemaId,
  uusVaartus: boolean,
): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");
  await setManualReview(userId, teemaId, uusVaartus);
}

export async function salvestaMarkmed(
  teemaId: TeemaId,
  sisu: string,
): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");
  await saveNote(userId, teemaId, sisu);
}
