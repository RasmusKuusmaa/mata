import { int, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-uhikute-teisendamine";

/** Unit abbreviations render as upright `\text{}` (not italic math
 * variables) — `2` renders as the superscript exponent outside the box. */
type Uhikupaar = { suur: string; vaike: string; tegur: number };

const PIKKUS: Uhikupaar[] = [
  { suur: "\\text{m}", vaike: "\\text{cm}", tegur: 100 },
  { suur: "\\text{km}", vaike: "\\text{m}", tegur: 1000 },
  { suur: "\\text{kg}", vaike: "\\text{g}", tegur: 1000 },
  { suur: "\\text{l}", vaike: "\\text{ml}", tegur: 1000 },
];

const PINDALA: Uhikupaar[] = [
  { suur: "\\text{m}^2", vaike: "\\text{cm}^2", tegur: 10000 },
  { suur: "\\text{km}^2", vaike: "\\text{m}^2", tegur: 1000000 },
];

const RUUMALA: Uhikupaar[] = [
  { suur: "\\text{m}^3", vaike: "\\text{cm}^3", tegur: 1000000 },
  { suur: "\\text{dm}^3", vaike: "\\text{cm}^3", tegur: 1000 },
];

function buildGeneraator(seed: number, paarid: Uhikupaar[]): Generaator["genereeri"] {
  return (rng) => {
    const { suur, vaike, tegur } = pick(rng, paarid);
    const vaartus = int(rng, 1, 20);
    const tulemus = vaartus * tegur;

    return {
      seed,
      kysimus: `\\text{Teisenda } ${vaartus}\\ ${suur} \\text{ ühikusse } ${vaike}\\text{.}`,
      vastus: { tuup: "arv", ...arvVaartus(tulemus) },
      lahendus: [
        `1\\ ${suur} = ${tegur}\\ ${vaike}`,
        `${vaartus}\\ ${suur} = ${vaartus} \\cdot ${tegur}\\ ${vaike} = ${tulemus}\\ ${vaike}`,
      ],
    };
  };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: buildGeneraator(1, PIKKUS),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: buildGeneraator(2, PINDALA),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: buildGeneraator(3, RUUMALA),
  },
];
