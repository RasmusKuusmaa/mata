import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-soltuvad-ja-soltumatud-sundmused";

// Denominators kept to 2 or 3 so a product of two of these fractions
// (denominator ≤ 9) always stays nice.
const FRACTIONS = [[1, 2], [1, 3], [2, 3]] as const;

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
        kysimus: `\\text{Sündmused } A \\text{ ja } B \\text{ on sõltumatud, } P(A)=\\dfrac{${pa}}{${qa}} \\text{ ja } P(B)=\\dfrac{${pb}}{${qb}}\\text{. Leia } P(A \\cap B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(pa * pb, qa * qb) },
        lahendus: [
          `\\text{Sõltumatute sündmuste korral: } P(A\\cap B)=P(A)\\cdot P(B) = \\dfrac{${pa}}{${qa}}\\cdot\\dfrac{${pb}}{${qb}} = \\dfrac{${pa * pb}}{${qa * qb}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [pa, qa] = pick(rng, FRACTIONS);
      const [pb, qb] = pick(rng, FRACTIONS);
      const isIndependent = pick(rng, [true, false]);
      const [jointNum, jointDen] = isIndependent
        ? [pa * pb, qa * qb]
        : [pa * pb + 1, qa * qb];

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } P(A)=\\dfrac{${pa}}{${qa}}\\text{, } P(B)=\\dfrac{${pb}}{${qb}} \\text{ ja } P(A\\cap B)=\\dfrac{${jointNum}}{${jointDen}}\\text{. Kas sündmused } A \\text{ ja } B \\text{ on sõltumatud?}`,
        vastus: { tuup: "valik", oige: isIndependent ? "jah" : "ei", eksitajad: [isIndependent ? "ei" : "jah"] },
        lahendus: [
          `P(A)\\cdot P(B) = \\dfrac{${pa * pb}}{${qa * qb}}${isIndependent ? `\\text{, mis võrdub } P(A\\cap B)\\text{-ga, seega on sündmused sõltumatud.}` : `\\text{, mis ei võrdu } P(A\\cap B)\\text{-ga, seega ei ole sündmused sõltumatud.}`}`,
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
      const [pBGivenA, qBGivenA] = pick(rng, FRACTIONS);
      const jointNum = pa * pBGivenA;
      const jointDen = qa * qBGivenA;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } P(A)=\\dfrac{${pa}}{${qa}} \\text{ ja tingimuslik tõenäosus } P(B|A)=\\dfrac{${pBGivenA}}{${qBGivenA}}\\text{. Leia } P(A\\cap B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(jointNum, jointDen) },
        lahendus: [
          `P(A\\cap B) = P(A)\\cdot P(B|A) = \\dfrac{${pa}}{${qa}}\\cdot\\dfrac{${pBGivenA}}{${qBGivenA}} = \\dfrac{${jointNum}}{${jointDen}}`,
        ],
      };
    },
  },
];
