import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-ringjoone-pikkus-ja-ringi-pindala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoone raadius on } ${r}\\text{. Leia ringjoone pikkus (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: 2 * r } },
        lahendus: [
          `\\text{Ringjoone pikkus on } l = 2\\pi r\\text{:}`,
          `l = 2 \\cdot \\pi \\cdot ${r} = ${2 * r}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 15);

      return {
        seed: 2,
        kysimus: `\\text{Ringi raadius on } ${r}\\text{. Leia ringi pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: r * r } },
        lahendus: [
          `\\text{Ringi pindala on } S = \\pi r^2\\text{:}`,
          `S = \\pi \\cdot ${r}^2 = ${r * r}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 12);
      const d = 2 * r;

      return {
        seed: 3,
        kysimus: `\\text{Ringi diameeter on } ${d}\\text{. Leia ringi pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: r * r } },
        lahendus: [
          `\\text{Raadius on pool diameetrist: } r = \\dfrac{${d}}{2} = ${r}\\text{.}`,
          `S = \\pi r^2 = \\pi \\cdot ${r}^2 = ${r * r}\\pi`,
        ],
      };
    },
  },
];
