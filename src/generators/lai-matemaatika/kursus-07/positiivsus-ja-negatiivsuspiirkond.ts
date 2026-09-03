import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "07-positiivsus-ja-negatiivsuspiirkond";

function distinctRoots(rng: Rng, lo: number, hi: number, count: 1 | 2): number[] {
  const roots: number[] = [];
  while (roots.length < count) {
    const candidate = int(rng, lo, hi);
    if (!roots.includes(candidate)) roots.push(candidate);
  }
  return roots.sort((x, y) => x - y);
}

/** Formats `a·x² + b·x + c` with correct signs (`a` is always `1` here). */
function ruutAvaldis(a: number, b: number, c: number): string {
  const bTerm = b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const cTerm = c === 0 ? "" : ` ${c > 0 ? "+" : "-"} ${Math.abs(c)}`;
  return `${a === 1 ? "x^2" : `${a}x^2`}${bTerm}${cTerm}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const [r] = distinctRoots(rng, -9, 9, 1);
      const b = -a * r;
      const kordajaSona = a > 0 ? "positiivne" : "negatiivne";
      const oige = a > 0 ? `x > ${r}` : `x < ${r}`;
      const teine = a > 0 ? `x < ${r}` : `x > ${r}`;

      return {
        seed: 1,
        kysimus: `\\text{Millise } x \\text{ korral on } f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ positiivne?}`,
        vastus: { tuup: "valik", oige, eksitajad: [teine, `x = ${r}`] },
        lahendus: [
          `\\text{Nullkoht on } x = ${r}\\text{. Kordaja on } \\text{${kordajaSona}}\\text{, seega on funktsioon positiivne, kui } ${oige}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [r1, r2] = distinctRoots(rng, -9, 9, 2);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const oige = `${r1} < x < ${r2}`;

      return {
        seed: 2,
        kysimus: `\\text{Millise } x \\text{ korral on } f(x) = ${ruutAvaldis(1, b, c)} \\text{ negatiivne?}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`x < ${r1} või x > ${r2}`, `x < ${r1}`, `x > ${r2}`],
        },
        lahendus: [
          `\\text{Nullkohad on } x_1=${r1} \\text{ ja } x_2=${r2}\\text{. Kuna haarad on üleval, on funktsioon negatiivne nullkohtade vahel.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [r1, r2] = distinctRoots(rng, -9, 9, 2);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const oige = `${r1} < x < ${r2}`;

      return {
        seed: 3,
        kysimus: `\\text{Millise } x \\text{ korral on } f(x) = -${ruutAvaldis(1, b, c)} \\text{ positiivne?}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`x < ${r1} või x > ${r2}`, `x < ${r1}`, `x > ${r2}`],
        },
        lahendus: [
          `\\text{Nullkohad on } x_1=${r1} \\text{ ja } x_2=${r2}\\text{. Kuna haarad on all (miinusmärk ees), on funktsioon positiivne nullkohtade vahel.}`,
        ],
      };
    },
  },
];
