import { int, nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-abivalemid";
const ROUND_BASES = [20, 30, 40, 50, 60, 70, 80, 90, 100];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const R = pick(rng, ROUND_BASES);
      const d = nonZeroInt(rng, 1, 9);
      const tulemus = R * R + 2 * R * d + d * d;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta valemi abil: } (${R} + ${d})^2`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `(a+b)^2 = a^2 + 2ab + b^2`,
          `(${R} + ${d})^2 = ${R}^2 + 2 \\cdot ${R} \\cdot ${d} + ${d}^2 = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const R = pick(rng, ROUND_BASES);
      const d = nonZeroInt(rng, 1, 9);
      const tulemus = R * R - 2 * R * d + d * d;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta valemi abil: } (${R} - ${d})^2`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `(a-b)^2 = a^2 - 2ab + b^2`,
          `(${R} - ${d})^2 = ${R}^2 - 2 \\cdot ${R} \\cdot ${d} + ${d}^2 = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const R = pick(rng, ROUND_BASES);
      const d = int(rng, 1, 9);
      const tulemus = R * R - d * d;
      const teineTegur = R - d;
      const esimeneTegur = R + d;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta valemi abil: } ${teineTegur} \\cdot ${esimeneTegur}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `(a-b)(a+b) = a^2 - b^2`,
          `${teineTegur} \\cdot ${esimeneTegur} = (${R} - ${d})(${R} + ${d}) = ${R}^2 - ${d}^2 = ${tulemus}`,
        ],
      };
    },
  },
];
