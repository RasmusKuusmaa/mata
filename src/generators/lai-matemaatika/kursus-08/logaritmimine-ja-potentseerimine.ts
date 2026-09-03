import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-logaritmimine-ja-potentseerimine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const c = int(rng, 1, 4);
      const x = a ** c;

      return {
        seed: 1,
        kysimus: `\\text{Potentseeri: kui } \\log_{${a}} x = ${c}\\text{, leia } x\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `x = ${a}^{${c}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const c = int(rng, 1, 4);
      const x = a ** c;

      return {
        seed: 2,
        kysimus: `\\text{Logaritmi: kui } ${a}^{${c}} = ${x}\\text{, leia } \\log_{${a}} ${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: c },
        lahendus: [
          `\\log_{${a}} ${x} = ${c}\\text{, sest } ${a}^{${c}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3] as const);
      const c = int(rng, 1, 3);
      const k = nonZeroInt(rng, 2, 3);
      const b = int(rng, -9, 9);
      const target = k * c + b;
      const x = a ** c;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda: } ${k}\\log_{${a}} x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${target}\\text{. Leia } x\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `${k}\\log_{${a}} x = ${target} ${b >= 0 ? "-" : "+"} ${Math.abs(b)} = ${k * c} \\quad \\Rightarrow \\quad \\log_{${a}} x = ${c}`,
          `x = ${a}^{${c}} = ${x}`,
        ],
      };
    },
  },
];
