import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-sarnaste-hulknurkade-suhted";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 9);

      return {
        seed: 1,
        kysimus: `\\text{Kaks hulknurka on sarnased sarnasusteguriga } k=${k}\\text{. Leia pindalade suhe.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * k },
        lahendus: [
          `\\text{Pindalade suhe on sarnasusteguri ruut: } k^2 = ${k}^2 = ${k * k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 9);
      const areaRatio = k * k;

      return {
        seed: 2,
        kysimus: `\\text{Kaks hulknurka on sarnased. Nende pindalade suhe on } ${areaRatio}\\text{. Leia sarnasustegur (ümbermõõtude suhe).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `k = \\sqrt{${areaRatio}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 9);
      const s = int(rng, 2, 12);
      const area1 = s * s;
      const area2 = s * s * k * k;

      return {
        seed: 3,
        kysimus: `\\text{Kahe sarnase hulknurga pindalad on } ${area1} \\text{ ja } ${area2}\\text{. Leia nende ümbermõõtude suhe.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Ümbermõõtude suhe} = \\sqrt{\\dfrac{${area2}}{${area1}}} = \\sqrt{${k * k}} = ${k}`,
        ],
      };
    },
  },
];
