import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-silinder";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const h = int(rng, 2, 9);
      const numerator = r * r * h;

      return {
        seed: 1,
        kysimus: `\\text{Silindri põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Leia silindri ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `V = \\pi r^2 h = \\pi\\cdot ${r}^2\\cdot ${h} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const h = int(rng, 2, 9);
      const numerator = 2 * r * r + 2 * r * h;

      return {
        seed: 2,
        kysimus: `\\text{Silindri põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Leia silindri täispindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `S = 2\\pi r^2 + 2\\pi rh = 2\\pi\\cdot ${r}^2 + 2\\pi\\cdot ${r}\\cdot ${h} = ${2 * r * r}\\pi + ${2 * r * h}\\pi = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 6);
      const t = int(rng, 2, 6);
      const volumeCoeff = r * r * t;

      return {
        seed: 3,
        kysimus: `\\text{Silindri põhiraadius on } r=${r} \\text{ ja ruumala on } V=${volumeCoeff}\\pi\\text{. Leia silindri kõrgus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: t },
        lahendus: [
          `V = \\pi r^2 h \\quad \\Rightarrow \\quad h = \\dfrac{V}{\\pi r^2} = \\dfrac{${volumeCoeff}\\pi}{\\pi\\cdot ${r}^2} = \\dfrac{${volumeCoeff}}{${r * r}} = ${t}`,
        ],
      };
    },
  },
];
