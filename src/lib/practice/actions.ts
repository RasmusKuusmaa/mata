"use server";

import type { Raskus, TeemaId } from "@/content/types";
import { recordAttempt } from "@/lib/db/guest-sessions";
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
  await recordAttempt({
    guestId,
    teemaId: tulemus.teemaId,
    raskus: tulemus.raskus,
    oige: tulemus.oige,
  });
  return tulemus;
}
