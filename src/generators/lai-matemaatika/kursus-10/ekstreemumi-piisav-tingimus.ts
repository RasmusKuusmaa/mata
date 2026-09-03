import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-ekstreemumi-piisav-tingimus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 8);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x) = x^3 - ${3 * k * k}x \\text{ teine tuletis on } f''(x)=6x\\text{. Ekstreemumikandidaat on } x=${k}\\text{. Kas see on miinimum või maksimum?}`,
        vastus: { tuup: "valik", oige: "miinimum", eksitajad: ["maksimum"] },
        lahendus: [
          `f''(${k}) = 6\\cdot${k} = ${6 * k} > 0\\text{, seega on } x=${k} \\text{ kohal } \\textbf{miinimum}\\text{ (piisava tingimuse järgi).}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 8);

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x) = x^3 - ${3 * k * k}x \\text{ tuletis on } f'(x)=3(x-${k})(x+${k})\\text{. Ekstreemumikandidaat on } x=-${k}\\text{. Enne seda kohta on tuletis positiivne, pärast negatiivne. Kas } x=-${k} \\text{ on miinimum või maksimum?}`,
        vastus: { tuup: "valik", oige: "maksimum", eksitajad: ["miinimum"] },
        lahendus: [
          `\\text{Kuna tuletis vahetab märki plussist miinusesse, on } x=-${k} \\text{ kohal } \\textbf{maksimum}\\text{ (piisava tingimuse järgi).}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const k = int(rng, 2, 6);
      const positiivne = a > 0;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x) = ${a}x^3 - ${3 * a * k * k}x \\text{ teine tuletis on } f''(x)=${6 * a}x\\text{. Ekstreemumikandidaat on } x=${k}\\text{. Kas see on miinimum või maksimum?}`,
        vastus: { tuup: "valik", oige: positiivne ? "miinimum" : "maksimum", eksitajad: [positiivne ? "maksimum" : "miinimum"] },
        lahendus: [
          `f''(${k}) = ${6 * a} \\cdot ${k} = ${6 * a * k}\\text{, mis on } \\text{${positiivne ? "positiivne" : "negatiivne"}}\\text{, seega on } x=${k} \\text{ kohal } \\textbf{${positiivne ? "miinimum" : "maksimum"}}\\text{.}`,
        ],
      };
    },
  },
];
