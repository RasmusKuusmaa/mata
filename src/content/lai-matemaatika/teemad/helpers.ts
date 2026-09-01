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
