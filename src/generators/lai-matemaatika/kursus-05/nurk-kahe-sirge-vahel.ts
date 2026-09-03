import { arvVaartus, isNice, redrawUntilNice } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-nurk-kahe-sirge-vahel";

/** Draws `(k1, k2)` whose angle-tangent `(k2-k1)/(1+k1k2)` is defined and nice. */
function buildSlopes(rng: () => number, range: number) {
  return redrawUntilNice((r) => {
    const k1 = int(r, -range, range);
    const k2 = int(r, -range, range);
    const denom = 1 + k1 * k2;
    if (denom === 0 || !isNice((k2 - k1) / denom)) return null;
    return { k1, k2, denom };
  }, rng);
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { k1, k2, denom } = buildSlopes(rng, 3);
      const numerator = k2 - k1;

      return {
        seed: 1,
        kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k2}\\text{. Leia sirgetevahelise nurga tangens.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, denom) },
        lahendus: [
          `\\tg\\,\\varphi = \\dfrac{k_2-k_1}{1+k_1k_2} = \\dfrac{${k2}-${k1}}{1+${k1}\\cdot${k2}} = \\dfrac{${numerator}}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { k1, k2, denom } = buildSlopes(rng, 4);
      const numerator = k1 - k2;

      return {
        seed: 2,
        kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k2}\\text{. Leia nurga (mõõdetud sirgelt 2 sirgele 1) tangens.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, denom) },
        lahendus: [
          `\\tg\\,\\varphi = \\dfrac{k_1-k_2}{1+k_1k_2} = \\dfrac{${k1}-${k2}}{1+${k1}\\cdot${k2}} = \\dfrac{${numerator}}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { k1, k2, denom } = buildSlopes(rng, 5);
      const numerator = k2 - k1;

      return {
        seed: 3,
        kysimus: `\\text{Sirge } 1 \\text{ üldvõrrand on } y=${k1}x \\text{ ja sirge } 2 \\text{ üldvõrrand on } y=${k2}x+5\\text{. Leia sirgetevahelise nurga tangens.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, denom) },
        lahendus: [
          `\\text{Nurk sõltub ainult tõusudest: } k_1=${k1}\\text{, } k_2=${k2}`,
          `\\tg\\,\\varphi = \\dfrac{k_2-k_1}{1+k_1k_2} = \\dfrac{${numerator}}{${denom}}`,
        ],
      };
    },
  },
];
