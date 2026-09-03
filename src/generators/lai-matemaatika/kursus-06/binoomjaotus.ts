import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-binoomjaotus";

// (p, q): nice probabilities with small denominators.
const PROBABILITIES = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [p, q] = pick(rng, PROBABILITIES);
      const n = q * int(rng, 1, 4);

      return {
        seed: 1,
        kysimus: `\\text{Binoomjaotusega juhusliku suuruse katsete arv on } n=${n} \\text{ ja õnnestumise tõenäosus } p=\\dfrac{${p}}{${q}}\\text{. Leia keskväärtus } E(X)=np\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(n * p, q) },
        lahendus: [
          `E(X) = np = ${n}\\cdot\\dfrac{${p}}{${q}} = \\dfrac{${n * p}}{${q}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [p, q] = pick(rng, PROBABILITIES);
      const n = q * q * int(rng, 1, 3);

      return {
        seed: 2,
        kysimus: `\\text{Binoomjaotusega juhusliku suuruse katsete arv on } n=${n} \\text{ ja õnnestumise tõenäosus } p=\\dfrac{${p}}{${q}}\\text{. Leia dispersioon } D(X)=np(1-p)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(n * p * (q - p), q * q) },
        lahendus: [
          `D(X) = np(1-p) = ${n}\\cdot\\dfrac{${p}}{${q}}\\cdot\\dfrac{${q - p}}{${q}} = \\dfrac{${n * p * (q - p)}}{${q * q}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [p, q] = pick(rng, PROBABILITIES);
      const multiplier = int(rng, 1, 3);
      const nFinal = q * multiplier;
      const mean = p * multiplier;

      return {
        seed: 3,
        kysimus: `\\text{Binoomjaotusega juhusliku suuruse keskväärtus on } E(X)=${mean} \\text{ ja õnnestumise tõenäosus } p=\\dfrac{${p}}{${q}}\\text{. Leia katsete arv } n\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: nFinal },
        lahendus: [
          `E(X) = np \\quad \\Rightarrow \\quad n = \\dfrac{E(X)}{p} = \\dfrac{${mean}}{${p}/${q}} = ${mean}\\cdot\\dfrac{${q}}{${p}} = ${nFinal}`,
        ],
      };
    },
  },
];
