"use server";

import type { Raskus, TeemaId } from "@/content/types";
import { getUnlockedAchievementIds, unlockAchievements } from "@/lib/db/achievements";
import { recordAttempt } from "@/lib/db/guest-sessions";
import { paivitaMasterySeis } from "@/lib/db/topic-state";
import { uuedSaavutused } from "@/lib/gamification/achievements";
import { rakendaKatseTulemus } from "@/lib/gamification/apply-attempt";
import { koostaSaavutusteKontekst } from "@/lib/gamification/context";
import { getGuestId } from "@/lib/session/server";
import * as session from "./session";
import type { KontrolliTulemus, Seeria, TeemaRaskusValik } from "./session";

/** Server action wrapping `alustaSeeria` with production defaults (real
 * generator registry, non-deterministic rng) — the injectable `rng`/`root`
 * params stay test-only, out of the client-callable surface. */
export async function alustaSeeria(
  teemaId: TeemaId,
  raskus: Raskus,
  kogus: number,
): Promise<Seeria> {
  return session.alustaSeeria(teemaId, raskus, kogus);
}

/** Server action wrapping `alustaKohandatudSeeria` — the custom test
 * builder's entry point, mixing any number of topic/difficulty choices into
 * one session. */
export async function koostaTest(
  valikud: TeemaRaskusValik[],
  kogus: number,
): Promise<Seeria> {
  return session.alustaKohandatudSeeria(valikud, kogus);
}

/** Grades the answer, then records it against the caller's guest session
 * (Ship 1.7) — progress persists across visits even before there's an
 * account to attach it to. */
export async function kontrolliVastust(
  token: string,
  indeks: number,
  sisend: string,
): Promise<KontrolliTulemus> {
  const tulemus = await session.kontrolliVastust(token, indeks, sisend);
  const guestId = await getGuestId();
  // Dynamically imported (rather than a static top-level import) because
  // this module transitively pulls in next-auth, which a client component
  // test that merely renders — never calls — this "use server" action
  // would otherwise be forced to load too. Production behavior is
  // unaffected; this only changes *when* the import happens, not whether.
  const { getCurrentUserId } = await import("@/lib/session/user");
  const userId = await getCurrentUserId();
  await recordAttempt({
    guestId,
    userId: userId ?? undefined,
    teemaId: tulemus.teemaId,
    raskus: tulemus.raskus,
    oige: tulemus.oige,
  });

  // Gamification only accumulates for real accounts — there's no schema for
  // guest xp/streaks/achievements, and that's intentional (todo.md Ship 4).
  if (userId) {
    await paivitaMasterySeis(userId, tulemus.teemaId);
    await rakendaKatseTulemus(userId, {
      teemaId: tulemus.teemaId,
      raskus: tulemus.raskus,
      oige: tulemus.oige,
    });
    const kontekst = await koostaSaavutusteKontekst(userId);
    const varemSaavutatud = await getUnlockedAchievementIds(userId);
    const uued = uuedSaavutused(kontekst, varemSaavutatud);
    await unlockAchievements(userId, uued);
  }

  return tulemus;
}
