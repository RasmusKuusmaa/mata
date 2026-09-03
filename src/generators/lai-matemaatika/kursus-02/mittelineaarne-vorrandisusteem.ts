import { nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "02-mittelineaarne-vorrandisusteem";

function distinctPair(rng: Rng): [number, number] {
  const x = nonZeroInt(rng, -9, 9);
  let y: number;
  do {
    y = nonZeroInt(rng, -9, 9);
  } while (y === x);
  return [x, y];
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [x, y] = distinctPair(rng);
      const s = x + y;
      const p = x * y;
      const suurim = Math.max(x, y);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda süsteem ja leia suurem tundmatu väärtus:} \\begin{cases} x + y = ${s} \\\\ xy = ${p} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `\\text{Asendame } y = ${s} - x \\text{ teise võrrandisse: } x(${s} - x) = ${p}\\text{.}`,
          `\\text{Lahendid: } x = ${x}\\text{, } y = ${y}\\text{ (või vastupidi). Suurem väärtus on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [x, y] = distinctPair(rng);
      const d = x - y;
      const p = x * y;
      const suurim = Math.max(x, y);

      return {
        seed: 2,
        kysimus: `\\text{Lahenda süsteem ja leia suurem tundmatu väärtus:} \\begin{cases} x - y = ${d} \\\\ xy = ${p} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `\\text{Asendame } x = y + ${d} \\text{ teise võrrandisse: } (y + ${d})y = ${p}\\text{.}`,
          `\\text{Lahendid: } x = ${x}\\text{, } y = ${y}\\text{. Suurem väärtus on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [x, y] = distinctPair(rng);
      const s = x + y;
      const ruutudeSumma = x * x + y * y;
      const p = x * y;

      return {
        seed: 3,
        kysimus: `\\text{Leia } xy\\text{, kui:} \\begin{cases} x + y = ${s} \\\\ x^2 + y^2 = ${ruutudeSumma} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(p) },
        lahendus: [
          `\\text{Kasutame seost } (x+y)^2 = x^2 + 2xy + y^2\\text{:}`,
          `${s}^2 = ${ruutudeSumma} + 2xy`,
          `xy = \\dfrac{${s * s} - ${ruutudeSumma}}{2} = ${p}`,
        ],
      };
    },
  },
];
