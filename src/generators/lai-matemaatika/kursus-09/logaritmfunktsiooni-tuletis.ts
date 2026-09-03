import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-logaritmfunktsiooni-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, 1, 12);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=\\ln x \\text{ tuletis on } f'(x)=\\dfrac1x\\text{. Leia } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, x0) },
        lahendus: [`f'(${x0}) = \\dfrac{1}{${x0}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const l = pick(rng, [1, 2, 3] as const);
      const x0 = pick(rng, [1, 2, 3, 4] as const);

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=\\log_a x \\text{ tuletis on } f'(x)=\\dfrac{1}{x\\ln a}\\text{. Teame, et } \\ln a = ${l}\\text{. Leia } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, x0 * l) },
        lahendus: [`f'(${x0}) = \\dfrac{1}{${x0} \\cdot ${l}} = \\dfrac{1}{${x0 * l}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const q = pick(rng, [1, 2, 3] as const);
      const x0 = int(rng, -5, 5);
      const b = q - a * x0;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x)=\\ln(${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})\\text{. Ahelreegli järgi } f'(x)=\\dfrac{${a}}{${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}\\text{. Leia } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, q) },
        lahendus: [
          `${a}\\cdot${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${q}`,
          `f'(${x0}) = \\dfrac{${a}}{${q}}`,
        ],
      };
    },
  },
];
