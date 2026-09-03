import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-suurim-ja-vahim-vaartus-loigul";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const value = 2 * k * k * k;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 - ${3 * k * k}x\\text{. Leia funktsiooni suurim väärtus lõigul } [-${2 * k}, ${2 * k}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Ekstreemumikandidaadid: } x=\\pm${k}\\text{. Kontrollime lõigu otspunkte ja kandidaate:}`,
          `f(-${2 * k})=${-value}\\text{, } f(-${k})=${value}\\text{, } f(${k})=${-value}\\text{, } f(${2 * k})=${value}`,
          `\\text{Suurim väärtus on } ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const value = -2 * k * k * k;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 - ${3 * k * k}x\\text{. Leia funktsiooni vähim väärtus lõigul } [-${2 * k}, ${2 * k}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Ekstreemumikandidaadid: } x=\\pm${k}\\text{. Kontrollime lõigu otspunkte ja kandidaate:}`,
          `f(-${2 * k})=${-value}\\text{, } f(-${k})=${-value}\\text{, } f(${k})=${value}\\text{, } f(${2 * k})=${-value}`,
          `\\text{Vähim väärtus on } ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const fLeft = -2 * k * k * k;
      const fRight = 18 * k * k * k;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 - ${3 * k * k}x\\text{. Leia funktsiooni suurim väärtus lõigul } [${k}, ${3 * k}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: fRight },
        lahendus: [
          `\\text{Tuletis } f'(x)=3(x-${k})(x+${k}) \\ge 0 \\text{ kogu lõigul } [${k}, ${3 * k}]\\text{ (mõlemad tegurid mittenegatiivsed), seega funktsioon on seal kasvav.}`,
          `\\text{Suurim väärtus on lõigu paremas otspunktis: } f(${3 * k}) = ${3 * k}^3 - ${3 * k * k}\\cdot${3 * k} = ${fRight}`,
          `\\text{(Vähim väärtus on vasakus otspunktis: } f(${k})=${fLeft}\\text{.)}`,
        ],
      };
    },
  },
];
