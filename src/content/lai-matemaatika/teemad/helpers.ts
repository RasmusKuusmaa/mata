import type { Teema } from "@/content/types";

/**
 * The current ainekava (docs/ainekava-2025.pdf) publishes õpitulemused at
 * course granularity, not per fine-grained topic — see the
 * curriculum-opitulemused-granularity memory note. Every topic in a course
 * therefore carries that course's full verbatim outcome array.
 */
export function makeTeemaFactory(kursusId: string, opitulemused: string[]) {
  return (id: string, nimi: string, kirjeldus: string): Teema => ({
    id,
    aine: "lai-matemaatika",
    kursusId,
    nimi,
    kirjeldus,
    opitulemused,
    eeldused: [],
    allikas: ["rok2023"],
    eksamiKate: { 2027: true },
  });
}

/**
 * Chains topics within a course sequentially — each topic's prerequisite is
 * the one before it, since a course is authored and studied top to bottom.
 * `firstEeldused` gives the opening topic's prerequisites (typically the
 * previous course's last topic, or a couple of E-series basics for the very
 * first course). `overrides` replaces or extends specific topics' eeldused
 * where the sequential default is pedagogically wrong — most often at a
 * mid-course theme shift that needs a cross-course or E-series link instead
 * of (or in addition to) the immediately preceding topic.
 */
export function withSequentialEeldused<T extends { id: string; eeldused: string[] }>(
  teemad: T[],
  firstEeldused: string[],
  overrides: Record<number, string[]> = {},
): T[] {
  return teemad.map((t, i) => {
    if (i in overrides) return { ...t, eeldused: overrides[i] };
    return { ...t, eeldused: i === 0 ? firstEeldused : [teemad[i - 1].id] };
  });
}
