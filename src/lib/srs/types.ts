/** A topic's spaced-repetition state. `null` means never reviewed. */
export type LabivaatuseSeis = {
  jargmineLabivaatus: Date;
  intervallPaevades: number;
};

/**
 * Decides when a topic next comes due for review. Ship 4.1 swaps the
 * trivial `alwaysDueScheduler` below for SM-2-lite over topics (misses
 * shorten the interval, hits lengthen it) — no call site changes, same
 * interface.
 */
export type ReviewScheduler = {
  /** The state after the latest attempt (`oigeVastus`), given the previous
   * state (`null` if never reviewed) and the current time. */
  jargmine(
    eelmine: LabivaatuseSeis | null,
    oigeVastus: boolean,
    praegu: Date,
  ): LabivaatuseSeis;
  /** Whether a topic in this state (`null` if never reviewed) is due now. */
  onTahtaegne(seis: LabivaatuseSeis | null, praegu: Date): boolean;
};

/** Trivial scheduler: every topic is always due. Ship 4.1 replaces this. */
export const alwaysDueScheduler: ReviewScheduler = {
  jargmine(_eelmine, _oigeVastus, praegu) {
    return { jargmineLabivaatus: praegu, intervallPaevades: 0 };
  },
  onTahtaegne(_seis, _praegu) {
    return true;
  },
};
