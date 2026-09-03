import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-trigonomeetriliste-funktsioonide-tuletised";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [, b, c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=\\sin x \\text{ tuletis on } f'(x)=\\cos x\\text{. Teame, et } \\cos a = \\dfrac{${b}}{${c}}\\text{. Leia } f'(a)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, c) },
        lahendus: [`f'(a) = \\cos a = \\dfrac{${b}}{${c}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, , c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=\\cos x \\text{ tuletis on } f'(x)=-\\sin x\\text{. Teame, et } \\sin a = \\dfrac{${a}}{${c}}\\text{. Leia } f'(a)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [`f'(a) = -\\sin a = -\\dfrac{${a}}{${c}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [smaller, larger] = sides;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x)=\\tg x \\text{ tuletis on } f'(x)=1+\\tg^2 x\\text{. Teame, et } \\tg a = \\dfrac{${larger}}{${smaller}}\\text{. Leia } f'(a)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(smaller * smaller + larger * larger, smaller * smaller) },
        lahendus: [
          `f'(a) = 1 + \\tg^2 a = 1 + \\left(\\dfrac{${larger}}{${smaller}}\\right)^2 = 1 + \\dfrac{${larger * larger}}{${smaller * smaller}} = \\dfrac{${smaller * smaller + larger * larger}}{${smaller * smaller}}`,
        ],
      };
    },
  },
];
