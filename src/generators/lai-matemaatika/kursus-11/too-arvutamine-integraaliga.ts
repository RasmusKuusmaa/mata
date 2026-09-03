import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-too-arvutamine-integraaliga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const f0 = int(rng, 2, 20);
      const d = int(rng, 1, 15);
      const value = f0 * d;

      return {
        seed: 1,
        kysimus: `\\text{Keha liigutamiseks kasutatakse konstantset jõudu } F(x)=${f0} \\text{ N. Leia tehtud töö, kui keha liigub } ${d} \\text{ m.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `A = \\displaystyle\\int_0^{${d}} ${f0}\\,dx = ${f0} \\cdot ${d} = ${value} \\text{ J}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 2, 9);
      const d = int(rng, 1, 8);

      return {
        seed: 2,
        kysimus: `\\text{Vedru venitamisel mõjub jõud } F(x)=${k}x \\text{ N (} x \\text{ on venitus meetrites). Leia töö, mis kulub vedru venitamiseks } ${d} \\text{ m võrra.}`,
        vastus: { tuup: "arv", ...arvVaartus(k * d * d, 2) },
        lahendus: [
          `A = \\displaystyle\\int_0^{${d}} ${k}x\\,dx = \\dfrac{${k}\\cdot${d}^2}{2} = \\dfrac{${k * d * d}}{2} \\text{ J}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 2, 9);
      const c = int(rng, 1, 9);
      const d = int(rng, 1, 8);
      const numerator = k * d * d + 2 * c * d;

      return {
        seed: 3,
        kysimus: `\\text{Jõud sõltub asukohast valemi } F(x)=${k}x + ${c} \\text{ N järgi. Leia töö, mis kulub keha liigutamiseks } x=0 \\text{ juurest } x=${d} \\text{ juurde.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 2) },
        lahendus: [
          `A = \\displaystyle\\int_0^{${d}} (${k}x + ${c})\\,dx = \\dfrac{${k}\\cdot${d}^2}{2} + ${c}\\cdot${d} = \\dfrac{${numerator}}{2} \\text{ J}`,
        ],
      };
    },
  },
];
