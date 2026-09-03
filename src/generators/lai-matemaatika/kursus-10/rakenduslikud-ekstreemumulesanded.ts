import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-rakenduslikud-ekstreemumulesanded";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const side = int(rng, 3, 30);
      const p = 4 * side;

      return {
        seed: 1,
        kysimus: `\\text{Ristküliku ümbermõõt on } ${p} \\text{ m. Leia külje pikkus, mille korral on ristküliku pindala suurim.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: side },
        lahendus: [
          `\\text{Olgu küljed } x \\text{ ja } \\dfrac{${p}}{2}-x\\text{. Pindala } S(x)=x\\left(\\dfrac{${p}}{2}-x\\right) \\text{ on suurim, kui } x = \\dfrac{${p}}{4} = ${side} \\text{ (ruut annab maksimaalse pindala).}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const side = int(rng, 3, 30);
      const p = 4 * side;
      const maxArea = side * side;

      return {
        seed: 2,
        kysimus: `\\text{Ristküliku ümbermõõt on } ${p} \\text{ m. Leia ristküliku suurim võimalik pindala.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: maxArea },
        lahendus: [
          `\\text{Suurim pindala saavutatakse ruudu korral, mille külg on } \\dfrac{${p}}{4}=${side}\\text{ m.}`,
          `S = ${side}^2 = ${maxArea} \\text{ m}^2`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const half = int(rng, 3, 30);
      const n = 2 * half;
      const maxProduct = half * half;

      return {
        seed: 3,
        kysimus: `\\text{Arv } ${n} \\text{ jagatakse kaheks liidetavaks. Leia liidetavad, mille korrutis on suurim.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: half },
        lahendus: [
          `\\text{Olgu liidetavad } x \\text{ ja } ${n}-x\\text{. Korrutis } P(x)=x(${n}-x) \\text{ on suurim, kui liidetavad on võrdsed: } x=\\dfrac{${n}}{2}=${half}\\text{.}`,
          `\\text{(Suurim korrutis on } ${half} \\cdot ${half} = ${maxProduct}\\text{.)}`,
        ],
      };
    },
  },
];
