import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-graafiku-skitseerimine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioonil } f(x)=x^3-${3 * k * k}x \\text{ on ekstreemumikandidaadid } x=-${k} \\text{ ja } x=${k}\\text{. Milline kirjeldus vastab funktsiooni käitumisele?}`,
        vastus: {
          tuup: "valik",
          oige: "kasvab, siis kahaneb, siis kasvab",
          eksitajad: ["kahaneb, siis kasvab, siis kahaneb", "kasvab kogu aeg", "kahaneb kogu aeg"],
        },
        lahendus: [
          `\\text{Funktsioon kasvab enne } x=-${k}\\text{, kahaneb vahemikus } -${k}<x<${k}\\text{, ja kasvab pärast } x=${k}\\text{.}`,
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

      return {
        seed: 2,
        kysimus: `\\text{Funktsioonil } f(x)=x^3-${3 * k * k}x \\text{ on ekstreemumikandidaadid } x=-${k} \\text{ ja } x=${k}\\text{. Kummal pool on kohalik maksimum?}`,
        vastus: { tuup: "valik", oige: "x = -" + k, eksitajad: ["x = " + k] },
        lahendus: [
          `\\text{Kuna funktsioon kasvab enne } x=-${k} \\text{ ja kahaneb pärast, on seal } \\textbf{maksimum}\\text{. Kohal } x=${k} \\text{ on vastupidi } \\textbf{miinimum}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => {
      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni tuletis on kogu määramispiirkonnas positiivne (ei muuda kunagi märki). Milline väide funktsiooni graafiku kohta kehtib?}`,
        vastus: {
          tuup: "valik",
          oige: "funktsioon on kogu määramispiirkonnas kasvav",
          eksitajad: [
            "funktsioon on kogu määramispiirkonnas kahanev",
            "funktsioonil on ekstreemum",
            "funktsioon on perioodiline",
          ],
        },
        lahendus: [
          `\\text{Kui tuletis on alati positiivne, kasvab funktsioon kogu määramispiirkonnas — ekstreemumit ei saa olla, sest tuletis ei võta kunagi väärtust } 0\\text{.}`,
        ],
      };
    },
  },
];
