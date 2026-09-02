import { int, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-diagrammide-lugemine";
const PAEVAD = ["esmaspäeval", "teisipäeval", "kolmapäeval", "neljapäeval"];

function tabelTekst(vaartused: number[]): string {
  return PAEVAD.map((paev, i) => `${paev} ${vaartused[i]}`).join(", ");
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const vaartused = [int(rng, 5, 30), int(rng, 5, 30), int(rng, 5, 30), int(rng, 5, 30)];
      const tulemus = Math.max(...vaartused);

      return {
        seed: 1,
        kysimus: `\\text{Tulpdiagrammil on kaupluse müük neljal päeval (tk): } ${tabelTekst(vaartused)}\\text{. Mitu tükki müüdi kõige suurema müügiga päeval?}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Võrdleme kõiki väärtusi ja valime suurima:}`,
          `\\max(${vaartused.join(", ")}) = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const vaartused = [int(rng, 5, 30), int(rng, 5, 30), int(rng, 5, 30), int(rng, 5, 30)];
      const suurim = Math.max(...vaartused);
      const vahim = Math.min(...vaartused);
      const tulemus = suurim - vahim;

      return {
        seed: 2,
        kysimus: `\\text{Tulpdiagrammil on kaupluse müük neljal päeval (tk): } ${tabelTekst(vaartused)}\\text{. Mitu tükki rohkem müüdi parimal päeval kõige nõrgemast päevast?}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Leiame suurima ja väikseima väärtuse vahe:}`,
          `${suurim} - ${vahim} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // Fix the week's total and Monday's share from nice-percent sets
      // first, so the percentage is an integer by construction — then
      // split the rest across the other three days (stars-and-bars, so
      // every day's value comes out a positive integer).
      const kokku = 20 * int(rng, 3, 6);
      const p = pick(rng, [10, 20, 25, 40, 50]);
      const esmaspaev = (kokku * p) / 100;
      const ulejaanud = kokku - esmaspaev;
      const l1 = int(rng, 1, ulejaanud - 2);
      const l2 = int(rng, l1 + 1, ulejaanud - 1);
      const vaartused = [esmaspaev, l1, l2 - l1, ulejaanud - l2];

      return {
        seed: 3,
        kysimus: `\\text{Tulpdiagrammil on kaupluse müük neljal päeval (tk): } ${tabelTekst(vaartused)}\\text{. Mitu protsenti nädala müügist moodustas esmaspäev?}`,
        vastus: { tuup: "arv", ...arvVaartus(p) },
        lahendus: [
          `\\text{Nädala kogumüük: } ${vaartused.join(" + ")} = ${kokku}\\text{.}`,
          `\\dfrac{${vaartused[0]}}{${kokku}} \\cdot 100\\% = ${p}\\%`,
        ],
      };
    },
  },
];
