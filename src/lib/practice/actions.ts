"use server";

import type { Raskus, TeemaId } from "@/content/types";
import * as session from "./session";
import type { KontrolliTulemus, Seeria } from "./session";

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

export async function kontrolliVastust(
  token: string,
  indeks: number,
  sisend: string,
): Promise<KontrolliTulemus> {
  return session.kontrolliVastust(token, indeks, sisend);
}
