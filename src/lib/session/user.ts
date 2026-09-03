import { auth } from "@/lib/auth/config";

export type KasutajaSeis = {
  id: string;
  nimi: string | null;
  pilt: string | null;
};

/** The signed-in user, or `null` for a guest — the one place every signed-
 * in-only feature (gamification, notes, the review flag, friends) reads
 * from, so none of them need to know how Auth.js's session shape works. */
export async function getCurrentUser(): Promise<KasutajaSeis | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return {
    id: session.user.id,
    nimi: session.user.name ?? null,
    pilt: session.user.image ?? null,
  };
}

export async function getCurrentUserId(): Promise<string | null> {
  return (await getCurrentUser())?.id ?? null;
}
