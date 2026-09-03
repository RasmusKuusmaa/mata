import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-funktsiooni-pidevus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const c = int(rng, -6, 6);
      const d = a * c + b;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on antud eeskirjaga } f(x) = \\begin{cases} ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}, & x < ${c} \\\\ k, & x \\ge ${c} \\end{cases}\\text{. Leia } k\\text{, mille korral on funktsioon pidev.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: d },
        lahendus: [
          `\\text{Pidevuseks peab kehtima } \\lim_{x \\to ${c}^-} f(x) = f(${c})\\text{:}`,
          `k = ${a} \\cdot ${c} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${d}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const c = int(rng, -6, 6);
      const k = nonZeroInt(rng, -6, 6);
      const m = a * c + b - k * c;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on antud eeskirjaga } f(x) = \\begin{cases} ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}, & x < ${c} \\\\ ${k}x + m, & x \\ge ${c} \\end{cases}\\text{. Leia } m\\text{, mille korral on funktsioon pidev.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [
          `${a} \\cdot ${c} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${k} \\cdot ${c} + m`,
          `m = ${a * c + b} - ${k * c} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const c = int(rng, -6, 6);
      const leftValue = int(rng, -9, 9);
      const pidev = pick(rng, [true, false]);
      const rightValue = pidev ? leftValue : leftValue + nonZeroInt(rng, 1, 5);

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni vasakpoolne piirväärtus kohal } x=${c} \\text{ on } ${leftValue} \\text{ ja } f(${c}) = ${rightValue}\\text{. Kas funktsioon on kohal } x=${c} \\text{ pidev?}`,
        vastus: { tuup: "valik", oige: pidev ? "jah" : "ei", eksitajad: [pidev ? "ei" : "jah"] },
        lahendus: pidev
          ? [
              `\\text{Kuna piirväärtus (} ${leftValue}\\text{) võrdub funktsiooni väärtusega (} ${rightValue}\\text{), on funktsioon pidev.}`,
            ]
          : [
              `\\text{Kuna piirväärtus (} ${leftValue}\\text{) ei võrdu funktsiooni väärtusega (} ${rightValue}\\text{), ei ole funktsioon pidev.}`,
            ],
      };
    },
  },
];
