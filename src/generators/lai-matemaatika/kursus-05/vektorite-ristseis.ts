import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektorite-ristseis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Vektor on } \\vec{a}=(${x}, ${y})\\text{. Leia vektoriga } \\vec{a} \\text{ ristuva vektori } \\vec{b}=(${-y}, m) \\text{ teine koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `\\text{Ristseisu tunnus: } \\vec{a}\\cdot\\vec{b}=0 \\quad \\Rightarrow \\quad ${x}\\cdot(${-y}) + ${y}\\cdot m = 0`,
          `m = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const k = nonZeroInt(rng, -4, 4);
      const bx = k * y;
      const by = -k * x;

      return {
        seed: 2,
        kysimus: `\\text{Vektorid } \\vec{a}=(${x}, ${y}) \\text{ ja } \\vec{b}=(${bx}, n) \\text{ on ristseisus. Leia } n\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: by },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b}=0 \\quad \\Rightarrow \\quad ${x}\\cdot${bx} + ${y}\\cdot n = 0`,
          `n = -\\dfrac{${x}\\cdot${bx}}{${y}} = ${by}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const isPerp = pick(rng, [true, false]);
      const [bx, by] = isPerp ? [y, -x] : [x, y];

      return {
        seed: 3,
        kysimus: `\\text{Kas vektorid } \\vec{a}=(${x}, ${y}) \\text{ ja } \\vec{b}=(${bx}, ${by}) \\text{ on ristseisus?}`,
        vastus: { tuup: "valik", oige: isPerp ? "jah" : "ei", eksitajad: [isPerp ? "ei" : "jah"] },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${x}\\cdot${bx} + ${y}\\cdot${by} = ${x * bx + y * by}${isPerp ? " = 0 \\text{ (ristseisus)}" : " \\ne 0 \\text{ (ei ole ristseisus)}"}`,
        ],
      };
    },
  },
];
