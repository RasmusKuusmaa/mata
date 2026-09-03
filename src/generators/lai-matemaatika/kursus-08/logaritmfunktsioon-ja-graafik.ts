import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-logaritmfunktsioon-ja-graafik";

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
        kysimus: `\\text{Logaritmfunktsioon on } f(x) = \\log_{${a}} x\\text{. Leia } f(${x})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [`f(${x}) = \\log_{${a}} ${x} = ${k}\\text{, sest } ${a}^{${k}} = ${x}`],
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
        kysimus: `\\text{Kas logaritmfunktsioon } f(x) = \\log_{${aLatex}} x \\text{ on kasvav või kahanev?}`,
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
      const a = pick(rng, [2, 3, 5] as const);
      const h = int(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } f(x) = \\log_{${a}}(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)}) \\text{ määramispiirkonna vähim piirväärtus (mille poole } x \\text{ läheneb, kuid ei jõua).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `\\text{Logaritmi alune avaldis peab olema positiivne: } x ${h >= 0 ? "-" : "+"} ${Math.abs(h)} > 0 \\quad \\Rightarrow \\quad x > ${h}`,
        ],
      };
    },
  },
];
