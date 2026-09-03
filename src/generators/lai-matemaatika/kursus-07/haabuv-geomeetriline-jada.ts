import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-haabuv-geomeetriline-jada";

/** `(k, m)` with `q = m/k`, `|m| < k` — a nice, sign-varied ratio `|q| < 1`. */
type Ratio = { k: number; m: number };

/**
 * Builds `a1 = (k - m)·t` so the sum `a1/(1-q) = a1·k/(k-m) = t·k` is always
 * an integer — nice by construction, no redraw needed.
 */
function buildCase(rng: () => number, ratios: readonly Ratio[]) {
  const { k, m } = pick(rng, ratios);
  const t = int(rng, 1, 9);
  const a1 = (k - m) * t;
  const sum = t * k;
  return { k, m, a1, sum, q: arvVaartus(m, k) };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a1, sum, k, m } = buildCase(rng, [{ k: 2, m: 1 }]);

      return {
        seed: 1,
        kysimus: `\\text{Hääbuva geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = \\dfrac{${m}}{${k}}\\text{. Leia jada summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `S = \\dfrac{a_1}{1-q}`,
          `S = \\dfrac{${a1}}{1-\\frac{${m}}{${k}}} = \\dfrac{${a1}}{\\frac{${k - m}}{${k}}} = ${a1} \\cdot \\dfrac{${k}}{${k - m}} = ${sum}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a1, sum, k, m } = buildCase(rng, [
        { k: 3, m: -1 },
        { k: 3, m: 1 },
      ]);

      return {
        seed: 2,
        kysimus: `\\text{Hääbuva geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = \\dfrac{${m}}{${k}}\\text{. Leia jada summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `S = \\dfrac{a_1}{1-q}`,
          `S = \\dfrac{${a1}}{1-\\frac{${m}}{${k}}} = \\dfrac{${a1}}{\\frac{${k - m}}{${k}}} = ${a1} \\cdot \\dfrac{${k}}{${k - m}} = ${sum}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a1, sum, k, m } = buildCase(rng, [
        { k: 4, m: 3 },
        { k: 4, m: -3 },
        { k: 4, m: -1 },
      ]);

      return {
        seed: 3,
        kysimus: `\\text{Hääbuva geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = \\dfrac{${m}}{${k}}\\text{. Leia jada summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `S = \\dfrac{a_1}{1-q}`,
          `S = \\dfrac{${a1}}{1-\\frac{${m}}{${k}}} = \\dfrac{${a1}}{\\frac{${k - m}}{${k}}} = ${a1} \\cdot \\dfrac{${k}}{${k - m}} = ${sum}`,
        ],
      };
    },
  },
];
