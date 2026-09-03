import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-ruumigeomeetria-rakendusulesanded";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      // Kuubi ruumidiagonaal: a√3, ruudu all ehk 3a².
      return {
        seed: 1,
        kysimus: `\\text{Kuubi serva pikkus on } a=${a}\\text{. Leia kuubi ruumidiagonaali pikkuse ruut.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 3 * a * a },
        lahendus: [
          `\\text{Paigutame kuubi koordinaatteljestikku tippudega } (0,0,0) \\text{ ja } (${a},${a},${a})\\text{.}`,
          `d^2 = ${a}^2+${a}^2+${a}^2 = ${3 * a * a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 8);
      const b = int(rng, 2, 8);
      const c = int(rng, 2, 8);
      // Risttahuka ruumidiagonaali pikkuse ruut.
      return {
        seed: 2,
        kysimus: `\\text{Risttahuka servad on } a=${a}\\text{, } b=${b}\\text{, } c=${c}\\text{. Leia ruumidiagonaali pikkuse ruut.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a * a + b * b + c * c },
        lahendus: [
          `d^2 = a^2+b^2+c^2 = ${a}^2+${b}^2+${c}^2 = ${a * a + b * b + c * c}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 10);
      // Kuup tippudega (0,0,0) ja (a,a,a): ruumidiagonaali vektor (a,a,a),
      // põhitasandi (z=0) normaal (0,0,1). Skalaarkorrutis = a.
      return {
        seed: 3,
        kysimus: `\\text{Kuubi serv on } a=${a}\\text{, tipud } (0,0,0) \\text{ ja } (${a},${a},${a})\\text{. Leia ruumidiagonaali vektori ja põhitasandi normaalvektori } (0,0,1) \\text{ skalaarkorrutis.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\vec{d}=(${a},${a},${a})\\text{, } \\vec{n}=(0,0,1)`,
          `\\vec{d}\\cdot\\vec{n} = ${a}\\cdot0+${a}\\cdot0+${a}\\cdot1 = ${a}`,
        ],
      };
    },
  },
];
