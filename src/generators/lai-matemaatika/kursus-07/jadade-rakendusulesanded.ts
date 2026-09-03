import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-jadade-rakendusulesanded";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a1 = int(rng, 300, 800);
      const d = int(rng, 20, 100);
      const n = int(rng, 3, 12);
      const value = a1 + (n - 1) * d;

      return {
        seed: 1,
        kysimus: `\\text{Esimesel kuul teenis müüja } ${a1} \\text{ eurot ja iga järgmise kuuga } ${d} \\text{ eurot rohkem. Mitu eurot teenis müüja } ${n}\\text{. kuul?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Tegemist on aritmeetilise jadaga: } a_1 = ${a1}\\text{, } d = ${d}\\text{.}`,
          `a_{${n}} = ${a1} + (${n}-1) \\cdot ${d} = ${value} \\text{ eurot}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a1 = int(rng, 10, 100);
      const n = int(rng, 2, 8);
      const value = a1 * 2 ** (n - 1);

      return {
        seed: 2,
        kysimus: `\\text{Bakterite populatsioon on alguses } ${a1}\\text{. Iga tunniga populatsioon kahekordistub. Kui suur on populatsioon } ${n}\\text{. tunni möödudes (kaasa arvatud algne olek liikmena } a_1\\text{)?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Tegemist on geomeetrilise jadaga: } a_1 = ${a1}\\text{, } q = 2\\text{.}`,
          `a_{${n}} = ${a1} \\cdot 2^{${n - 1}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a1 = int(rng, 300, 800);
      const d = int(rng, 20, 100);
      const n = int(rng, 3, 12);
      const an = a1 + (n - 1) * d;
      const total = (n * (a1 + an)) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Esimesel kuul teenis müüja } ${a1} \\text{ eurot ja iga järgmise kuuga } ${d} \\text{ eurot rohkem. Kui palju teenis müüja kokku esimese } ${n} \\text{ kuuga?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: total },
        lahendus: [
          `a_{${n}} = ${a1} + (${n}-1) \\cdot ${d} = ${an}`,
          `S_{${n}} = \\dfrac{${n}(${a1}+${an})}{2} = ${total} \\text{ eurot}`,
        ],
      };
    },
  },
];
