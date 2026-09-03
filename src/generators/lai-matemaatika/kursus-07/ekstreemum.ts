import { alus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-ekstreemum";

function hTerm(h: number): string {
  return h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Kas funktsiooni } f(x) = ${hTerm(h)}^2 + ${k} \\text{ haripunkt on miinimum või maksimum?}`,
        vastus: { tuup: "valik", oige: "miinimum", eksitajad: ["maksimum"] },
        lahendus: [
          `\\text{Kuna haarad on üleval (kordaja } x^2 \\text{ ees on positiivne), on haripunkt } \\textbf{miinimum}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Kas funktsiooni } f(x) = -${hTerm(h)}^2 + ${k} \\text{ haripunkt on miinimum või maksimum?}`,
        vastus: { tuup: "valik", oige: "maksimum", eksitajad: ["miinimum"] },
        lahendus: [
          `\\text{Kuna haarad on all (kordaja } x^2 \\text{ ees on negatiivne), on haripunkt } \\textbf{maksimum}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3] as const);
      const h = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const b = -2 * a * h;
      const c = a * h * h + k;

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)} \\text{ ekstreemumi väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Haripunkti } x\\text{-koordinaat: } x = -\\dfrac{b}{2a} = -\\dfrac{${b}}{${2 * a}} = ${h}`,
          `f(${h}) = ${a} \\cdot ${alus(h)}^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\cdot ${alus(h)} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${k}`,
        ],
      };
    },
  },
];
