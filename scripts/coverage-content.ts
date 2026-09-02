import { kursused } from "@/content/lai-matemaatika/kursused";
import {
  allTeemad,
  hasExplanation,
  hasFullGeneratorCoverage,
  isFullyAuthored,
  type CoverageTeema,
} from "@/content/coverage";

type Row = {
  Kursus: string;
  Teemasid: number;
  Selgitusi: number;
  Generaatoreid: number;
  "% valmis": string;
};

function rowFor(label: string, teemad: CoverageTeema[]): Row {
  const doneCount = teemad.filter((t) => isFullyAuthored(t.id)).length;
  const percent =
    teemad.length === 0
      ? "–"
      : `${Math.round((doneCount / teemad.length) * 100)}%`;

  return {
    Kursus: label,
    Teemasid: teemad.length,
    Selgitusi: teemad.filter((t) => hasExplanation(t.id)).length,
    Generaatoreid: teemad.filter((t) => hasFullGeneratorCoverage(t.id)).length,
    "% valmis": percent,
  };
}

const rows: Row[] = kursused.map((k) =>
  rowFor(
    `K${k.id} ${k.nimi}`,
    allTeemad.filter((t) => t.kursusId === k.id),
  ),
);
rows.push(rowFor("Eeldused (E)", allTeemad.filter((t) => t.kursusId === "E")));
rows.push(rowFor("KOKKU", allTeemad));

console.table(rows);
