import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-vorratusesusteemid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a, b } = redrawUntilNice((r) => {
        const v1 = int(r, -9, 9);
        const v2 = int(r, -9, 9);
        const a = Math.min(v1, v2);
        const b = Math.max(v1, v2);
        return b - a >= 2 ? { a, b } : null;
      }, rng);
      const arv = b - a - 1;

      return {
        seed: 1,
        kysimus: `\\text{Mitu täisarvulist lahendit on võrratusesüsteemil?} \\begin{cases} x > ${a} \\\\ x < ${b} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(arv) },
        lahendus: [
          `\\text{Lahendihulk on vahemik } (${a}; ${b})\\text{.}`,
          `\\text{Täisarve selles vahemikus on } ${arv}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const c1 = int(rng, -9, 9);
      const c2 = (() => {
        let v: number;
        do {
          v = int(rng, -9, 9);
        } while (v === c1);
        return v;
      })();
      const a = Math.min(c1, c2);
      const b = Math.max(c1, c2);
      const k1 = nonZeroInt(rng, 2, 5);
      const k2 = nonZeroInt(rng, 2, 5);
      const arv = b - a - 1;

      return {
        seed: 2,
        kysimus: `\\text{Mitu täisarvulist lahendit on süsteemil?} \\begin{cases} ${k1}x > ${k1 * a} \\\\ ${k2}x < ${k2 * b} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(arv) },
        lahendus: [
          `\\text{Esimesest võrratusest: } x > ${a}\\text{. Teisest: } x < ${b}\\text{.}`,
          `\\text{Lahendihulk on } (${a}; ${b})\\text{, kus on } ${arv} \\text{ täisarvu.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, c } = redrawUntilNice((r) => {
        const v1 = int(r, -9, 9);
        const v2 = int(r, -9, 9);
        const v3 = int(r, -9, 9);
        const sorted = [v1, v2, v3].sort((x, y) => x - y);
        const [lo, mid, hi] = sorted;
        // Strict ordering, so `mid` sits properly inside the open
        // interval (lo, hi) — a tie would make the "-1" below wrong,
        // since an endpoint is already excluded by the strict < / >.
        return hi - lo >= 3 && lo < mid && mid < hi
          ? { a: lo, b: mid, c: hi }
          : null;
      }, rng);
      const arv = c - a - 1;

      return {
        seed: 3,
        kysimus: `\\text{Mitu täisarvulist lahendit on süsteemil?} \\begin{cases} x > ${a} \\\\ x < ${c} \\\\ x \\neq ${b} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(arv - 1) },
        lahendus: [
          `\\text{Vahemikus } (${a}; ${c}) \\text{ on } ${arv} \\text{ täisarvu, millest üks (} ${b} \\text{) tuleb välja jätta.}`,
          `${arv} - 1 = ${arv - 1}`,
        ],
      };
    },
  },
];
