import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-logaritmvorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, 1, 4);
      const x = a ** k;

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } \\log_{${a}} x = ${k}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [`x = ${a}^{${k}} = ${x}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, 1, 4);
      const c = int(rng, -5, 5);
      const target = k + c;
      const x = a ** k;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand: } \\log_{${a}} x ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${target}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `\\log_{${a}} x = ${target} ${c >= 0 ? "-" : "+"} ${Math.abs(c)} = ${k}`,
          `x = ${a}^{${k}} = ${x}`,
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
      const m = int(rng, 1, 3);
      const x = a ** m;
      const k = 2 * m;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand (} x>0\\text{): } \\log_{${a}} (x^2) = ${k}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `\\log_{${a}}(x^2) = 2\\log_{${a}} x = ${k} \\quad \\Rightarrow \\quad \\log_{${a}} x = ${m}`,
          `x = ${a}^{${m}} = ${x}`,
        ],
      };
    },
  },
];
