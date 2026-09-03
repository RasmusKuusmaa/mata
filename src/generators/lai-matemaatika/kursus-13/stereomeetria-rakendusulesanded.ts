import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-stereomeetria-rakendusulesanded";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 8);
      const h = int(rng, 3, 12);
      const numerator = r * r * h;

      return {
        seed: 1,
        kysimus: `\\text{Silindrikujulise veepaagi põhiraadius on } r=${r} \\text{ m ja kõrgus } h=${h} \\text{ m. Leia paagi mahutavus (ruumala, kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `V = \\pi r^2 h = \\pi\\cdot ${r}^2\\cdot ${h} = ${numerator}\\pi \\text{ m}^3`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 6);
      const h = int(rng, 2, 9);
      const numerator = r * r * h;

      return {
        seed: 2,
        kysimus: `\\text{Liivahunnik moodustab koonuse, mille põhiraadius on } r=${r} \\text{ m ja kõrgus } h=${h} \\text{ m. Leia liivahunniku ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V = \\dfrac{1}{3}\\pi r^2h = \\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h} = \\dfrac{${numerator}\\pi}{3} \\text{ m}^3`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 6);
      const hSilinder = int(rng, 2, 8);
      const cylinderPart = r * r * hSilinder;
      const numerator = 3 * cylinderPart + 2 * r * r * r;

      return {
        seed: 3,
        kysimus: `\\text{Ladu koosneb silindrist (põhiraadius } r=${r} \\text{ m, kõrgus } h=${hSilinder} \\text{ m) ja selle otsa asetatud poolkerakujulisest katusest raadiusega } r=${r} \\text{ m. Leia kogu ehitise ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V_{silinder} = \\pi r^2h = \\pi\\cdot ${r}^2\\cdot ${hSilinder} = ${cylinderPart}\\pi \\text{ m}^3`,
          `V_{poolkera} = \\dfrac{2}{3}\\pi r^3 = \\dfrac{2}{3}\\pi\\cdot ${r}^3 = \\dfrac{${2 * r * r * r}\\pi}{3} \\text{ m}^3`,
          `V = ${cylinderPart}\\pi + \\dfrac{${2 * r * r * r}\\pi}{3} = \\dfrac{${3 * cylinderPart}\\pi + ${2 * r * r * r}\\pi}{3} = \\dfrac{${numerator}\\pi}{3} \\text{ m}^3`,
        ],
      };
    },
  },
];
