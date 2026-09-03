import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-toenaosuste-korrutamine";

// Denominators kept to 2 or 3 so a product of two of these fractions
// (denominator ≤ 9) always stays nice.
const FRACTIONS = [[1, 2], [1, 3], [2, 3]] as const;

// (n, k): draw 2 of k favourable items from n without replacement — the
// resulting probability (k/n)·((k-1)/(n-1)) reduces to a nice fraction.
const DRAW_TWO = [
  [4, 2],
  [4, 3],
  [5, 2],
  [5, 4],
  [6, 3],
  [3, 2],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [pa, qa] = pick(rng, FRACTIONS);
      const [pb, qb] = pick(rng, FRACTIONS);

      return {
        seed: 1,
        kysimus: `\\text{Sündmused } A \\text{ ja } B \\text{ on sõltumatud. } P(A)=\\dfrac{${pa}}{${qa}}\\text{, } P(B)=\\dfrac{${pb}}{${qb}}\\text{. Leia } P(A\\cap B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(pa * pb, qa * qb) },
        lahendus: [
          `P(A\\cap B) = P(A)\\cdot P(B) = \\dfrac{${pa}}{${qa}}\\cdot\\dfrac{${pb}}{${qb}} = \\dfrac{${pa * pb}}{${qa * qb}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [n, k] = pick(rng, DRAW_TWO);
      const num = k * (k - 1);
      const den = n * (n - 1);

      return {
        seed: 2,
        kysimus: `\\text{Kotis on } ${n} \\text{ palli, millest } ${k} \\text{ on punased. Tõmmatakse järjest (tagasi panemata) } 2 \\text{ palli. Leia tõenäosus, et mõlemad on punased.}`,
        vastus: { tuup: "arv", ...arvVaartus(num, den) },
        lahendus: [
          `P = \\dfrac{${k}}{${n}}\\cdot\\dfrac{${k - 1}}{${n - 1}} = \\dfrac{${num}}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [pa, qa] = pick(rng, FRACTIONS);
      const [pbGivenA, qbGivenA] = pick(rng, FRACTIONS);

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } P(A)=\\dfrac{${pa}}{${qa}} \\text{ ja } P(B|A)=\\dfrac{${pbGivenA}}{${qbGivenA}}\\text{. Leia } P(A\\cap B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(pa * pbGivenA, qa * qbGivenA) },
        lahendus: [
          `P(A\\cap B) = P(A)\\cdot P(B|A) = \\dfrac{${pa}}{${qa}}\\cdot\\dfrac{${pbGivenA}}{${qbGivenA}} = \\dfrac{${pa * pbGivenA}}{${qa * qbGivenA}}`,
        ],
      };
    },
  },
];
