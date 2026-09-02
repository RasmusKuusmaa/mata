import type { Kursus, Teema } from "@/content/types";

export type TeemaRyhm = {
  kursus: Kursus;
  teemad: Teema[];
};

function matches(teema: Teema, query: string): boolean {
  if (teema.nimi.toLowerCase().includes(query)) return true;
  return teema.opitulemused.some((opitulemus) =>
    opitulemus.toLowerCase().includes(query),
  );
}

/**
 * Groups topics under their course, in course order, optionally filtered
 * by a search query matched against a topic's name and õpitulemused. A
 * course with no matching topics is dropped entirely while searching.
 */
export function groupTeemad(
  kursused: Kursus[],
  teemad: Teema[],
  query: string,
): TeemaRyhm[] {
  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  return kursused
    .slice()
    .sort((a, b) => a.jrk - b.jrk)
    .map((kursus) => ({
      kursus,
      teemad: teemad
        .filter((teema) => teema.kursusId === kursus.id)
        .filter((teema) => !isSearching || matches(teema, trimmedQuery)),
    }))
    .filter((ryhm) => !isSearching || ryhm.teemad.length > 0);
}
