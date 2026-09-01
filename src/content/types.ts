/**
 * Curriculum type definitions. Content is TypeScript data living under
 * src/content — the database holds only user data (see todo.md ground
 * rules). No file under src/content imports from src/app, so content stays
 * extractable to a separate package later.
 */

/** Extension point: adding kitsa matemaatika, füüsika etc. is new content
 * files under a new `aine` value, not a schema change. */
export type Aine = "lai-matemaatika";

export type Raskus = "kerge" | "keskmine" | "raske";

/** "01".."14" for the fourteen mandatory courses, or "E" for the
 * prerequisite (basic-school refresher) series. Zero-padded to match the
 * `src/generators/<aine>/kursus-NN/` directory convention (Ship 0.23). */
export type KursusId = string;

export type TeemaId = string;

export type Kursus = {
  id: KursusId;
  aine: Aine;
  /** 1-based position in the mandatory course sequence. */
  jrk: number;
  nimi: string;
};

type TeemaBase = {
  id: TeemaId;
  aine: Aine;
  nimi: string;
  kirjeldus: string;
  opitulemused: string[];
  eeldused: TeemaId[];
};

export type Teema = TeemaBase & {
  kursusId: KursusId;
  /** Which national curriculum(s) this topic's õpitulemused come from. */
  allikas: ("rok2011" | "rok2023")[];
  /** Keyed by exam year, e.g. `{ 2027: true }`. Populated from Harno's
   * eristuskiri exclusion list (Ship 0.17). Never delete a topic because one
   * year's paper skips it — this flag drives display, not content removal. */
  eksamiKate: Record<number, boolean>;
};

/** Põhikool refresher topics, surfaced on demand — never a browsable track,
 * so they carry no curriculum source or exam-coverage flags. */
export type Eeldusteema = TeemaBase & {
  kursusId: "E";
};
