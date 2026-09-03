import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-parabool";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const x = int(rng, -6, 6);

      return {
        seed: 1,
        kysimus: `\\text{Parabool on } y=${a}x^2\\text{. Leia } y\\text{, kui } x=${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a * x * x },
        lahendus: [`y = ${a}\\cdot${x}^2 = ${a * x * x}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const term = h === 0 ? "x" : h > 0 ? `(x-${h})` : `(x+${-h})`;

      return {
        seed: 2,
        kysimus: `\\text{Parabool on } y=${term}^2 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}\\text{. Leia parabooli tipu } y\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Tipp on kohal } x=${h}\\text{, kus ruut on } 0\\text{: } y=0 ${k >= 0 ? "+" : "-"} ${Math.abs(k)} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const p = pick(rng, [1, 2, 3, 4, 5] as const);
      const k = int(rng, 1, 3);
      const y = 2 * p * k;
      const x = 2 * p * k * k;

      return {
        seed: 3,
        kysimus: `\\text{Parabool on } y^2=${2 * p}x\\text{. Leia } x\\text{, kui } y=${y}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [`x = \\dfrac{y^2}{${2 * p}} = \\dfrac{${y}^2}{${2 * p}} = \\dfrac{${y * y}}{${2 * p}} = ${x}`],
      };
    },
  },
];
