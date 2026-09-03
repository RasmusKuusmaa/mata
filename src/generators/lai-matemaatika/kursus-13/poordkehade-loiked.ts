import { arvVaartus, NICE_TRIG_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-poordkehade-loiked";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const h = int(rng, 2, 9);
      const area = 2 * r * h;

      return {
        seed: 1,
        kysimus: `\\text{Silindri põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Silinder lõigatakse teljetasandiga (tasand läbib telge). Leia lõikefiguuri (ristküliku) pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(area) },
        lahendus: [
          `\\text{Teljelõige on ristkülik külgedega } 2r \\text{ ja } h\\text{.}`,
          `S = 2rh = 2\\cdot ${r}\\cdot ${h} = ${area}`,
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
      const area = r * h;

      return {
        seed: 2,
        kysimus: `\\text{Koonuse põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Koonus lõigatakse teljetasandiga (tasand läbib telge). Leia lõikefiguuri (võrdhaarse kolmnurga) pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(area) },
        lahendus: [
          `\\text{Teljelõige on võrdhaarne kolmnurk alusega } 2r \\text{ ja kõrgusega } h\\text{.}`,
          `S = \\dfrac{1}{2}\\cdot 2r\\cdot h = rh = ${r}\\cdot ${h} = ${area}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [d, r, R] = pick(rng, NICE_TRIG_TRIPLES);
      const numerator = r * r;

      return {
        seed: 3,
        kysimus: `\\text{Kera raadius on } R=${R} \\text{ ja lõikav tasand asub kera keskpunktist kaugusel } d=${d}\\text{. Leia lõikeringi pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `\\text{Lõikeringi raadius } r \\text{ leitakse Pythagorase teoreemist: } r^2 = R^2-d^2 = ${R}^2-${d}^2 = ${R * R}-${d * d} = ${r * r}`,
          `S = \\pi r^2 = ${numerator}\\pi`,
        ],
      };
    },
  },
];
