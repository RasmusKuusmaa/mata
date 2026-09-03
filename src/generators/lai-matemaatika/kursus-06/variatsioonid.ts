import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-variatsioonid";

/** `n·(n-1)·…·(n-r+1)`, the number of ordered selections of `r` from `n`. */
function variation(n: number, r: number): number {
  let result = 1;
  for (let i = 0; i < r; i++) result *= n - i;
  return result;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 5, 10);
      const r = int(rng, 2, 3);
      const value = variation(n, r);

      return {
        seed: 1,
        kysimus: `\\text{Mitmel viisil saab } ${n} \\text{ eseme hulgast valida ja järjestada } ${r} \\text{ eset?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `V_{${n}}^{${r}} = \\dfrac{${n}!}{(${n}-${r})!} = ${Array.from({ length: r }, (_, i) => n - i).join(" \\cdot ")} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 6, 12);
      const r = 3;
      const value = variation(n, r);

      return {
        seed: 2,
        kysimus: `\\text{Võistlusel osaleb } ${n} \\text{ sportlast. Mitmel viisil saab jagada kuld-, hõbe- ja pronksmedali?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `V_{${n}}^{3} = ${n} \\cdot ${n - 1} \\cdot ${n - 2} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = int(rng, 5, 9);
      const r = int(rng, 2, 4);
      const withoutLast = variation(n - 1, r - 1);

      return {
        seed: 3,
        kysimus: `\\text{Hulgas on } ${n} \\text{ eset, sh. üks konkreetne ese } X\\text{. Mitmel viisil saab valida ja järjestada } ${r} \\text{ eset nii, et } X \\text{ oleks nende hulgas viimasel kohal?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: withoutLast },
        lahendus: [
          `\\text{Viimane koht on fikseeritud (} X\\text{), ülejäänud } ${r - 1} \\text{ kohta täidetakse ülejäänud } ${n - 1} \\text{ esemega järjestatult:}`,
          `V_{${n - 1}}^{${r - 1}} = ${withoutLast}`,
        ],
      };
    },
  },
];
