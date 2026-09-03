import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-puramiid";

/**
 * A regular quadrilateral pyramid scaled from the 3-4-5 right triangle so
 * the apothem, height and slant height are all integers:
 * apothem = 3t, height = 4t, slant = 5t, base edge = 2·apothem = 6t.
 */
function build(t: number) {
  const apothem = 3 * t;
  const h = 4 * t;
  const l = 5 * t;
  const a = 2 * apothem;
  return { a, h, l };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const t = int(rng, 1, 5);
      const { a, h } = build(t);
      const volume = (a * a * h) / 3;

      return {
        seed: 1,
        kysimus: `\\text{Korrapärase nelinurkse püramiidi põhiserv on } a=${a} \\text{ ja kõrgus } h=${h}\\text{. Leia püramiidi ruumala.}`,
        vastus: { tuup: "arv", ...arvVaartus(volume) },
        lahendus: [
          `V = \\dfrac{1}{3}a^2h = \\dfrac{1}{3}\\cdot ${a}^2\\cdot ${h} = \\dfrac{${a * a}\\cdot ${h}}{3} = ${volume}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const t = int(rng, 1, 5);
      const { a, l } = build(t);
      const lateral = 2 * a * l;

      return {
        seed: 2,
        kysimus: `\\text{Korrapärase nelinurkse püramiidi põhiserv on } a=${a} \\text{ ja külgserva ehk apoteemi pikkus on } l=${l}\\text{. Leia püramiidi külgpindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(lateral) },
        lahendus: [
          `S_{\\text{külg}} = \\dfrac{1}{2}Pl = \\dfrac{1}{2}\\cdot 4${a}\\cdot ${l} = 2\\cdot ${a}\\cdot ${l} = ${lateral}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const t = int(rng, 1, 5);
      const { a, l } = build(t);
      const total = a * a + 2 * a * l;

      return {
        seed: 3,
        kysimus: `\\text{Korrapärase nelinurkse püramiidi põhiserv on } a=${a} \\text{ ja apoteem } l=${l}\\text{. Leia püramiidi täispindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(total) },
        lahendus: [
          `S = a^2 + \\dfrac{1}{2}Pl = ${a}^2 + 2\\cdot ${a}\\cdot ${l} = ${a * a} + ${2 * a * l} = ${total}`,
        ],
      };
    },
  },
];
