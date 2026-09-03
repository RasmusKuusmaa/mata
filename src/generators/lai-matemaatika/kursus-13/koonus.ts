import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-koonus";

/** `(r, h, l)` with `r² + h² = l²`, small enough for a readable question. */
function triple(rng: () => number) {
  const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
  return { r: a, h: b, l: c };
}

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
        kysimus: `\\text{Koonuse põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Leia koonuse ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { r, l } = triple(rng);
      const numerator = r * l;

      return {
        seed: 2,
        kysimus: `\\text{Koonuse põhiraadius on } r=${r} \\text{ ja moodustaja (külgjoon) } l=${l}\\text{. Leia koonuse külgpindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `S_{\\text{külg}} = \\pi rl = \\pi\\cdot ${r}\\cdot ${l} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { r, h, l } = triple(rng);
      const numerator = r * r + r * l;

      return {
        seed: 3,
        kysimus: `\\text{Koonuse põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Leia koonuse täispindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `l = \\sqrt{r^2+h^2} = \\sqrt{${r}^2+${h}^2} = \\sqrt{${r * r + h * h}} = ${l}`,
          `S = \\pi r^2 + \\pi rl = \\pi\\cdot ${r}^2 + \\pi\\cdot ${r}\\cdot ${l} = ${r * r}\\pi + ${r * l}\\pi = ${numerator}\\pi`,
        ],
      };
    },
  },
];
