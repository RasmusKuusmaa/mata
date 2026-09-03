import { nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-kumerus-ja-nogusus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => {
      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=x^3 \\text{ teine tuletis on } f''(x)=6x\\text{. Kas graafik on kumer või nõgus vahemikus } x>0\\text{?}`,
        vastus: { tuup: "valik", oige: "kumer", eksitajad: ["nõgus"] },
        lahendus: [
          `f''(x)=6x>0 \\text{, kui } x>0\\text{, seega on graafik seal } \\textbf{kumer}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=x^3 \\text{ teine tuletis on } f''(x)=6x\\text{. Kas graafik on kumer või nõgus vahemikus } x<0\\text{?}`,
        vastus: { tuup: "valik", oige: "nõgus", eksitajad: ["kumer"] },
        lahendus: [
          `f''(x)=6x<0 \\text{, kui } x<0\\text{, seega on graafik seal } \\textbf{nõgus}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x)=${a}x^2 \\text{ teine tuletis on } f''(x)=${2 * a}\\text{ (konstant). Kas graafik on kumer või nõgus kogu määramispiirkonnas?}`,
        vastus: { tuup: "valik", oige: a > 0 ? "kumer" : "nõgus", eksitajad: [a > 0 ? "nõgus" : "kumer"] },
        lahendus: [
          `f''(x)=${2 * a}\\text{, mis on } \\text{${a > 0 ? "positiivne" : "negatiivne"}}\\text{, seega on graafik kogu määramispiirkonnas } \\textbf{${a > 0 ? "kumer" : "nõgus"}}\\text{.}`,
        ],
      };
    },
  },
];
