import { int, nonZeroInt } from "@/generators/rng";
import { redrawUntilNice } from "@/generators/nice";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "E-ruutkolmliikme-tegurdamine";

/** Formats `(x - r)`, e.g. `3 -> "(x - 3)"`, `-3 -> "(x + 3)"`, `0 -> "x"`. */
function factorTerm(r: number): string {
  if (r === 0) return "x";
  const sign = r > 0 ? "-" : "+";
  return `(x ${sign} ${Math.abs(r)})`;
}

/** Formats `x² + bx + c` with correct signs, dropping a zero `bx` term. */
function trinoomString(b: number, c: number): string {
  const bTerm =
    b === 0 ? "" : b === 1 ? " + x" : b === -1 ? " - x" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b)}x`;
  const cTerm = ` ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
  return `x^2${bTerm}${cTerm}`;
}

function buildGeneraator(
  seed: number,
  drawRoots: (rng: Rng) => [number, number],
): Generaator["genereeri"] {
  return (rng) => {
    const { r1, r2, b, c, oige, eksitajad } = redrawUntilNice((r) => {
      const [r1, r2] = drawRoots(r);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const oige = `${factorTerm(r1)}${factorTerm(r2)}`;
      const eksitajad = [
        `${factorTerm(-r1)}${factorTerm(-r2)}`,
        `${factorTerm(r1)}${factorTerm(-r2)}`,
        `${factorTerm(r1 + 1)}${factorTerm(r2)}`,
      ];
      const koik = [oige, ...eksitajad];
      return new Set(koik).size === koik.length
        ? { r1, r2, b, c, oige, eksitajad }
        : null;
    }, rng);

    return {
      seed,
      kysimus: `\\text{Tegurda ruutkolmliige: } ${trinoomString(b, c)}`,
      vastus: { tuup: "valik", oige, eksitajad },
      lahendus: [
        `\\text{Otsime kaks arvu, mille summa on } ${b} \\text{ ja korrutis } ${c}\\text{: need on } ${r1} \\text{ ja } ${r2}\\text{.}`,
        `${trinoomString(b, c)} = ${oige}`,
      ],
    };
  };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: buildGeneraator(1, (rng) => [int(rng, 1, 6), int(rng, 1, 6)]),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: buildGeneraator(2, (rng) => [
      nonZeroInt(rng, -8, 8),
      nonZeroInt(rng, 1, 8),
    ]),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: buildGeneraator(3, (rng) => [
      nonZeroInt(rng, -9, -1),
      nonZeroInt(rng, -9, -1),
    ]),
  },
];
