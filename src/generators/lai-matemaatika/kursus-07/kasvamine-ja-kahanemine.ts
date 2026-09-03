import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-kasvamine-ja-kahanemine";

function hTerm(h: number): string {
  return h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Leia } x \\text{ väärtus, millest alates funktsioon } f(x) = ${hTerm(h)}^2 + ${k} \\text{ hakkab kasvama.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `\\text{Parabooli haripunkt on kohal } x = ${h}\\text{. Kuna haarad on üleval, kahaneb funktsioon enne haripunkti ja kasvab pärast.}`,
          `\\text{Funktsioon hakkab kasvama kohalt } x = ${h}`,
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

      return {
        seed: 2,
        kysimus: `\\text{Leia } x \\text{ väärtus, millest alates funktsioon } f(x) = -${hTerm(h)}^2 + ${k} \\text{ hakkab kahanema.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `\\text{Parabooli haripunkt on kohal } x = ${h}\\text{. Kuna haarad on all, kasvab funktsioon enne haripunkti ja kahaneb pärast.}`,
          `\\text{Funktsioon hakkab kahanema kohalt } x = ${h}`,
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
        kysimus: `\\text{Leia funktsiooni } f(x) = x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)} \\text{ haripunkti } x \\text{-koordinaat (koht, kus kasvamine/kahanemine vahetub).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `\\text{Haripunkti } x\\text{-koordinaat on } x = -\\dfrac{b}{2a} = -\\dfrac{${b}}{2} = ${h}`,
        ],
      };
    },
  },
];
