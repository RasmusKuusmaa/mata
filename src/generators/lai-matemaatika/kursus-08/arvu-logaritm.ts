import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-arvu-logaritm";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, 1, 5);
      const b = a ** k;

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\log_{${a}} ${b}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\log_{${a}} ${b} \\text{ on aste, milleni tuleb tõsta } ${a}\\text{, et saada } ${b}\\text{:}`,
          `${a}^{${k}} = ${b} \\quad \\Rightarrow \\quad \\log_{${a}} ${b} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      const kysiUhest = pick(rng, [true, false]);

      return {
        seed: 2,
        kysimus: kysiUhest
          ? `\\text{Leia } \\log_{${a}} 1\\text{.}`
          : `\\text{Leia } \\log_{${a}} ${a}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: kysiUhest ? 0 : 1 },
        lahendus: kysiUhest
          ? [`${a}^0 = 1 \\quad \\Rightarrow \\quad \\log_{${a}} 1 = 0 \\text{ (iga aluse korral)}`]
          : [`${a}^1 = ${a} \\quad \\Rightarrow \\quad \\log_{${a}} ${a} = 1 \\text{ (iga aluse korral)}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const minC = a === 2 ? -3 : a === 3 ? -2 : -1;
      const c = int(rng, minC, 4);
      const x = a ** c;

      return {
        seed: 3,
        kysimus: `\\text{Logaritmi definitsiooni järgi: kui } \\log_{${a}} x = ${c}\\text{, leia } x\\text{.}`,
        vastus: c >= 0
          ? { tuup: "arv", kuju: "taisarv", vaartus: x }
          : { tuup: "arv", kuju: "murd", lugeja: 1, nimetaja: a ** -c },
        lahendus: [
          `\\log_{${a}} x = ${c} \\quad \\Rightarrow \\quad x = ${a}^{${c}}`,
          c >= 0 ? `x = ${x}` : `x = \\dfrac{1}{${a}^{${-c}}} = \\dfrac{1}{${a ** -c}}`,
        ],
      };
    },
  },
];
