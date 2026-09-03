import { int, nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-lineaarvorratus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a, b, sign, x } = redrawUntilNice((r) => {
        const a = nonZeroInt(r, 2, 8);
        const b = int(r, -9, 9);
        const sign = pick(r, ["<", ">"]);
        const x = int(r, -9, 9);
        const c = a * x + b;
        return { a, b, sign, x, c };
      }, rng);
      const c = a * x + b;
      const bSign = b >= 0 ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus ja leia lahendihulga piirpunkt: } ${a}x ${bSign} ${Math.abs(b)} ${sign} ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Lahutame mõlemalt poolt } ${b}\\text{ ja jagame arvuga } ${a}\\text{ (positiivne, suund ei muutu):}`,
          `x ${sign} \\dfrac{${c} - (${b})}{${a}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, c, x } = redrawUntilNice((r) => {
        let a: number, c: number;
        do {
          a = nonZeroInt(r, -6, 6);
          c = nonZeroInt(r, -6, 6);
        } while (a === c);
        const x = int(r, -8, 8);
        return { a, c, x };
      }, rng);
      const b = int(rng, -9, 9);
      const d = (a - c) * x + b;
      const bSign = b >= 0 ? "+" : "-";
      const dSign = d >= 0 ? "+" : "-";
      const pooratud = a - c < 0;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrratus ja leia lahendihulga piirpunkt: } ${a}x ${bSign} ${Math.abs(b)} > ${c}x ${dSign} ${Math.abs(d)}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Koondame tundmatuga liikmed: } ${a - c}x > ${d - b}\\text{.}`,
          pooratud
            ? `\\text{Jagame negatiivse arvuga, seega võrratusmärk pöördub.}`
            : `\\text{Jagame positiivse arvuga, suund ei muutu.}`,
          `x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 8);
      const p = int(rng, -9, 9);
      const x = int(rng, -9, 9);
      const c = a * (x + p);
      const pSign = p >= 0 ? "+" : "-";

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrratus ja leia lahendihulga piirpunkt: } ${a}(x ${pSign} ${Math.abs(p)}) < ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Avame sulud: } ${a}x ${a * p >= 0 ? "+" : "-"} ${Math.abs(a * p)} < ${c}\\text{.}`,
          `x < \\dfrac{${c} - (${a * p})}{${a}} = ${x}`,
        ],
      };
    },
  },
];
