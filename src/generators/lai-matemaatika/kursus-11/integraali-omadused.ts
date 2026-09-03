import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-integraali-omadused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const n = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f \\text{ algfunktsioon } F \\text{ rahuldab } F(a)=${m}\\text{, funktsiooni } g \\text{ algfunktsioon } G \\text{ rahuldab } G(a)=${n}\\text{. Leia funktsiooni } f+g \\text{ algfunktsiooni } (F+G) \\text{ väärtus kohal } a\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m + n },
        lahendus: [
          `\\displaystyle\\int (f+g)\\,dx = \\int f\\,dx + \\int g\\,dx = F+G`,
          `(F+G)(a) = ${m} + ${n} = ${m + n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const k = int(rng, -6, 6);

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f \\text{ algfunktsioon } F \\text{ rahuldab } F(a)=${m}\\text{. Leia funktsiooni } ${k}f \\text{ algfunktsiooni väärtus kohal } a\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * m },
        lahendus: [
          `\\displaystyle\\int ${k}f\\,dx = ${k}\\int f\\,dx = ${k}F`,
          `${k}F(a) = ${k} \\cdot ${m} = ${k * m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const n = int(rng, -9, 9);
      const p = nonZeroInt(rng, -5, 5);
      const q = nonZeroInt(rng, -5, 5);
      const value = p * m - q * n;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f \\text{ algfunktsioon } F \\text{ rahuldab } F(a)=${m}\\text{, funktsiooni } g \\text{ algfunktsioon } G \\text{ rahuldab } G(a)=${n}\\text{. Leia funktsiooni } ${p}f-${q}g \\text{ algfunktsiooni väärtus kohal } a\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\displaystyle\\int (${p}f-${q}g)\\,dx = ${p}F - ${q}G`,
          `${p}\\cdot${m} - ${q}\\cdot${n} = ${value}`,
        ],
      };
    },
  },
];
