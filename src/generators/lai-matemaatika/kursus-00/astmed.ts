import { int } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-astmed-naturaalarvulise-astendajaga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 6);
      const n = int(rng, 2, 4);
      const tulemus = a ** n;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } ${a}^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `${a}^${n} \\text{ tähendab, et } ${a} \\text{ on tegurina } ${n} \\text{ korda:}`,
          `${a}^${n} = ${Array(n).fill(a).join(" \\cdot ")} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 5);
      const m = int(rng, 3, 6);
      const n = int(rng, 1, m - 1);
      const korrutamine = int(rng, 0, 1) === 1;
      const opSymbol = korrutamine ? "\\cdot" : ":";
      const uusAstendaja = korrutamine ? m + n : m - n;
      const tulemus = a ** uusAstendaja;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } ${a}^${m} ${opSymbol} ${a}^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          korrutamine
            ? `\\text{Sama alusega astmete korrutamisel liidetakse astendajad:}`
            : `\\text{Sama alusega astmete jagamisel lahutatakse astendajad:}`,
          `${a}^${m} ${opSymbol} ${a}^${n} = ${a}^{${uusAstendaja}} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 4);
      const m = int(rng, 2, 3);
      const n = int(rng, 2, 3);
      const uusAstendaja = m * n;
      const tulemus = a ** uusAstendaja;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } (${a}^${m})^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Astme astendamisel korrutatakse astendajad:}`,
          `(${a}^${m})^${n} = ${a}^{${m} \\cdot ${n}} = ${a}^{${uusAstendaja}} = ${tulemus}`,
        ],
      };
    },
  },
];
