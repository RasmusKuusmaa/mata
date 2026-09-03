import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-arvjada-moiste-ja-uldliige";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = int(rng, -9, 9);
      const n = int(rng, 2, 20);
      const value = a * n + b;

      return {
        seed: 1,
        kysimus: `\\text{Jada üldliige on } a_n = ${a}n ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Leia } a_{${n}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `a_{${n}} = ${a} \\cdot ${n} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const n = int(rng, 2, 10);
      const value = a * n * n + b;

      return {
        seed: 2,
        kysimus: `\\text{Jada üldliige on } a_n = ${a}n^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Leia } a_{${n}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `a_{${n}} = ${a} \\cdot ${n}^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a * n * n} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = int(rng, -9, 9);
      const n0 = int(rng, 2, 20);
      const target = a * n0 + b;

      return {
        seed: 3,
        kysimus: `\\text{Jada üldliige on } a_n = ${a}n ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Mitmenda liikme väärtus on } ${target}\\text{?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n0 },
        lahendus: [
          `${a}n ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${target} \\quad \\Rightarrow \\quad n = ${n0}`,
        ],
      };
    },
  },
];
