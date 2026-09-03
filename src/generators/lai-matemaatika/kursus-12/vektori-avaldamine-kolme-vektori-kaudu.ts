import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-vektori-avaldamine-kolme-vektori-kaudu";

/** Baasvektoriteks standardbaas (1,0,0), (0,1,0), (0,0,1) — need ei ole
 * komplanaarsed ja teevad kordajate avaldamise otsekoheseks. */
export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = int(rng, -9, 9);
      const y = int(rng, -9, 9);
      const z = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Vektorid } \\vec{a}=(1,0,0)\\text{, } \\vec{b}=(0,1,0)\\text{, } \\vec{c}=(0,0,1) \\text{ ei ole komplanaarsed. Vektor } \\vec{v}=(${x}, ${y}, ${z})\\text{. Leia kordaja } \\vec{b} \\text{ ees avaldises } \\vec{v}=x\\vec{a}+y\\vec{b}+z\\vec{c}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y },
        lahendus: [
          `\\vec{v} = ${x}\\vec{a}+${y}\\vec{b}+${z}\\vec{c}\\text{, seega } \\vec{b}\\text{ kordaja on } ${y}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const kx = int(rng, -6, 6);
      const ky = int(rng, -6, 6);
      const kz = int(rng, -6, 6);
      const m = nonZeroInt(rng, -3, 3);

      return {
        seed: 2,
        kysimus: `\\text{Baasvektorid on } \\vec{a}=(1,0,0)\\text{, } \\vec{b}=(0,1,0)\\text{, } \\vec{c}=(0,0,1)\\text{. Vektor } \\vec{v}=${kx}\\vec{a}+${ky}\\vec{b}+${kz}\\vec{c}\\text{. Leia } m\\vec{v} \\text{ kolmas koordinaat, kui } m=${m}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m * kz },
        lahendus: [
          `\\vec{v}=(${kx}, ${ky}, ${kz})\\text{, seega } m\\vec{v}=(${m}\\cdot${kx}, ${m}\\cdot${ky}, ${m}\\cdot${kz})\\text{, kolmas koordinaat } ${m * kz}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ax = int(rng, -5, 5);
      const bx = int(rng, -5, 5);
      const cx = int(rng, -5, 5);
      const vx = ax + 2 * bx - cx;

      return {
        seed: 3,
        kysimus: `\\text{Vektorite } \\vec{a}\\text{, } \\vec{b}\\text{, } \\vec{c} \\text{ esimesed koordinaadid on vastavalt } ${ax}\\text{, } ${bx} \\text{ ja } ${cx}\\text{. Vektor } \\vec{v}=\\vec{a}+2\\vec{b}-\\vec{c}\\text{. Leia } \\vec{v} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: vx },
        lahendus: [
          `v_x = ${ax}+2\\cdot${bx}-(${cx}) = ${vx}`,
        ],
      };
    },
  },
];
