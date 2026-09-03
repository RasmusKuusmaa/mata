import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-ristseis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const ax = nonZeroInt(rng, -6, 6);
      const ay = nonZeroInt(rng, -6, 6);
      const bx = nonZeroInt(rng, -6, 6);
      const by = nonZeroInt(rng, -6, 6);
      // Vali bz nii, et ax*bx + ay*by + az*bz = 0, kus az = 1 (kui bz ei ole 0).
      const az = 1;
      const partial = ax * bx + ay * by;
      const bz = -partial;

      return {
        seed: 1,
        kysimus: `\\text{Sirgete sihivektorid on } \\vec{a}=(${ax}, ${ay}, ${az}) \\text{ ja } \\vec{b}=(${bx}, ${by}, z)\\text{. Leia } z\\text{, mille korral sirged on ristsirged.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bz },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${ax}\\cdot${bx} + ${ay}\\cdot${by} + ${az}\\cdot z = 0`,
          `${partial} + z = 0 \\quad\\Rightarrow\\quad z = ${bz}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const isPerp = pick(rng, [true, false] as const);
      const ax = nonZeroInt(rng, -6, 6);
      const ay = nonZeroInt(rng, -6, 6);
      // az piiratud väärtusega ±1, et jagatis oleks alati täisarv.
      const az = pick(rng, [1, -1] as const);
      const bx = nonZeroInt(rng, -6, 6);
      const by = nonZeroInt(rng, -6, 6);
      const bz = isPerp ? -(ax * bx + ay * by) * az : nonZeroInt(rng, -6, 6);
      const dot = ax * bx + ay * by + az * bz;
      const tegelikPerp = dot === 0;

      return {
        seed: 2,
        kysimus: `\\text{Sirgete sihivektorid on } \\vec{a}=(${ax}, ${ay}, ${az}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Kas sirged on ristsirged?}`,
        vastus: { tuup: "valik", oige: tegelikPerp ? "jah" : "ei", eksitajad: [tegelikPerp ? "ei" : "jah"] },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${ax}\\cdot${bx}+${ay}\\cdot${by}+${az}\\cdot${bz} = ${dot}${tegelikPerp ? "\\text{ — sirged on ristsirged.}" : "\\ne 0\\text{ — sirged ei ole ristsirged.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ax = nonZeroInt(rng, -5, 5);
      const ay = nonZeroInt(rng, -5, 5);
      const az = nonZeroInt(rng, -5, 5);
      const k = pick(rng, [2, 3, -2] as const);
      // Tasandi normaal on paralleelne sirge sihivektoriga => sirge on tasandiga risti.
      const bx = k * ax;
      const by = k * ay;
      const bz = k * az;

      return {
        seed: 3,
        kysimus: `\\text{Sirge sihivektor on } \\vec{s}=(${ax}, ${ay}, ${az}) \\text{ ja tasandi normaalvektor } \\vec{n}=(${bx}, ${by}, ${bz})\\text{. Kas sirge on tasandiga risti?}`,
        vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
        lahendus: [
          `\\vec{n}=${k}\\vec{s}\\text{ on kollineaarne sihivektoriga, seega sirge on tasandiga risti.}`,
        ],
      };
    },
  },
];
