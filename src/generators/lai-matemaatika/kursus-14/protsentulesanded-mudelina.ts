import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-protsentulesanded-mudelina";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const K0 = int(rng, 2, 30);
      const n = int(rng, 1, 3);
      const Kn = K0 * 2 ** n;

      return {
        seed: 1,
        kysimus: `\\text{Summa } K_0=${K0} \\text{ kasvab } 100\\% \\text{ iga perioodi kohta. Leia summa väärtus } ${n} \\text{ perioodi pärast.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: Kn },
        lahendus: [
          `K_n = K_0(1+1)^n = ${K0}\\cdot2^${n} = ${Kn}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 1, 2);
      const base = int(rng, 2, 10);
      const K0 = base * 2 ** n;
      const Kn = K0 * 3 ** n;

      return {
        seed: 2,
        kysimus: `\\text{Summa } K_0=${K0} \\text{ kasvab } 50\\% \\text{ iga perioodi kohta. Leia summa väärtus } ${n} \\text{ perioodi pärast.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: Kn },
        lahendus: [
          `K_n = K_0\\left(1+\\dfrac{50}{100}\\right)^n = ${K0}\\cdot\\left(\\dfrac32\\right)^${n} = ${Kn}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = int(rng, 1, 2);
      const m = int(rng, 2, 8);
      const K0 = m * 4 ** n;
      const varasem = m * 5 ** n;

      return {
        seed: 3,
        kysimus: `\\text{Summa on praegu } K_0=${K0} \\text{ ja kahaneb iga perioodiga } 20\\% \\text{ võrra. Kui suur oli summa } ${n} \\text{ perioodi eest?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: varasem },
        lahendus: [
          `\\text{Kahanemine } 20\\%\\text{ tähendab kordajat } 0{,}8=\\dfrac45\\text{ perioodi kohta.}`,
          `\\text{Varasem väärtus} \\cdot\\left(\\dfrac45\\right)^{${n}} = ${K0} \\quad\\Rightarrow\\quad \\text{varasem väärtus} = ${varasem}`,
        ],
      };
    },
  },
];
