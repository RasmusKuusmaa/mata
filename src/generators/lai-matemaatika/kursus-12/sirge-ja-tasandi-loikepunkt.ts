import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-sirge-ja-tasandi-loikepunkt";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, -5, 5);
      const y0 = int(rng, -5, 5);
      const z0 = int(rng, -5, 5);
      const mx = nonZeroInt(rng, -4, 4);
      const my = int(rng, -4, 4);
      const mz = int(rng, -4, 4);
      // Tasand x = target (normaalvektor (1,0,0)); t leitakse x-võrrandist.
      const t = 2;
      const target = x0 + mx * t;

      return {
        seed: 1,
        kysimus: `\\text{Sirge on } x=${x0}+${mx}t,\\ y=${y0}+${my}t,\\ z=${z0}+${mz}t \\text{ ja tasand } x=${target}\\text{. Leia lõikepunkti parameetri } t \\text{ väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: t },
        lahendus: [
          `${x0}+${mx}t=${target} \\quad\\Rightarrow\\quad t=\\dfrac{${target}-(${x0})}{${mx}}=${t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x0 = int(rng, -4, 4);
      const y0 = int(rng, -4, 4);
      const z0 = int(rng, -4, 4);
      const mx = nonZeroInt(rng, -3, 3);
      const my = nonZeroInt(rng, -3, 3);
      const mz = nonZeroInt(rng, -3, 3);
      const t = int(rng, 1, 3);
      // Tasand: x+y+z = väärtus lõikepunktis, konstrueeritud nii, et t on tulemus.
      const summaKordaja = mx + my + mz;
      const c = x0 + y0 + z0 + summaKordaja * t;

      return {
        seed: 2,
        kysimus: `\\text{Sirge on } x=${x0}+${mx}t,\\ y=${y0}+${my}t,\\ z=${z0}+${mz}t \\text{ ja tasand } x+y+z=${c}\\text{. Leia lõikepunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 + mx * t },
        lahendus: [
          `(${x0}+${mx}t)+(${y0}+${my}t)+(${z0}+${mz}t)=${c}`,
          `${x0 + y0 + z0}+${summaKordaja}t=${c} \\quad\\Rightarrow\\quad t=${t}`,
          `x = ${x0}+${mx}\\cdot${t} = ${x0 + mx * t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const mx = nonZeroInt(rng, -4, 4);
      const my = nonZeroInt(rng, -4, 4);
      const mz = -mx - my;
      // Sirge sihivektor risti tasandi x+y+z=c normaaliga (1,1,1) kui mx+my+mz=0.
      const x0 = int(rng, -5, 5);
      const y0 = int(rng, -5, 5);
      const z0 = int(rng, -5, 5);
      const c = x0 + y0 + z0 + 1;

      return {
        seed: 3,
        kysimus: `\\text{Sirge on } x=${x0}+${mx}t,\\ y=${y0}+${my}t,\\ z=${z0}+${mz}t \\text{ ja tasand } x+y+z=${c}\\text{. Kas sirge lõikab tasandit täpselt ühes punktis?}`,
        vastus: { tuup: "valik", oige: "ei", eksitajad: ["jah"] },
        lahendus: [
          `\\text{Sihivektori ja normaali skalaarkorrutis: } ${mx}+${my}+${mz}=0\\text{ — sirge on tasandiga paralleelne, ei lõiku täpselt ühes punktis.}`,
        ],
      };
    },
  },
];
