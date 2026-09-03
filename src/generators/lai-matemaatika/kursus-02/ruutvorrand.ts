import { nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "02-ruutvorrand";

/** Formats `a·x² + b·x + c = 0` with correct signs. */
function ruutvorrandString(a: number, b: number, c: number): string {
  const aTerm = a === 1 ? "x^2" : a === -1 ? "-x^2" : `${a}x^2`;
  const bTerm = b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const cTerm = c === 0 ? "" : ` ${c > 0 ? "+" : "-"} ${Math.abs(c)}`;
  return `${aTerm}${bTerm}${cTerm} = 0`;
}

function distinctRoots(rng: Rng, lo: number, hi: number): [number, number] {
  const r1 = nonZeroInt(rng, lo, hi);
  let r2: number;
  do {
    r2 = nonZeroInt(rng, lo, hi);
  } while (r2 === r1);
  return r1 < r2 ? [r1, r2] : [r2, r1];
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [r1, r2] = distinctRoots(rng, -9, 9);
      const b = -(r1 + r2);
      const c = r1 * r2;

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand ja leia suurem juur: } ${ruutvorrandString(1, b, c)}`,
        vastus: { tuup: "arv", ...arvVaartus(r2) },
        lahendus: [
          `\\text{Otsime kaks arvu, mille summa on } ${-b} \\text{ ja korrutis } ${c}\\text{: need on } ${r1} \\text{ ja } ${r2}\\text{.}`,
          `x_1 = ${r1}\\text{, } x_2 = ${r2}\\text{. Suurem juur on } ${r2}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3]);
      const [r1, r2] = distinctRoots(rng, -6, 6);
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand ja leia suurem juur: } ${ruutvorrandString(a, b, c)}`,
        vastus: { tuup: "arv", ...arvVaartus(r2) },
        lahendus: [
          `D = b^2 - 4ac = ${b}^2 - 4 \\cdot ${a} \\cdot ${c} = ${b * b - 4 * a * c}`,
          `x = \\dfrac{-b \\pm \\sqrt{D}}{2a} = \\dfrac{${-b} \\pm ${Math.round(Math.sqrt(b * b - 4 * a * c))}}{${2 * a}}`,
          `x_1 = ${r1}\\text{, } x_2 = ${r2}\\text{. Suurem juur on } ${r2}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 4]);
      const [r1, r2] = distinctRoots(rng, -6, 6);
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const diskriminant = b * b - 4 * a * c;

      return {
        seed: 3,
        kysimus: `\\text{Leia võrrandi } ${ruutvorrandString(a, b, c)} \\text{ diskriminant.}`,
        vastus: { tuup: "arv", ...arvVaartus(diskriminant) },
        lahendus: [
          `D = b^2 - 4ac\\text{, kus } a = ${a}\\text{, } b = ${b}\\text{, } c = ${c}\\text{:}`,
          `D = ${b}^2 - 4 \\cdot ${a} \\cdot ${c} = ${b * b} - ${4 * a * c} = ${diskriminant}`,
        ],
      };
    },
  },
];
