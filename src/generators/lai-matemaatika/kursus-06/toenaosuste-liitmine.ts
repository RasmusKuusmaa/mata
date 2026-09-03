import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-toenaosuste-liitmine";

// (pa/qa, pb/qb) pairs with qa·qb ≤ 12, so any fraction built directly on
// that product (e.g. 1/(qa·qb) for an intersection) stays nice unreduced.
const PROBABILITY_PAIRS = [
  [1, 2, 1, 3],
  [1, 2, 1, 4],
  [1, 3, 1, 4],
  [1, 6, 1, 2],
  [1, 3, 1, 2],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [pa, qa, pb, qb] = pick(rng, PROBABILITY_PAIRS);

      return {
        seed: 1,
        kysimus: `\\text{Sündmused } A \\text{ ja } B \\text{ välistavad teineteist. } P(A)=\\dfrac{${pa}}{${qa}}\\text{, } P(B)=\\dfrac{${pb}}{${qb}}\\text{. Leia } P(A\\cup B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(pa * qb + pb * qa, qa * qb) },
        lahendus: [
          `P(A\\cup B) = P(A)+P(B) = \\dfrac{${pa}}{${qa}}+\\dfrac{${pb}}{${qb}} = \\dfrac{${pa * qb + pb * qa}}{${qa * qb}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [pa, qa, pb, qb] = pick(rng, PROBABILITY_PAIRS);
      const unionNum = pa * qb + pb * qa;
      const unionDen = qa * qb;
      const intersectNum = 1;
      const intersectDen = qa * qb;
      const totalNum = unionNum - intersectNum;

      return {
        seed: 2,
        kysimus: `\\text{Sündmustel } A \\text{ ja } B \\text{ on ühisosa. } P(A)=\\dfrac{${pa}}{${qa}}\\text{, } P(B)=\\dfrac{${pb}}{${qb}} \\text{ ja } P(A\\cap B)=\\dfrac{${intersectNum}}{${intersectDen}}\\text{. Leia } P(A\\cup B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(totalNum, unionDen) },
        lahendus: [
          `P(A\\cup B) = P(A)+P(B)-P(A\\cap B) = \\dfrac{${unionNum}}{${unionDen}} - \\dfrac{${intersectNum}}{${intersectDen}} = \\dfrac{${totalNum}}{${unionDen}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [pa, qa, pb, qb] = pick(rng, PROBABILITY_PAIRS);
      const sumNum = pa * qb + pb * qa;
      const sumDen = qa * qb;
      const intersectNum = 1;
      const unionNum = sumNum - intersectNum;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } P(A)=\\dfrac{${pa}}{${qa}}\\text{, } P(B)=\\dfrac{${pb}}{${qb}} \\text{ ja } P(A\\cup B)=\\dfrac{${unionNum}}{${sumDen}}\\text{. Leia } P(A\\cap B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(intersectNum, sumDen) },
        lahendus: [
          `P(A\\cap B) = P(A)+P(B)-P(A\\cup B) = \\dfrac{${sumNum}}{${sumDen}} - \\dfrac{${unionNum}}{${sumDen}} = \\dfrac{${intersectNum}}{${sumDen}}`,
        ],
      };
    },
  },
];
