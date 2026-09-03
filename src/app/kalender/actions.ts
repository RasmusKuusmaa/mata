"use server";

import {
  getPaevaTeemad as getPaevaTeemadDb,
  salvestaPeegeldus as salvestaPeegeldusDb,
  type PaevaTeema,
} from "@/lib/analytics/calendar";
import { getCurrentUserId } from "@/lib/session/user";

export async function salvestaPeegeldus(date: string, tekst: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("not signed in");
  await salvestaPeegeldusDb(userId, date, tekst);
}

export async function getPaevaTeemad(date: string): Promise<PaevaTeema[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];
  return getPaevaTeemadDb(userId, date);
}
