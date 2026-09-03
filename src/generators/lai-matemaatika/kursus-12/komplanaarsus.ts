import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-komplanaarsus";

function segakorrutis(
  a: [number, number, number],
  b: [number, number, number],
  c: [number, number, number],
): number {
  const [ax, ay, az] = a;
  const [bx, by, bz] = b;
  const [cx, cy, cz] = c;
  return (
    ax * (by * cz - bz * cy) -
    ay * (bx * cz - bz * cx) +
    az * (bx * cy - by * cx)
  );
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a: [number, number, number] = [nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5)];
      const b: [number, number, number] = [nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5)];
      const p = int(rng, 1, 3);
      const q = int(rng, 1, 3);

      return {
        seed: 1,
        kysimus: `\\text{Vektor } \\vec{c}=${p}\\vec{a}+${q}\\vec{b}\\text{, kus } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Kas } \\vec{a}\\text{, } \\vec{b}\\text{, } \\vec{c} \\text{ on komplanaarsed?}`,
        vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
        lahendus: [
          `\\vec{c}\\text{ on } \\vec{a}\\text{ ja } \\vec{b}\\text{ lineaarkombinatsioon, seega on kolmik komplanaarne.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a: [number, number, number] = [1, 0, 0];
      const b: [number, number, number] = [0, 1, 0];
      const isKomplanaarne = pick(rng, [true, false] as const);
      const c: [number, number, number] = isKomplanaarne
        ? [nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5), 0]
        : [nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5), nonZeroInt(rng, -5, 5)];
      const det = segakorrutis(a, b, c);
      const tegelik = det === 0;

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]})\\text{, } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]}) \\text{ ja } \\vec{c}=(${c[0]}, ${c[1]}, ${c[2]})\\text{. Kas need on komplanaarsed?}`,
        vastus: { tuup: "valik", oige: tegelik ? "jah" : "ei", eksitajad: [tegelik ? "ei" : "jah"] },
        lahendus: [
          `\\text{Segakorrutis } = ${det}${tegelik ? "\\text{ — vektorid on komplanaarsed.}" : "\\ne 0\\text{ — vektorid ei ole komplanaarsed.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a: [number, number, number] = [nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4)];
      const b: [number, number, number] = [nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4)];
      const c: [number, number, number] = [nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4), nonZeroInt(rng, -4, 4)];
      const det = segakorrutis(a, b, c);

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]})\\text{, } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]}) \\text{ ja } \\vec{c}=(${c[0]}, ${c[1]}, ${c[2]})\\text{. Leia segakorrutis (kolmerealine determinant).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: det },
        lahendus: [
          `\\begin{vmatrix} ${a[0]} & ${a[1]} & ${a[2]} \\\\ ${b[0]} & ${b[1]} & ${b[2]} \\\\ ${c[0]} & ${c[1]} & ${c[2]} \\end{vmatrix} = ${det}`,
        ],
      };
    },
  },
];
