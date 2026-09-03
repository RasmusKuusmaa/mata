import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-lineaarmudelid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const baas = int(rng, 2, 10);
      const kmHind = int(rng, 1, 3);
      const km = int(rng, 5, 20);

      return {
        seed: 1,
        kysimus: `\\text{Takso baashind on } ${baas} \\text{ eurot ja iga kilomeeter maksab } ${kmHind} \\text{ eurot. Leia } ${km} \\text{ km sõidu hind.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: baas + kmHind * km },
        lahendus: [
          `y = ${kmHind}x+${baas} = ${kmHind}\\cdot${km}+${baas} = ${baas + kmHind * km}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 2, 8);
      const b = int(rng, -10, 10);
      const x1 = int(rng, -5, 5);
      const y1 = k * x1 + b;
      const x2 = x1 + int(rng, 2, 5);
      const y2 = k * x2 + b;

      return {
        seed: 2,
        kysimus: `\\text{Lineaarne mudel läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia mudeli tõus } k\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `k = \\dfrac{${y2}-(${y1})}{${x2}-(${x1})} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const b = int(rng, 10, 50);
      const k = int(rng, 2, 5);
      const target = b + k * int(rng, 3, 10);
      const x = (target - b) / k;

      return {
        seed: 3,
        kysimus: `\\text{Taime kõrgus mudeldub valemiga } h(t)=${k}t+${b} \\text{ (cm, } t \\text{ nädalates). Mitme nädala pärast on taim } ${target} \\text{ cm kõrge?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `${k}t+${b}=${target} \\quad\\Rightarrow\\quad t=\\dfrac{${target - b}}{${k}}=${x}`,
        ],
      };
    },
  },
];
