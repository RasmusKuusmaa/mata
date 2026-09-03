import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { ArvVaartus, Generaator } from "@/generators/types";

const TEEMA_ID = "07-maaramispiirkond";

/** Formats `x - a` with correct signs, e.g. `a=-3` gives `x + 3`. */
function xMinus(a: number): string {
  return a === 0 ? "x" : a > 0 ? `x - ${a}` : `x + ${-a}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const c = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Leia funktsiooni } f(x) = \\dfrac{${c}}{${xMinus(a)}} \\text{ määramispiirkonnast välja jääv } x \\text{ väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Murru nimetaja ei tohi olla null: } ${xMinus(a)} \\ne 0\\text{.}`,
          `x \\ne ${a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Leia funktsiooni } f(x) = \\sqrt{${xMinus(a)}} \\text{ määramispiirkonna vähim } x \\text{ väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Ruutjuure alune avaldis ei tohi olla negatiivne: } ${xMinus(a)} \\ge 0\\text{.}`,
          `x \\ge ${a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      let b = int(rng, -9, 9);
      while (b === a) b = int(rng, -9, 9);
      const vaartused: ArvVaartus[] = [arvVaartus(a), arvVaartus(b)];

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } f(x) = \\dfrac{1}{(${xMinus(a)})(${xMinus(b)})} \\text{ määramispiirkonnast välja jäävad } x \\text{ väärtused.}`,
        vastus: { tuup: "hulk", vaartused },
        lahendus: [
          `\\text{Murru nimetaja ei tohi olla null: } (${xMinus(a)})(${xMinus(b)}) \\ne 0\\text{.}`,
          `x \\ne ${a} \\text{ ja } x \\ne ${b}`,
        ],
      };
    },
  },
];
