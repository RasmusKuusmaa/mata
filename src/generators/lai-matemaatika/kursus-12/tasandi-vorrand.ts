import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-tasandi-vorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const A = nonZeroInt(rng, -6, 6);
      const B = nonZeroInt(rng, -6, 6);
      const C = nonZeroInt(rng, -6, 6);
      const x0 = int(rng, -5, 5);
      const y0 = int(rng, -5, 5);
      const z0 = int(rng, -5, 5);
      const D = -(A * x0 + B * y0 + C * z0);

      return {
        seed: 1,
        kysimus: `\\text{Tasand normaalvektoriga } \\vec{n}=(${A}, ${B}, ${C}) \\text{ läbib punkti } (${x0}, ${y0}, ${z0})\\text{. Leia tasandi üldvõrrandi vabaliige } D \\text{ (kujul } Ax+By+Cz+D=0\\text{).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: D },
        lahendus: [
          `D = -(${A}\\cdot${x0}+${B}\\cdot${y0}+${C}\\cdot${z0}) = ${D}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const A = nonZeroInt(rng, -6, 6);
      const B = nonZeroInt(rng, -6, 6);
      const C = nonZeroInt(rng, -6, 6);
      const x0 = int(rng, -5, 5);
      const y0 = int(rng, -5, 5);
      const z0 = int(rng, -5, 5);
      const D = -(A * x0 + B * y0 + C * z0);
      const onTasandil = pick(rng, [true, false] as const);
      const px = onTasandil ? x0 : x0 + 1;
      const value = A * px + B * y0 + C * z0 + D;
      const tegelik = value === 0;

      return {
        seed: 2,
        kysimus: `\\text{Tasandi võrrand on } ${A}x${B >= 0 ? "+" : "-"}${Math.abs(B)}y${C >= 0 ? "+" : "-"}${Math.abs(C)}z${D >= 0 ? "+" : "-"}${Math.abs(D)}=0\\text{. Kas punkt } (${px}, ${y0}, ${z0}) \\text{ asub sellel tasandil?}`,
        vastus: { tuup: "valik", oige: tegelik ? "jah" : "ei", eksitajad: [tegelik ? "ei" : "jah"] },
        lahendus: [
          `${A}\\cdot${px}${B >= 0 ? "+" : "-"}${Math.abs(B)}\\cdot${y0}${C >= 0 ? "+" : "-"}${Math.abs(C)}\\cdot${z0}${D >= 0 ? "+" : "-"}${Math.abs(D)} = ${value}${tegelik ? "\\text{ — punkt asub tasandil.}" : "\\ne 0\\text{ — punkt ei asu tasandil.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x1 = int(rng, -5, 5);
      const y1 = int(rng, -5, 5);
      const z1 = int(rng, -5, 5);
      const A = nonZeroInt(rng, -5, 5);
      const B = nonZeroInt(rng, -5, 5);
      const C = nonZeroInt(rng, -5, 5);
      const D = -(A * x1 + B * y1 + C * z1);
      const scale = int(rng, 2, 3);

      return {
        seed: 3,
        kysimus: `\\text{Tasandi võrrand on } ${A * scale}x+${B * scale}y+${C * scale}z+${D * scale}=0\\text{. Leia tasandi normaalvektori taandatud (ühiste teguriteta) esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: A },
        lahendus: [
          `\\text{Kõik kordajad jaguvad } ${scale}\\text{-ga: } ${A}x+${B}y+${C}z+${D}=0\\text{, seega normaalvektor on } (${A}, ${B}, ${C})\\text{.}`,
        ],
      };
    },
  },
];
