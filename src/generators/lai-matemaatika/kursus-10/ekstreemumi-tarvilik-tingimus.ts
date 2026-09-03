import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { ArvVaartus, Generaator } from "@/generators/types";

const TEEMA_ID = "10-ekstreemumi-tarvilik-tingimus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const h = int(rng, -6, 6);
      const b = -2 * a * h;
      const c = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia ekstreemumi tarviliku tingimuse } f'(x)=0 \\text{ abil ekstreemumikandidaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `f'(x) = ${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0 \\quad \\Rightarrow \\quad x = ${h}`,
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
      const vaartused: ArvVaartus[] = [arvVaartus(-k), arvVaartus(k)];

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 - ${3 * k * k}x\\text{. Leia ekstreemumikandidaadid (tuletise nullkohad).}`,
        vastus: { tuup: "hulk", vaartused },
        lahendus: [
          `f'(x) = 3x^2 - ${3 * k * k} = 3(x-${k})(x+${k}) = 0 \\quad \\Rightarrow \\quad x=${k} \\text{ või } x=-${k}`,
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
      const b = -3 * a * k * k;
      const product = -k * k;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Ekstreemumikandidaadid on tuletise } f'(x)=${3 * a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ nullkohad. Leia nende kandidaatide korrutis.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: product },
        lahendus: [
          `${3 * a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0 \\quad \\Rightarrow \\quad x^2 = ${k * k} \\quad \\Rightarrow \\quad x = \\pm${k}`,
          `\\text{Korrutis: } ${k} \\cdot (-${k}) = ${product}`,
        ],
      };
    },
  },
];
