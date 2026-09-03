import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-meetrilised-seosed-taisnurkses-kolmnurgas";

/**
 * A right triangle scaled from `(15, 20, 25) = 5·(3,4,5)` so the altitude on
 * the hypotenuse and both projections are integers: `p=9t, q=16t, h=12t`.
 */
function build(t: number) {
  const a = 15 * t;
  const b = 20 * t;
  const c = 25 * t;
  const p = 9 * t;
  const q = 16 * t;
  const h = 12 * t;
  return { a, b, c, p, q, h };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const t = int(rng, 1, 6);
      const { p, q, h } = build(t);

      return {
        seed: 1,
        kysimus: `\\text{Täisnurkse kolmnurga hüpotenuusile tõmmatud kõrgus jagab hüpotenuusi lõikudeks } p=${p} \\text{ ja } q=${q}\\text{. Leia kõrgus } h\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `h^2 = pq = ${p}\\cdot${q} = ${p * q} \\quad \\Rightarrow \\quad h = ${h}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const t = int(rng, 1, 6);
      const { a, c, p } = build(t);

      return {
        seed: 2,
        kysimus: `\\text{Täisnurkse kolmnurga kaatet on } a=${a} \\text{ ja hüpotenuus } c=${c}\\text{. Leia kaateti } a \\text{ projektsioon hüpotenuusile.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: p },
        lahendus: [
          `a^2 = pc \\quad \\Rightarrow \\quad p = \\dfrac{a^2}{c} = \\dfrac{${a}^2}{${c}} = \\dfrac{${a * a}}{${c}} = ${p}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const t = int(rng, 1, 6);
      const { h, p } = build(t);

      return {
        seed: 3,
        kysimus: `\\text{Täisnurkse kolmnurga hüpotenuusile tõmmatud kõrgus on } h=${h} \\text{ ja üks hüpotenuusi lõik on } p=${p}\\text{. Leia teine lõik } q\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(h * h, p) },
        lahendus: [
          `h^2 = pq \\quad \\Rightarrow \\quad q = \\dfrac{h^2}{p} = \\dfrac{${h}^2}{${p}} = \\dfrac{${h * h}}{${p}}`,
        ],
      };
    },
  },
];
