import type { Raskus } from "@/content/types";

/** One answered question, for a single topic — the caller filters by topic
 * before handing a history to a `MasteryModel`. */
export type Katse = {
  oige: boolean;
  raskus: Raskus;
  toimus: Date;
};

/** Display band for a mastery score. Never derived from raw score alone
 * where "no attempts yet" needs distinguishing from "attempted and low". */
export type MasteriaTase = "alustamata" | "algaja" | "edeneb" | "hea" | "kindel";

export type MasteryTulemus = {
  /** 0-100. */
  skoor: number;
  tase: MasteriaTase;
};

/**
 * Computes a topic's mastery from its attempt history. `nyyd` (defaults to
 * `new Date()`) is an injection point for tests only.
 */
export type MasteryModel = {
  arvuta(katsed: Katse[], nyyd?: Date): MasteryTulemus;
};

function taseFor(skoor: number): MasteriaTase {
  if (skoor < 25) return "algaja";
  if (skoor < 50) return "edeneb";
  if (skoor < 80) return "hea";
  return "kindel";
}

const DIFFICULTY_WEIGHT: Record<Raskus, number> = {
  kerge: 1,
  keskmine: 1.5,
  raske: 2,
};

/** Days for a single attempt's influence on the weighted average to halve —
 * an answer from three weeks ago counts for much less than one from
 * yesterday. */
const ATTEMPT_HALF_LIFE_DAYS = 14;

/** Days for the *whole* score to halve once a topic goes untouched — this is
 * what makes a topic "visibly fade" from neglect even if every attempt on
 * record was correct, which per-attempt weighting alone can't do (a
 * weighted average of all-100s is still 100 no matter how old). */
const NEGLECT_HALF_LIFE_DAYS = 45;

function daysBetween(earlier: Date, later: Date): number {
  return Math.max(0, (later.getTime() - earlier.getTime()) / 86_400_000);
}

function halfLifeDecay(days: number, halfLifeDays: number): number {
  return Math.pow(0.5, days / halfLifeDays);
}

/**
 * Real mastery model (Ship 3.5, replacing the trivial rolling-accuracy
 * placeholder): 0-100, weighted by recency and difficulty, decaying toward
 * 0 the longer a topic sits untouched. Never just "percent correct".
 */
export const decayingMastery: MasteryModel = {
  arvuta(katsed, nyyd = new Date()) {
    if (katsed.length === 0) return { skoor: 0, tase: "alustamata" };

    let weightedCorrect = 0;
    let totalWeight = 0;
    let mostRecent = katsed[0].toimus;

    for (const katse of katsed) {
      const age = daysBetween(katse.toimus, nyyd);
      const weight =
        DIFFICULTY_WEIGHT[katse.raskus] *
        halfLifeDecay(age, ATTEMPT_HALF_LIFE_DAYS);
      weightedCorrect += weight * (katse.oige ? 1 : 0);
      totalWeight += weight;
      if (katse.toimus > mostRecent) mostRecent = katse.toimus;
    }

    // All-decayed history (every attempt effectively ancient) — treat as
    // faded to zero rather than dividing by ~0.
    const weightedAccuracy = totalWeight > 0 ? weightedCorrect / totalWeight : 0;

    const neglect = halfLifeDecay(
      daysBetween(mostRecent, nyyd),
      NEGLECT_HALF_LIFE_DAYS,
    );

    const skoor = Math.round(
      Math.min(1, weightedAccuracy * neglect) * 100,
    );
    return { skoor, tase: taseFor(skoor) };
  },
};
