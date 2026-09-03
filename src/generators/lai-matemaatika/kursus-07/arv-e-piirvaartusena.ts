import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-arv-e-piirvaartusena";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = pick(rng, [1, 2] as const);
      const vastus = n === 1 ? arvVaartus(2) : arvVaartus(9, 4);

      return {
        seed: 1,
        kysimus: `\\text{Jada } a_n = \\left(1+\\dfrac{1}{n}\\right)^n \\text{ liige } a_{${n}} \\text{ on arvu } e \\text{ lähend. Arvuta } a_{${n}} \\text{ täpselt.}`,
        vastus: { tuup: "arv", ...vastus },
        lahendus:
          n === 1
            ? [`a_1 = \\left(1+\\dfrac{1}{1}\\right)^1 = 2^1 = 2`]
            : [`a_2 = \\left(1+\\dfrac{1}{2}\\right)^2 = \\left(\\dfrac{3}{2}\\right)^2 = \\dfrac{9}{4}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Milline järgnevatest jadadest defineerib piirväärtusena arvu } e\\text{?}`,
        vastus: {
          tuup: "valik",
          oige: "(1 + 1/n)^n",
          eksitajad: ["(1 - 1/n)^n", "n^(1/n)", "(1 + n)^(1/n)"],
        },
        lahendus: [
          `\\text{Arv } e \\text{ on defineeritud piirväärtusena } e = \\lim_{n\\to\\infty}\\left(1+\\dfrac{1}{n}\\right)^n\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const kumbSuurem = pick(rng, [true, false]);
      const sona = kumbSuurem ? "suurem" : "väiksem";
      const oige = kumbSuurem ? "π" : "e";

      return {
        seed: 3,
        kysimus: `\\text{Kumb arv on ${sona}: } e \\text{ või } \\pi\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "π" ? "e" : "π", "need on võrdsed"] },
        lahendus: [
          `e \\approx 2{,}71828\\ldots \\quad \\pi \\approx 3{,}14159\\ldots`,
          kumbSuurem
            ? `\\text{Seega } \\pi > e\\text{, ehk } \\pi \\text{ on suurem.}`
            : `\\text{Seega } \\pi > e\\text{, ehk } e \\text{ on väiksem.}`,
        ],
      };
    },
  },
];
