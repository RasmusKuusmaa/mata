import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-eksponentfunktsioon-ja-graafik";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3] as const);
      const x = int(rng, -2, 3);

      return {
        seed: 1,
        kysimus: `\\text{Eksponentfunktsioon on } f(x) = ${a}^x\\text{. Leia } f(${x})\\text{.}`,
        vastus: x >= 0 ? { tuup: "arv", kuju: "taisarv", vaartus: a ** x } : { tuup: "arv", ...arvVaartus(1, a ** -x) },
        lahendus: [
          x >= 0
            ? `f(${x}) = ${a}^{${x}} = ${a ** x}`
            : `f(${x}) = ${a}^{${x}} = \\dfrac{1}{${a}^{${-x}}} = \\dfrac{1}{${a ** -x}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const kasvav = pick(rng, [true, false]);
      const n = pick(rng, [2, 3, 4] as const);
      const aLatex = kasvav ? `${n}` : `\\dfrac{1}{${n}}`;

      return {
        seed: 2,
        kysimus: `\\text{Kas eksponentfunktsioon } f(x) = \\left(${aLatex}\\right)^x \\text{ on kasvav või kahanev?}`,
        vastus: { tuup: "valik", oige: kasvav ? "kasvav" : "kahanev", eksitajad: [kasvav ? "kahanev" : "kasvav"] },
        lahendus: [
          kasvav
            ? `\\text{Kuna alus } ${aLatex} > 1\\text{, on funktsioon kasvav.}`
            : `\\text{Kuna alus } 0 < ${aLatex} < 1\\text{, on funktsioon kahanev.}`,
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
      const x = int(rng, 1, 5);
      const target = a ** x;

      return {
        seed: 3,
        kysimus: `\\text{Eksponentfunktsioon on } f(x) = ${a}^x\\text{. Mille korral on } f(x) = ${target}\\text{?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `${a}^x = ${target} = ${a}^{${x}} \\quad \\Rightarrow \\quad x = ${x}`,
        ],
      };
    },
  },
];
