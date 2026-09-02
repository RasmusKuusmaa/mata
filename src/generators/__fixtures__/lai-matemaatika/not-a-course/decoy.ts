import type { Generaator } from "@/generators/types";

/**
 * Fixture proving discoverGenerators only walks `kursus-NN` directories.
 * Lives outside that naming convention on purpose.
 */
export const shouldBeIgnored: Generaator = {
  aine: "lai-matemaatika",
  teemaId: "99-fixture-teema",
  raskus: "kerge",
  genereeri: (_rng) => ({
    seed: 98,
    kysimus: "should never be discovered",
    vastus: { tuup: "arv", kuju: "taisarv", vaartus: 0 },
    lahendus: ["n/a"],
  }),
};
