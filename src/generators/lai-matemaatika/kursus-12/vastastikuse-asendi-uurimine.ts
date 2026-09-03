import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-vastastikuse-asendi-uurimine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const A = nonZeroInt(rng, -6, 6);
      const B = nonZeroInt(rng, -6, 6);
      const C = nonZeroInt(rng, -6, 6);
      const D1 = int(rng, -6, 6);
      const k = pick(rng, [2, 3, -2] as const);
      const D2 = int(rng, -6, 6);

      return {
        seed: 1,
        kysimus: `\\text{Tasandid on } ${A}x+${B}y+${C}z+${D1}=0 \\text{ ja } ${k * A}x+${k * B}y+${k * C}z+${D2}=0\\text{. Kas tasandid on paralleelsed?}`,
        vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
        lahendus: [
          `\\text{Normaalvektorid } (${A},${B},${C}) \\text{ ja } (${k * A},${k * B},${k * C}) \\text{ on kollineaarsed (kordaja } ${k}\\text{), seega tasandid on paralleelsed.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const A1 = nonZeroInt(rng, -5, 5);
      const B1 = int(rng, -5, 5);
      const C1 = int(rng, -5, 5);
      const A2 = nonZeroInt(rng, -5, 5);
      const B2 = int(rng, -5, 5);
      const C2 = int(rng, -5, 5);
      const kollineaarsed = A1 * B2 - A2 * B1 === 0 && A1 * C2 - A2 * C1 === 0;

      return {
        seed: 2,
        kysimus: `\\text{Tasandite normaalvektorid on } (${A1}, ${B1}, ${C1}) \\text{ ja } (${A2}, ${B2}, ${C2})\\text{. Kas tasandid lõikuvad (ei ole paralleelsed)?}`,
        vastus: { tuup: "valik", oige: kollineaarsed ? "ei" : "jah", eksitajad: [kollineaarsed ? "jah" : "ei"] },
        lahendus: [
          kollineaarsed
            ? `\\text{Normaalvektorid on kollineaarsed — tasandid on paralleelsed, ei lõiku.}`
            : `\\text{Normaalvektorid ei ole kollineaarsed — tasandid lõikuvad mööda sirget.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const mx = nonZeroInt(rng, -5, 5);
      const my = nonZeroInt(rng, -5, 5);
      const mz = nonZeroInt(rng, -5, 5);
      const A = nonZeroInt(rng, -5, 5);
      const B = nonZeroInt(rng, -5, 5);
      const C = nonZeroInt(rng, -5, 5);
      const risti = A * mx + B * my + C * mz === 0;

      return {
        seed: 3,
        kysimus: `\\text{Sirge sihivektor on } (${mx}, ${my}, ${mz}) \\text{ ja tasandi normaalvektor } (${A}, ${B}, ${C})\\text{. Kas sirge asub tasandiga paralleelselt (või tasandil)?}`,
        vastus: { tuup: "valik", oige: risti ? "jah" : "ei", eksitajad: [risti ? "ei" : "jah"] },
        lahendus: [
          `\\vec{s}\\cdot\\vec{n} = ${A}\\cdot${mx}+${B}\\cdot${my}+${C}\\cdot${mz} = ${A * mx + B * my + C * mz}${risti ? "\\text{ — sirge on tasandiga paralleelne (või tasandil).}" : "\\ne 0\\text{ — sirge lõikab tasandit.}"}`,
        ],
      };
    },
  },
];
