import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-murdvorratus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -9, 9);
      const a = int(rng, 1, 9);
      const tulemus = p + 1;
      const pSign = p >= 0 ? "-" : "+";

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus ja leia väikseim täisarvuline lahend: } \\dfrac{${a}}{x ${pSign} ${Math.abs(p)}} > 0`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Määramispiirkond: } x \\neq ${p}\\text{. Lugeja on positiivne, seega murd on positiivne, kui nimetaja on positiivne: } x > ${p}\\text{.}`,
          `\\text{Väikseim täisarv, mis on suurem kui } ${p}\\text{, on } ${tulemus}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r1 = nonZeroInt(rng, -8, 8);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -8, 8);
        } while (v === r1);
        return v;
      })();
      const suurem = Math.max(r1, r2);
      const vaiksem = Math.min(r1, r2);
      const tulemus = suurem + 1;
      const sign1 = r1 >= 0 ? "-" : "+";
      const sign2 = r2 >= 0 ? "-" : "+";

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrratus ja leia väikseim täisarvuline lahend: } \\dfrac{x ${sign1} ${Math.abs(r1)}}{x ${sign2} ${Math.abs(r2)}} > 0`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Nullkoht: } x = ${r1}\\text{; määramispiirkonna piirang: } x \\neq ${r2}\\text{.}`,
          `\\text{Murd on positiivne, kui } x < ${vaiksem} \\text{ või } x > ${suurem}\\text{.}`,
          `\\text{Väikseim täisarv, mis on suurem kui } ${suurem}\\text{, on } ${tulemus}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { r1, r2 } = redrawUntilNice((r) => {
        const r1 = nonZeroInt(r, -8, 8);
        const r2 = nonZeroInt(r, -8, 8);
        return Math.abs(r1 - r2) >= 3 ? { r1, r2 } : null;
      }, rng);
      const vaiksem = Math.min(r1, r2);
      const suurem = Math.max(r1, r2);
      const arv = suurem - vaiksem - 1;
      const sign1 = r1 >= 0 ? "-" : "+";
      const sign2 = r2 >= 0 ? "-" : "+";

      return {
        seed: 3,
        kysimus: `\\text{Mitu täisarvulist lahendit on võrratusel } \\dfrac{x ${sign1} ${Math.abs(r1)}}{x ${sign2} ${Math.abs(r2)}} < 0\\text{?}`,
        vastus: { tuup: "arv", ...arvVaartus(arv) },
        lahendus: [
          `\\text{Murd on negatiivne vahemikus } ${vaiksem} < x < ${suurem}\\text{ (nullkoht ja määramispiirangu koht jäävad välja).}`,
          `\\text{Täisarve selles vahemikus on } ${arv}\\text{.}`,
        ],
      };
    },
  },
];
