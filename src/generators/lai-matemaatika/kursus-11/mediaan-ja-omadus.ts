import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-mediaan-ja-omadus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = 3 * int(rng, 1, 12);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga mediaan on } ${m}\\text{. Leia kaugus tipust raskuskeskmeni.}`,
        vastus: { tuup: "arv", ...arvVaartus(2 * m, 3) },
        lahendus: [
          `\\text{Raskuskese jagab mediaani suhtes } 2{:}1\\text{ tipust arvates:}`,
          `\\dfrac{2}{3} \\cdot ${m} = \\dfrac{${2 * m}}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = 3 * int(rng, 1, 12);

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga mediaan on } ${m}\\text{. Leia kaugus raskuskeskmest külje keskpunktini.}`,
        vastus: { tuup: "arv", ...arvVaartus(m, 3) },
        lahendus: [
          `\\text{Raskuskese jagab mediaani suhtes } 2{:}1\\text{, lühem osa on keskpunkti pool:}`,
          `\\dfrac{1}{3} \\cdot ${m} = \\dfrac{${m}}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const t = int(rng, 1, 12);
      const seg = 2 * t;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga tipust raskuskeskmeni on } ${seg}\\text{. Leia mediaani pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 3 * t },
        lahendus: [
          `\\text{Tipu-raskuskese lõik on } \\dfrac23 \\text{ mediaanist:}`,
          `m = \\dfrac{3}{2} \\cdot ${seg} = ${3 * t}`,
        ],
      };
    },
  },
];
