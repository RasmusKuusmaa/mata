import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-intervallmeetod";
const POSITIIVNE = "Positiivne";
const NEGATIIVNE = "Negatiivne";
const NULL = "Null";

function teguriteSumma(roots: number[]): string {
  return roots
    .map((r) => (r >= 0 ? `(x - ${r})` : `(x + ${-r})`))
    .join("");
}

function margiOige(roots: number[], x: number): string {
  const vaartus = roots.reduce((acc, r) => acc * (x - r), 1);
  return vaartus > 0 ? POSITIIVNE : vaartus < 0 ? NEGATIIVNE : NULL;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r1 = nonZeroInt(rng, -8, 8);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -8, 8);
        } while (v === r1);
        return v;
      })();
      const roots = [r1, r2];
      const x = int(rng, Math.min(r1, r2) - 5, Math.max(r1, r2) + 5);
      const oige = margiOige(roots, x);

      return {
        seed: 1,
        kysimus: `\\text{Milline on avaldise } ${teguriteSumma(roots)} \\text{ märk kohal } x = ${x}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [POSITIIVNE, NEGATIIVNE, NULL].filter((v) => v !== oige) },
        lahendus: [
          `\\text{Paigutame } x = ${x}\\text{: teeme kindlaks iga teguri märgi ja korrutame.}`,
          `\\text{Vastus: } \\text{${oige}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const roots: number[] = [];
      while (roots.length < 3) {
        const v = nonZeroInt(rng, -7, 7);
        if (!roots.includes(v)) roots.push(v);
      }
      const min = Math.min(...roots);
      const max = Math.max(...roots);
      const x = int(rng, min - 4, max + 4);
      const oige = margiOige(roots, x);

      return {
        seed: 2,
        kysimus: `\\text{Milline on avaldise } ${teguriteSumma(roots)} \\text{ märk kohal } x = ${x}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [POSITIIVNE, NEGATIIVNE, NULL].filter((v) => v !== oige) },
        lahendus: [
          `\\text{Nullkohad on } ${roots.join(", ")}\\text{. Paigutame } x = ${x} \\text{ igasse tegurisse ja korrutame märgid.}`,
          `\\text{Vastus: } \\text{${oige}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // A squared (always ≥ 0) factor alongside two simple factors.
      const r1 = nonZeroInt(rng, -7, 7);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -7, 7);
        } while (v === r1);
        return v;
      })();
      const r3 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -7, 7);
        } while (v === r1 || v === r2);
        return v;
      })();
      const min = Math.min(r1, r2, r3);
      const max = Math.max(r1, r2, r3);
      const x = int(rng, min - 4, max + 4);
      const avaldis = `(x - ${r1})^2(x ${r2 >= 0 ? "-" : "+"} ${Math.abs(r2)})(x ${r3 >= 0 ? "-" : "+"} ${Math.abs(r3)})`;
      const vaartus = (x - r1) ** 2 * (x - r2) * (x - r3);
      const oige = vaartus > 0 ? POSITIIVNE : vaartus < 0 ? NEGATIIVNE : NULL;

      return {
        seed: 3,
        kysimus: `\\text{Milline on avaldise } ${avaldis} \\text{ märk kohal } x = ${x}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [POSITIIVNE, NEGATIIVNE, NULL].filter((v) => v !== oige) },
        lahendus: [
          `\\text{Ruudus tegur } (x-${r1})^2 \\text{ on alati mittenegatiivne — see ei muuda märki, ainult "läbib" nulli ilma märki vahetamata.}`,
          `\\text{Vastus: } \\text{${oige}}`,
        ],
      };
    },
  },
];
