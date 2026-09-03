import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-nurgapoolitaja";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const b = int(rng, 2, 9);
      const c = int(rng, 2, 9);
      const t = int(rng, 2, 6);
      const bd = t * c;
      const dc = t * b;

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurgas } ABC \\text{ on } AB=${c}\\text{, } AC=${b}\\text{. Nurga } A \\text{ poolitaja lõikab külge } BC \\text{ punktis } D\\text{, kusjuures } DC=${dc}\\text{. Leia } BD\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bd },
        lahendus: [
          `\\text{Nurgapoolitaja omadus: } \\dfrac{BD}{DC} = \\dfrac{AB}{AC} = \\dfrac{${c}}{${b}}`,
          `BD = DC \\cdot \\dfrac{${c}}{${b}} = ${dc} \\cdot \\dfrac{${c}}{${b}} = ${bd}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const b = int(rng, 2, 9);
      const c = int(rng, 2, 9);
      const t = int(rng, 2, 6);
      const bd = t * c;
      const dc = t * b;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurgas } ABC \\text{ on } AB=${c}\\text{, } AC=${b}\\text{. Nurga } A \\text{ poolitaja lõikab külge } BC \\text{ punktis } D\\text{, kusjuures } BD=${bd}\\text{. Leia } DC\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dc },
        lahendus: [
          `\\text{Nurgapoolitaja omadus: } \\dfrac{BD}{DC} = \\dfrac{AB}{AC} = \\dfrac{${c}}{${b}}`,
          `DC = BD \\cdot \\dfrac{${b}}{${c}} = ${bd} \\cdot \\dfrac{${b}}{${c}} = ${dc}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const b = int(rng, 2, 9);
      const c = int(rng, 2, 9);
      const t = int(rng, 2, 6);
      const bd = t * c;
      const dc = t * b;
      const bc = bd + dc;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurgas } ABC \\text{ on } AB=${c}\\text{, } AC=${b}\\text{. Nurga } A \\text{ poolitaja lõikab külge } BC \\text{ punktis } D\\text{, kusjuures } BD=${bd}\\text{. Leia külg } BC\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bc },
        lahendus: [
          `\\dfrac{BD}{DC} = \\dfrac{${c}}{${b}} \\quad \\Rightarrow \\quad DC = ${bd} \\cdot \\dfrac{${b}}{${c}} = ${dc}`,
          `BC = BD + DC = ${bd} + ${dc} = ${bc}`,
        ],
      };
    },
  },
];
