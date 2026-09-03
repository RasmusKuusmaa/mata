import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-lihtsamad-trigonomeetrilised-vorratused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => {
      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus vahemikus } [0, 2\\pi)\\text{: } \\sin x > \\dfrac12\\text{.}`,
        vastus: {
          tuup: "valik",
          oige: "π/6 < x < 5π/6",
          eksitajad: ["0 < x < π/6", "5π/6 < x < 2π", "π/6 < x < π"],
        },
        lahendus: [
          `\\sin x = \\dfrac12 \\text{ kohtadel } x=\\dfrac{\\pi}{6} \\text{ ja } x=\\dfrac{5\\pi}{6}\\text{. Nende vahel on siinus suurem kui } \\dfrac12\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrratus vahemikus } [0, 2\\pi)\\text{: } \\cos x < \\dfrac12\\text{.}`,
        vastus: {
          tuup: "valik",
          oige: "π/3 < x < 5π/3",
          eksitajad: ["0 < x < π/3", "5π/3 < x < 2π", "π/3 < x < π"],
        },
        lahendus: [
          `\\cos x = \\dfrac12 \\text{ kohtadel } x=\\dfrac{\\pi}{3} \\text{ ja } x=\\dfrac{5\\pi}{3}\\text{. Nende vahel on koosinus väiksem kui } \\dfrac12\\text{.}`,
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
        kysimus: `\\text{Lahenda võrratus vahemikus } \\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\text{: } \\tg x > 1\\text{.}`,
        vastus: {
          tuup: "valik",
          oige: "π/4 < x < π/2",
          eksitajad: ["-π/2 < x < π/4", "0 < x < π/4", "π/4 < x < π"],
        },
        lahendus: [
          `\\tg x = 1 \\text{ kohal } x=\\dfrac{\\pi}{4}\\text{. Kuna tangens on antud vahemikus kasvav, on } \\tg x>1 \\text{ vahemikus } \\left(\\dfrac{\\pi}{4}, \\dfrac{\\pi}{2}\\right)\\text{.}`,
        ],
      };
    },
  },
];
