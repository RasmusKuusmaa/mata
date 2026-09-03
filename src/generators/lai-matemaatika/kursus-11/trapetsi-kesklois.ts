import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-trapetsi-kesklois";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);
      const b = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Trapetsi paralleelsed küljed on } ${a} \\text{ ja } ${b}\\text{. Leia kesklõigu pikkus.}`,
        vastus: { tuup: "arv", ...arvVaartus(a + b, 2) },
        lahendus: [`m = \\dfrac{a+b}{2} = \\dfrac{${a}+${b}}{2} = \\dfrac{${a + b}}{2}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = int(rng, 3, 30);
      const a = int(rng, 2, 2 * m - 2);
      const b = 2 * m - a;

      return {
        seed: 2,
        kysimus: `\\text{Trapetsi kesklõik on } ${m} \\text{ ja üks paralleelne külg on } ${a}\\text{. Leia teine paralleelne külg.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b },
        lahendus: [
          `2m = a+b \\quad \\Rightarrow \\quad b = 2\\cdot${m} - ${a} = ${b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, 2, 20);
      const h = int(rng, 2, 20);

      return {
        seed: 3,
        kysimus: `\\text{Trapetsi kesklõik on } ${m} \\text{ ja kõrgus on } ${h}\\text{. Leia trapetsi pindala (} S=m\\cdot h\\text{).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m * h },
        lahendus: [
          `\\text{Trapetsi pindala saab avaldada kesklõigu kaudu: } S=m\\cdot h = ${m}\\cdot${h} = ${m * h}`,
        ],
      };
    },
  },
];
