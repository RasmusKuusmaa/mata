import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-koonuse-ruumala-tuletamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, 2, 9);
      const numerator = h * h * h;

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=x \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekib koonus. Tuleta ristlõigete meetodil selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `\\text{Iga ristlõige kohal } x \\text{ on ringjoon raadiusega } f(x)=x\\text{, seega } S(x)=\\pi x^2\\text{.}`,
          `V = \\displaystyle\\int_0^{${h}} \\pi x^2\\,dx = \\pi\\cdot\\dfrac{${h}^3}{3} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 5);
      const h = int(rng, 2, 8);
      const numerator = a * a * h * h * h;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=${a}x \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekib koonus. Kirjuta ristlõike pindala } S(x) \\text{ ja tuleta integraaliga selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `S(x) = \\pi(${a}x)^2 = ${a * a}\\pi x^2`,
          `V = \\displaystyle\\int_0^{${h}} ${a * a}\\pi x^2\\,dx = ${a * a}\\pi\\cdot\\dfrac{${h}^3}{3} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 6);
      const h = int(rng, 2, 6);
      const numerator = r * r * h;

      return {
        seed: 3,
        kysimus: `\\text{Koonuse põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Kirjuta sirge võrrand } f(x)=\\dfrac{r}{h}x \\text{, mille pöörlemisel tekib see koonus, ja tuleta integraaliga koonuse ruumala (kordajana arvust } \\pi\\text{), põhjendades tulemuse ühtimist valemiga } V=\\dfrac{1}{3}\\pi r^2h\\text{.}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `f(x) = \\dfrac{${r}}{${h}}x`,
          `V = \\pi\\displaystyle\\int_0^{${h}} \\left(\\dfrac{${r}}{${h}}x\\right)^2 dx = \\pi\\cdot\\dfrac{${r}^2}{${h}^2}\\cdot\\dfrac{${h}^3}{3} = \\dfrac{\\pi ${r}^2 ${h}}{3} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
];
