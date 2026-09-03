import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-trigonomeetria-rakendusulesanded";

const RADIAN_DENOMINATORS = [2, 3, 4, 6] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const distance = int(rng, 5, 50);

      return {
        seed: 1,
        kysimus: `\\text{Vaatleja seisab torni tipust } ${distance} \\text{ m kaugusel. Tipu kõrgusnurk vaatleja suhtes on } 45^\\circ\\text{. Leia torni kõrgus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: distance },
        lahendus: [
          `h = d \\cdot \\tg\\,45^\\circ = d \\cdot 1 = d`,
          `h = ${distance} \\text{ m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const distance = int(rng, 5, 50);
      const angle = pick(rng, [30, 60] as const);
      const [num, den]: [number, number] =
        angle === 30 ? reduceFraction(distance, 3) : [distance, 1];

      return {
        seed: 2,
        kysimus: `\\text{Vaatleja seisab torni tipust } ${distance} \\text{ m kaugusel. Tipu kõrgusnurk vaatleja suhtes on } ${angle}^\\circ\\text{. Leia torni kõrgus (täpne väärtus).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: num, denominator: den } },
        lahendus:
          angle === 30
            ? [
                `h = d \\cdot \\tg\\,30^\\circ = d \\cdot \\dfrac{\\sqrt3}{3}`,
                `h = ${distance} \\cdot \\dfrac{\\sqrt3}{3} = \\dfrac{${num}\\sqrt3}{${den}} \\text{ m}`,
              ]
            : [
                `h = d \\cdot \\tg\\,60^\\circ = d \\cdot \\sqrt3`,
                `h = ${distance}\\sqrt3 \\text{ m}`,
              ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 3, 15);
      const n = pick(rng, RADIAN_DENOMINATORS);
      const k = int(rng, 1, 2 * n - 1);
      const [num, den] = reduceFraction(r * k, n);

      return {
        seed: 3,
        kysimus: `\\text{Vaaterattal (raadius } ${r} \\text{ m) läbib istme kinnituspunkt kesknurga } \\dfrac{${k}\\pi}{${n}} \\text{ radiaani. Kui pika kaare see punkt läbib (kordajana arvust } \\pi\\text{)?}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Kaare pikkus on } l = r\\theta\\text{:}`,
          `l = ${r} \\cdot \\dfrac{${k}\\pi}{${n}} = \\dfrac{${num}\\pi}{${den}} \\text{ m}`,
        ],
      };
    },
  },
];
