import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektori-moiste-ja-liigid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Vektor on } \\vec{a}=(${x}, ${y})\\text{. Leia vastandvektori } -\\vec{a} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: -x },
        lahendus: [
          `\\text{Vastandvektoril on vastupidised koordinaadid: } -\\vec{a}=(${-x}, ${-y})`,
        ],
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
        kysimus: `\\text{Vektor } \\vec{0}=(0,0) \\text{ on erijuhtum. Mis nime see kannab?}`,
        vastus: { tuup: "valik", oige: "nullvektor", eksitajad: ["ühikvektor", "vastandvektor"] },
        lahendus: [
          `\\text{Vektorit, mille pikkus on null (algus ja lõpp langevad kokku), nimetatakse } \\textbf{nullvektoriks}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const isUnit = pick(rng, [true, false]);
      const [x, y] = isUnit ? pick(rng, [[1, 0], [0, 1], [-1, 0], [0, -1]] as const) : [nonZeroInt(rng, -9, 9), nonZeroInt(rng, -9, 9)];

      return {
        seed: 3,
        kysimus: `\\text{Kas vektor } \\vec{a}=(${x}, ${y}) \\text{ on ühikvektor (pikkusega 1)?}`,
        vastus: { tuup: "valik", oige: isUnit ? "jah" : "ei", eksitajad: [isUnit ? "ei" : "jah"] },
        lahendus: [
          `|\\vec{a}| = \\sqrt{${x}^2+${y}^2} = \\sqrt{${x * x + y * y}}${isUnit ? " = 1" : " \\ne 1"}`,
        ],
      };
    },
  },
];
