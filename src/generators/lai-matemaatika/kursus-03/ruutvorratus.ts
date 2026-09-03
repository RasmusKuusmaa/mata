import { nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-ruutvorratus";

function faktorString(r1: number, r2: number): string {
  const t1 = r1 >= 0 ? `x - ${r1}` : `x + ${-r1}`;
  const t2 = r2 >= 0 ? `x - ${r2}` : `x + ${-r2}`;
  return `(${t1})(${t2})`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
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

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus } ${faktorString(r1, r2)} > 0 \\text{ ja leia väikseim täisarvuline lahend, mis on suurem mõlemast nullkohast.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Nullkohad on } ${vaiksem} \\text{ ja } ${suurem}\\text{. Ruutliige on positiivne, kui } x < ${vaiksem} \\text{ või } x > ${suurem}\\text{.}`,
          `\\text{Väikseim täisarv, mis on suurem kui } ${suurem}\\text{, on } ${tulemus}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { r1, r2 } = redrawUntilNice((r) => {
        const r1 = nonZeroInt(r, -8, 8);
        const r2 = nonZeroInt(r, -8, 8);
        return Math.abs(r1 - r2) >= 3 ? { r1, r2 } : null;
      }, rng);
      const vaiksem = Math.min(r1, r2);
      const suurem = Math.max(r1, r2);
      const arv = suurem - vaiksem - 1;

      return {
        seed: 2,
        kysimus: `\\text{Mitu täisarvulist lahendit on võrratusel } ${faktorString(r1, r2)} < 0\\text{?}`,
        vastus: { tuup: "arv", ...arvVaartus(arv) },
        lahendus: [
          `\\text{Nullkohad on } ${vaiksem} \\text{ ja } ${suurem}\\text{. Ruutliige on negatiivne vahemikus } ${vaiksem} < x < ${suurem}\\text{.}`,
          `\\text{Täisarve selles vahemikus on } ${arv}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = 2;
      const r1 = nonZeroInt(rng, -7, 7);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -7, 7);
        } while (v === r1);
        return v;
      })();
      const vaiksem = Math.min(r1, r2);
      const suurem = Math.max(r1, r2);
      const tulemus = suurem + 1;
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const bTerm = ` ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x`;
      const cTerm = ` ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrratus ja leia väikseim täisarvuline lahend, mis on suurem mõlemast nullkohast: } ${a}x^2${bTerm}${cTerm} > 0`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Tegurdame: } ${a}${faktorString(r1, r2)} > 0\\text{. Nullkohad on } ${vaiksem} \\text{ ja } ${suurem}\\text{.}`,
          `\\text{Väikseim täisarv, mis on suurem kui } ${suurem}\\text{, on } ${tulemus}\\text{.}`,
        ],
      };
    },
  },
];
