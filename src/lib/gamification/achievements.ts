import type { KursusId, TeemaId } from "@/content/types";
import type { MasteriaTase } from "@/lib/mastery/types";

/** Everything an achievement's criteria might need to know about a user,
 * gathered by the caller from `topic_state`/`exam_runs`/`user_stats` — this
 * module stays a pure function over that snapshot so its criteria are
 * unit-testable without a database. */
export type SaavutusteKontekst = {
  masteryByTeema: Partial<Record<TeemaId, MasteriaTase>>;
  /** Courses (kursused, "01".."14") with at least one attempted topic. The
   * "E" prerequisite series is tracked separately below. */
  kursusedAlustatud: Set<KursusId>;
  /** Every mandatory course id, so "all fourteen started" can be checked
   * without this module importing the curriculum data directly. */
  koikKursused: KursusId[];
  /** Every prerequisite (E-series) topic id. */
  eeldusteTeemad: TeemaId[];
  labitudEksameid: number;
  streakLongest: number;
  /** True the first time activity resumes after a streak that had reached
   * at least a week, then broke — a deliberate "welcome back", not a
   * volume metric. */
  taastusKatkenudStreakist: boolean;
};

export type Saavutus = {
  id: string;
  nimi: string;
  kirjeldus: string;
  saavutatud: (kontekst: SaavutusteKontekst) => boolean;
};

function onVahemalt(tase: MasteriaTase | undefined, lavi: MasteriaTase): boolean {
  const jarjekord: MasteriaTase[] = [
    "alustamata",
    "algaja",
    "edeneb",
    "hea",
    "kindel",
  ];
  if (tase === undefined) return false;
  return jarjekord.indexOf(tase) >= jarjekord.indexOf(lavi);
}

/** The achievement catalogue (todo.md Ship 4.10 plus the "comeback" idea
 * from `docs/FEATURES.md`). Criteria are about mastery and coverage, never
 * raw question volume — grinding isn't the point. */
export const SAAVUTUSED: Saavutus[] = [
  {
    id: "esimene-kindel-teema",
    nimi: "Esimene samm",
    kirjeldus: "Sa saavutasid esimese teema 'kindel' taseme.",
    saavutatud: (k) =>
      Object.values(k.masteryByTeema).some((tase) => tase === "kindel"),
  },
  {
    id: "eeldused-labitud",
    nimi: "Kindel alus",
    kirjeldus: "Kõik põhikooli kordamisteemad on vähemalt 'hea' tasemel.",
    saavutatud: (k) =>
      k.eeldusteTeemad.length > 0 &&
      k.eeldusteTeemad.every((id) => onVahemalt(k.masteryByTeema[id], "hea")),
  },
  {
    id: "koik-kursused-alustatud",
    nimi: "Suur pilt",
    kirjeldus: "Sa oled proovinud kõiki neljateist kursust.",
    saavutatud: (k) =>
      k.koikKursused.length > 0 &&
      k.koikKursused.every((id) => k.kursusedAlustatud.has(id)),
  },
  {
    id: "esimene-eksam",
    nimi: "Peaproov",
    kirjeldus: "Sa läbisid oma esimese täispika prooveksami.",
    saavutatud: (k) => k.labitudEksameid >= 1,
  },
  {
    id: "nadalane-streak",
    nimi: "Harjumus",
    kirjeldus: "Seitse päeva järjest harjutamist.",
    saavutatud: (k) => k.streakLongest >= 7,
  },
  {
    id: "tagasituleku-kangelane",
    nimi: "Tagasituleku kangelane",
    kirjeldus: "Sa naasid pärast katkenud harjutusjärjestust — igaüks vahel katkeb.",
    saavutatud: (k) => k.taastusKatkenudStreakist,
  },
];

/** Which achievement ids in the catalogue newly unlock given `kontekst`,
 * excluding any already in `varemSaavutatud` — the caller persists the
 * union of `varemSaavutatud` and this result. */
export function uuedSaavutused(
  kontekst: SaavutusteKontekst,
  varemSaavutatud: ReadonlySet<string>,
): string[] {
  return SAAVUTUSED.filter(
    (saavutus) =>
      !varemSaavutatud.has(saavutus.id) && saavutus.saavutatud(kontekst),
  ).map((saavutus) => saavutus.id);
}
