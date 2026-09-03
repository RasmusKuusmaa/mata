import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-kraadi-ja-radiaanmoot";

const COMMON_DEGREES = [
  30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330,
] as const;

/** Divisors of 180, so `180 * k / n` is always an integer. */
const RADIAN_DENOMINATORS = [2, 3, 4, 5, 6, 9, 10, 12] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const deg = pick(rng, COMMON_DEGREES);
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const g = gcd(deg, 180);

      return {
        seed: 1,
        kysimus: `\\text{Teisenda nurk } ${deg}^\\circ \\text{ radiaanmõõtu (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: deg / g, denominator: 180 / g } },
        lahendus: [
          `\\text{Kraadimõõt teisendatakse radiaanideks valemiga } \\alpha_{rad} = \\dfrac{\\alpha^\\circ \\cdot \\pi}{180^\\circ}\\text{:}`,
          `${deg}^\\circ = \\dfrac{${deg}\\pi}{180} = \\dfrac{${deg / g}\\pi}{${180 / g}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = pick(rng, RADIAN_DENOMINATORS);
      let k = int(rng, 1, 2 * n - 1);
      while (k === n) k = int(rng, 1, 2 * n - 1); // skip the trivial k/n = 1 (π rad)
      const deg = (180 * k) / n;

      return {
        seed: 2,
        kysimus: `\\text{Teisenda nurk } \\dfrac{${k}\\pi}{${n}} \\text{ kraadimõõtu.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: deg },
        lahendus: [
          `\\text{Radiaanmõõt teisendatakse kraadideks valemiga } \\alpha^\\circ = \\dfrac{\\alpha_{rad} \\cdot 180^\\circ}{\\pi}\\text{:}`,
          `\\dfrac{${k}\\pi}{${n}} = \\dfrac{${k} \\cdot 180^\\circ}{${n}} = ${deg}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const angle = pick(rng, COMMON_DEGREES);
      const k = int(rng, 1, 3);
      const sign = pick(rng, [1, -1] as const);
      const raw = angle * sign + 360 * k;
      const principal = ((raw % 360) + 360) % 360;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const g = gcd(principal || 1, 180);

      return {
        seed: 3,
        kysimus: `\\text{Nurk on } ${raw}^\\circ\\text{. Leia selle nurga radiaanmõõt vahemikus } [0, 2\\pi)\\text{ (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator: principal === 0 ? 0 : principal / g, denominator: principal === 0 ? 1 : 180 / g },
        },
        lahendus: [
          `\\text{Taandame nurga vahemikku } [0^\\circ, 360^\\circ)\\text{:}`,
          `${raw}^\\circ \\to ${principal}^\\circ`,
          principal === 0
            ? `${principal}^\\circ = 0`
            : `${principal}^\\circ = \\dfrac{${principal}\\pi}{180} = \\dfrac{${principal / g}\\pi}{${180 / g}}`,
        ],
      };
    },
  },
];
