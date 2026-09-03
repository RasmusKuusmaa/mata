import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-geomeetriline-toenaosus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const q = int(rng, 2, 8);
      const p = int(rng, 1, q - 1);
      const t = int(rng, 1, 3);
      const total = q * t;
      const favorable = p * t;

      return {
        seed: 1,
        kysimus: `\\text{Lõigu pikkus on } ${total} \\text{ cm. Sellel valitakse juhuslik punkt. Leia tõenäosus, et punkt jääb } ${favorable} \\text{ cm pikkusesse ossa.}`,
        vastus: { tuup: "arv", ...arvVaartus(favorable, total) },
        lahendus: [
          `P = \\dfrac{\\text{soodne pikkus}}{\\text{kogu pikkus}} = \\dfrac{${favorable}}{${total}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      // (p, q) with small/big = p/q in lowest terms, q ∈ {2,3}, so the
      // area ratio's denominator (q1·q2 ≤ 9) always stays nice.
      const RATIOS = [[1, 2], [1, 3], [2, 3]] as const;
      const [pA, qA] = pick(rng, RATIOS);
      const [pB, qB] = pick(rng, RATIOS);
      const tA = int(rng, 1, 3);
      const tB = int(rng, 1, 3);
      const bigA = qA * tA;
      const smallA = pA * tA;
      const bigB = qB * tB;
      const smallB = pB * tB;

      return {
        seed: 2,
        kysimus: `\\text{Ristkülikukujulisel alal } ${bigA}\\times${bigB} \\text{ on väiksem ristkülik } ${smallA}\\times${smallB}\\text{. Leia tõenäosus, et juhuslik punkt suures ristkülikus jääb väiksesse ristkülikusse.}`,
        vastus: { tuup: "arv", ...arvVaartus(smallA * smallB, bigA * bigB) },
        lahendus: [
          `P = \\dfrac{\\text{väikese pindala}}{\\text{suure pindala}} = \\dfrac{${smallA}\\cdot${smallB}}{${bigA}\\cdot${bigB}} = \\dfrac{${smallA * smallB}}{${bigA * bigB}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // (k, m) with r/R = k/m in lowest terms and m² ≤ 12, so r²/R² stays nice.
      const [k, m] = pick(rng, [[1, 2], [1, 3], [2, 3]] as const);
      const t = int(rng, 1, 4);
      const R = m * t;
      const r = k * t;

      return {
        seed: 3,
        kysimus: `\\text{Suure ringi raadius on } ${R} \\text{ ja selle keskele on joonistatud väike ring raadiusega } ${r}\\text{. Leia tõenäosus, et juhuslik punkt suures ringis jääb väikesesse ringi.}`,
        vastus: { tuup: "arv", ...arvVaartus(r * r, R * R) },
        lahendus: [
          `P = \\dfrac{\\pi r^2}{\\pi R^2} = \\dfrac{r^2}{R^2} = \\dfrac{${r}^2}{${R}^2} = \\dfrac{${r * r}}{${R * R}}`,
        ],
      };
    },
  },
];
