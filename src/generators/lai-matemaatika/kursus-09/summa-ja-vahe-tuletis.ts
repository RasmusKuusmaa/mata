import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-summa-ja-vahe-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const n = int(rng, -9, 9);
      const a = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } f'(${a}) = ${m} \\text{ ja } g'(${a}) = ${n}\\text{. Leia } (f+g)'(${a})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m + n },
        lahendus: [
          `(f+g)'(x) = f'(x) + g'(x)`,
          `(f+g)'(${a}) = ${m} + ${n} = ${m + n}`,
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
      const n = int(rng, -9, 9);
      const a = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } f'(${a}) = ${m} \\text{ ja } g'(${a}) = ${n}\\text{. Leia } (f-g)'(${a})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m - n },
        lahendus: [
          `(f-g)'(x) = f'(x) - g'(x)`,
          `(f-g)'(${a}) = ${m} - ${n} = ${m - n}`,
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
      const k = int(rng, -9, 9);
      const a = int(rng, -9, 9);
      const value = m + n - k;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } f'(${a}) = ${m}\\text{, } g'(${a}) = ${n} \\text{ ja } h'(${a}) = ${k}\\text{. Leia } (f+g-h)'(${a})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `(f+g-h)'(x) = f'(x) + g'(x) - h'(x)`,
          `(f+g-h)'(${a}) = ${m} + ${n} - ${k} = ${value}`,
        ],
      };
    },
  },
];
