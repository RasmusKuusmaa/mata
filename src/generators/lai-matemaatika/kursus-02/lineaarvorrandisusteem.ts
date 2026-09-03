import { nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-lineaarvorrandisusteem";

function vorrandString(a: number, b: number, muutujad: [string, string]): string {
  const [x, y] = muutujad;
  const aTerm = a === 1 ? x : a === -1 ? `-${x}` : `${a}${x}`;
  const bTerm = b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}${y}`;
  return `${aTerm}${bTerm}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);
      const a1 = nonZeroInt(rng, 1, 6);
      const b1 = nonZeroInt(rng, 1, 6);
      const a2 = nonZeroInt(rng, 1, 6);
      const b2 = nonZeroInt(rng, 1, 6);
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x - b2 * y;

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrandisüsteem ja leia } x\\text{:} \\begin{cases} ${vorrandString(a1, b1, ["x", "y"])} = ${c1} \\\\ ${vorrandString(a2, -b2, ["x", "y"])} = ${c2} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Lahendame liitmismeetodil või asendusmeetodil.}`,
          `x = ${x}\\text{, } y = ${y}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -8, 8);
      const y = nonZeroInt(rng, -8, 8);
      const a1 = nonZeroInt(rng, 1, 6);
      const b1 = nonZeroInt(rng, 1, 6);
      const a2 = nonZeroInt(rng, 1, 6);
      const b2 = nonZeroInt(rng, 1, 6);
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x - b2 * y;
      const tulemus = x + y;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrandisüsteem ja leia } x + y\\text{:} \\begin{cases} ${vorrandString(a1, b1, ["x", "y"])} = ${c1} \\\\ ${vorrandString(a2, -b2, ["x", "y"])} = ${c2} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Lahendame liitmismeetodil või asendusmeetodil.}`,
          `x = ${x}\\text{, } y = ${y}\\text{, seega } x + y = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const z = nonZeroInt(rng, -6, 6);
      const c1 = x + y + z;
      const c2 = x - y + z;
      const c3 = x + y - z;
      const tulemus = x + y + z;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrandisüsteem ja leia } x + y + z\\text{:} \\begin{cases} x + y + z = ${c1} \\\\ x - y + z = ${c2} \\\\ x + y - z = ${c3} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `x = ${x}\\text{, } y = ${y}\\text{, } z = ${z}`,
          `x + y + z = ${tulemus}`,
        ],
      };
    },
  },
];
