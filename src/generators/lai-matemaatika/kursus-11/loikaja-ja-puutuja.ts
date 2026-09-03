import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-loikaja-ja-puutuja";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const e = pick(rng, [2, 3, 4, 5, 6] as const);
      const n = int(rng, 2, 6);
      const w = e * n * n;
      const t = e * n;

      return {
        seed: 1,
        kysimus: `\\text{Punktist väljaspool ringjoont on tõmmatud puutuja pikkusega } ${t} \\text{ ja lõikaja, mille väline osa on } ${e}\\text{. Leia lõikaja täispikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: w },
        lahendus: [
          `\\text{Puutuja-lõikaja seos: } t^2 = e \\cdot w`,
          `w = \\dfrac{t^2}{e} = \\dfrac{${t}^2}{${e}} = ${w}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const e = pick(rng, [2, 3, 4, 5, 6] as const);
      const n = int(rng, 2, 6);
      const w = e * n * n;
      const t = e * n;

      return {
        seed: 2,
        kysimus: `\\text{Punktist väljaspool ringjoont on tõmmatud lõikaja, mille väline osa on } ${e} \\text{ ja täispikkus } ${w}\\text{. Leia sellest punktist tõmmatud puutuja pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: t },
        lahendus: [
          `t^2 = e \\cdot w = ${e} \\cdot ${w} = ${e * w}`,
          `t = \\sqrt{${e * w}} = ${t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const e1 = pick(rng, [2, 3, 4] as const);
      const w1 = e1 * int(rng, 2, 6);
      const product = e1 * w1;
      const e2 = pick(
        rng,
        Array.from({ length: product }, (_, i) => i + 1).filter((d) => product % d === 0 && d !== w1),
      );
      const w2 = product / e2;

      return {
        seed: 3,
        kysimus: `\\text{Punktist väljaspool ringjoont on tõmmatud kaks lõikajat. Esimese välimine osa on } ${e1} \\text{ ja täispikkus } ${w1}\\text{. Teise välimine osa on } ${e2}\\text{. Leia teise lõikaja täispikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: w2 },
        lahendus: [
          `\\text{Kahe lõikaja korrutised on võrdsed: } e_1 w_1 = e_2 w_2`,
          `${e1} \\cdot ${w1} = ${e2} \\cdot w_2 \\quad \\Rightarrow \\quad w_2 = \\dfrac{${product}}{${e2}} = ${w2}`,
        ],
      };
    },
  },
];
