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
 * Computes a topic's mastery from its attempt history. Ship 3.5 swaps the
 * trivial `rollingAccuracyMastery` below for a decaying, difficulty- and
 * recency-weighted implementation — no call site changes, same interface.
 */
export type MasteryModel = {
  arvuta(katsed: Katse[]): MasteryTulemus;
};

function taseFor(skoor: number): MasteriaTase {
  if (skoor < 25) return "algaja";
  if (skoor < 50) return "edeneb";
  if (skoor < 80) return "hea";
  return "kindel";
}

/** Trivial mastery: percent of attempts answered correctly. Ignores
 * difficulty and recency — Ship 3.5 replaces this. */
export const rollingAccuracyMastery: MasteryModel = {
  arvuta(katsed) {
    if (katsed.length === 0) return { skoor: 0, tase: "alustamata" };
    const oigeid = katsed.filter((k) => k.oige).length;
    const skoor = Math.round((oigeid / katsed.length) * 100);
    return { skoor, tase: taseFor(skoor) };
  },
};
