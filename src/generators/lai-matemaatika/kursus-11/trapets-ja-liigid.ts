import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-trapets-ja-liigid";

const PYTHAGOREAN_TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);
      const b = int(rng, 2, 20);
      const h = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Trapetsi paralleelsed küljed on } ${a} \\text{ ja } ${b}\\text{, kõrgus } ${h}\\text{. Leia trapetsi pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus((a + b) * h, 2) },
        lahendus: [
          `S = \\dfrac{(a+b)h}{2} = \\dfrac{(${a}+${b})\\cdot${h}}{2} = \\dfrac{${(a + b) * h}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);
      const h = 2 * int(rng, 1, 10);
      const b = int(rng, 2, 20);
      const area = ((a + b) * h) / 2;

      return {
        seed: 2,
        kysimus: `\\text{Trapetsi pindala on } ${area}\\text{, üks paralleelne külg on } ${a} \\text{ ja kõrgus } ${h}\\text{. Leia teine paralleelne külg.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b },
        lahendus: [
          `${area} = \\dfrac{(${a}+b)\\cdot${h}}{2} \\quad \\Rightarrow \\quad ${a}+b = \\dfrac{${2 * area}}{${h}} = ${(2 * area) / h} \\quad \\Rightarrow \\quad b = ${b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [leg1, h, leg] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 4);
      const legLen = leg * t;
      const height = h * t;
      const baseDiff = 2 * leg1 * t;

      return {
        seed: 3,
        kysimus: `\\text{Võrdhaarse trapetsi jalg on } ${legLen} \\text{ ja kõrgus } ${height}\\text{. Leia paralleelsete külgede pikkuste vahe.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: baseDiff },
        lahendus: [
          `\\text{Jala, kõrguse ja poole aluste vahe moodustavad täisnurkse kolmnurga: } \\sqrt{${legLen}^2-${height}^2} = ${leg1 * t}`,
          `\\text{Aluste vahe on kaks korda see: } 2\\cdot${leg1 * t} = ${baseDiff}`,
        ],
      };
    },
  },
];
