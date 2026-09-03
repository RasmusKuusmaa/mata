import { int } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-taisarvuline-astendaja";
/** Denominator of a negative-power answer must stay ≤ 12 to be nice. */
const NICE_DENOMINATOR = 12;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 5);
      const n = int(rng, 0, 4);
      const tulemus = a ** n;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } ${a}^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus:
          n === 0
            ? [`\\text{Iga nullist erineva arvu nullindaks astmeks on } 1\\text{:}`, `${a}^0 = 1`]
            : [
                `${a}^${n} \\text{ tähendab, et } ${a} \\text{ on tegurina } ${n} \\text{ korda:}`,
                `${a}^${n} = ${tulemus}`,
              ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, n } = redrawUntilNice((r) => {
        const a = int(r, 2, 6);
        const n = int(r, 1, 3);
        return a ** n <= NICE_DENOMINATOR ? { a, n } : null;
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } ${a}^{-${n}}`,
        vastus: { tuup: "arv", ...arvVaartus(1, a ** n) },
        lahendus: [
          `\\text{Negatiivse astendajaga aste on pöördarvu vastava astme jagatis: } a^{-n} = \\dfrac{1}{a^n}\\text{.}`,
          `${a}^{-${n}} = \\dfrac{1}{${a}^${n}} = \\dfrac{1}{${a ** n}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, m, n } = redrawUntilNice((r) => {
        const a = int(r, 2, 6);
        const m = int(r, 1, 3);
        const n = int(r, m + 1, m + 3);
        return a ** (n - m) <= NICE_DENOMINATOR ? { a, m, n } : null;
      }, rng);
      const netoAstendaja = m - n;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } ${a}^${m} : ${a}^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(1, a ** (n - m)) },
        lahendus: [
          `\\text{Sama alusega astmete jagamisel lahutatakse astendajad:}`,
          `${a}^${m} : ${a}^${n} = ${a}^{${netoAstendaja}} = \\dfrac{1}{${a}^{${n - m}}} = \\dfrac{1}{${a ** (n - m)}}`,
        ],
      };
    },
  },
];
