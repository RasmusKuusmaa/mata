import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-muutumispiirkond";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const hTerm = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;

      return {
        seed: 1,
        kysimus: `\\text{Leia funktsiooni } f(x) = ${hTerm}^2 + ${k} \\text{ muutumispiirkonna vähim väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Ruut } ${hTerm}^2 \\text{ on alati} \\ge 0\\text{, väikseim väärtus on } 0 \\text{ kohal } x=${h}\\text{.}`,
          `f(${h}) = 0 + ${k} = ${k} \\quad \\Rightarrow \\quad \\text{vähim väärtus on } ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const hTerm = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;

      return {
        seed: 2,
        kysimus: `\\text{Leia funktsiooni } f(x) = -${hTerm}^2 + ${k} \\text{ muutumispiirkonna suurim väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `-${hTerm}^2 \\text{ on alati} \\le 0\\text{, suurim väärtus on } 0 \\text{ kohal } x=${h}\\text{.}`,
          `f(${h}) = 0 + ${k} = ${k} \\quad \\Rightarrow \\quad \\text{suurim väärtus on } ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const h = nonZeroInt(rng, -9, 9);
      const k = int(rng, -9, 9);
      const b = -2 * h;
      const c = h * h + k;

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } f(x) = x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)} \\text{ muutumispiirkonna vähim väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Täiendame ruuduks: } x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x = (x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 - ${h * h}\\text{.}`,
          `f(x) = (x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 - ${h * h} + ${c} = (x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 + ${k}`,
          `\\text{Vähim väärtus on } ${k}`,
        ],
      };
    },
  },
];
