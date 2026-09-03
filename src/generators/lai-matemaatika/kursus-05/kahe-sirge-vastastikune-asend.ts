import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-kahe-sirge-vastastikune-asend";

/** `(k1Latex, k2Latex, product)` for pairs with `k1·k2 = -1` exactly. */
const PERP_PAIRS = [
  { k1: "1", k2: "-1" },
  { k1: "2", k2: "-\\dfrac12" },
  { k1: "3", k2: "-\\dfrac13" },
  { k1: "-2", k2: "\\dfrac12" },
  { k1: "\\dfrac23", k2: "-\\dfrac32" },
  { k1: "\\dfrac34", k2: "-\\dfrac43" },
] as const;

/** Draws a nonzero int in `[min, max]` that is not equal to `exclude`. */
function nonZeroIntExcluding(rng: () => number, min: number, max: number, exclude: number): number {
  let value = nonZeroInt(rng, min, max);
  while (value === exclude) value = nonZeroInt(rng, min, max);
  return value;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const isParallel = pick(rng, [true, false]);
      const k1 = nonZeroInt(rng, -6, 6);
      const k2 = isParallel ? k1 : nonZeroIntExcluding(rng, -6, 6, k1);

      return {
        seed: 1,
        kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k2}\\text{. Kas sirged on paralleelsed?}`,
        vastus: { tuup: "valik", oige: isParallel ? "jah" : "ei", eksitajad: [isParallel ? "ei" : "jah"] },
        lahendus: [
          isParallel
            ? `\\text{Tõusud on võrdsed (} k_1=k_2\\text{), seega on sirged paralleelsed.}`
            : `\\text{Tõusud ei ole võrdsed, seega ei ole sirged paralleelsed.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const isPerp = pick(rng, [true, false]);
      if (isPerp) {
        const pair = pick(rng, PERP_PAIRS);
        return {
          seed: 2,
          kysimus: `\\text{Kahe sirge tõusud on } k_1=${pair.k1} \\text{ ja } k_2=${pair.k2}\\text{. Kas sirged on risti?}`,
          vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
          lahendus: [
            `\\text{Tõusude korrutis: } k_1 k_2 = ${pair.k1}\\cdot${pair.k2} = -1\\text{, seega on sirged risti.}`,
          ],
        };
      }

      const k1 = nonZeroInt(rng, -6, 6);
      let k2 = nonZeroInt(rng, -6, 6);
      while (k1 * k2 === -1) k2 = nonZeroInt(rng, -6, 6);

      return {
        seed: 2,
        kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k2}\\text{. Kas sirged on risti?}`,
        vastus: { tuup: "valik", oige: "ei", eksitajad: ["jah"] },
        lahendus: [
          `\\text{Tõusude korrutis: } k_1 k_2 = ${k1}\\cdot${k2} = ${k1 * k2} \\ne -1\\text{, seega ei ole sirged risti.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const liik = pick(rng, ["paralleelsed", "ristuvad", "lõikuvad, kuid mitte risti"] as const);
      const eksitajad = (["paralleelsed", "ristuvad", "lõikuvad, kuid mitte risti"] as const).filter(
        (l) => l !== liik,
      );

      if (liik === "paralleelsed") {
        const k1 = nonZeroInt(rng, -6, 6);
        return {
          seed: 3,
          kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k1}\\text{. Milline on sirgete vastastikune asend?}`,
          vastus: { tuup: "valik", oige: liik, eksitajad },
          lahendus: [`k_1 = k_2 = ${k1}\\text{, seega on sirged } \\textbf{${liik}}\\text{.}`],
        };
      }

      if (liik === "ristuvad") {
        const pair = pick(rng, PERP_PAIRS);
        return {
          seed: 3,
          kysimus: `\\text{Kahe sirge tõusud on } k_1=${pair.k1} \\text{ ja } k_2=${pair.k2}\\text{. Milline on sirgete vastastikune asend?}`,
          vastus: { tuup: "valik", oige: liik, eksitajad },
          lahendus: [`k_1 k_2 = -1\\text{, seega on sirged } \\textbf{${liik}}\\text{.}`],
        };
      }

      const k1 = nonZeroInt(rng, -6, 6);
      let k2 = nonZeroInt(rng, -6, 6);
      while (k2 === k1 || k1 * k2 === -1) k2 = nonZeroInt(rng, -6, 6);

      return {
        seed: 3,
        kysimus: `\\text{Kahe sirge tõusud on } k_1=${k1} \\text{ ja } k_2=${k2}\\text{. Milline on sirgete vastastikune asend?}`,
        vastus: { tuup: "valik", oige: liik, eksitajad },
        lahendus: [
          `k_1 \\ne k_2\\text{ ja } k_1 k_2 \\ne -1\\text{, seega on sirged } \\textbf{${liik}}\\text{.}`,
        ],
      };
    },
  },
];
