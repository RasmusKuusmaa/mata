import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-silindri-ruumala-tuletamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const h = int(rng, 2, 9);
      const numerator = r * r * h;

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=${r} \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekib silinder. Tuleta ristlõigete meetodil selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `\\text{Iga ristlõige on ringjoon raadiusega } f(x)=${r}\\text{, seega ristlõike pindala } S(x)=\\pi\\cdot ${r}^2 = ${r * r}\\pi\\text{ on konstantne.}`,
          `V = \\displaystyle\\int_0^{${h}} S(x)\\,dx = ${r * r}\\pi\\cdot ${h} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const h = int(rng, 2, 9);
      const numerator = r * r * h;

      return {
        seed: 2,
        kysimus: `\\text{Silindri põhiraadius on } r=${r} \\text{ ja kõrgus } h=${h}\\text{. Kirjuta ristlõike pindala } S(x) \\text{ ja leia integraaliga } \\displaystyle\\int_0^{h} S(x)\\,dx \\text{ silindri ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `S(x) = \\pi r^2 = \\pi\\cdot ${r}^2 = ${r * r}\\pi`,
          `V = \\displaystyle\\int_0^{${h}} ${r * r}\\pi\\,dx = ${r * r}\\pi\\cdot ${h} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 5);
      const h = int(rng, 2, 8);
      const numerator = a * a * h;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x)=${a} \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekib silinder raadiusega } r=${a}\\text{. Tuleta integraaliga selle ruumala (kordajana arvust } \\pi\\text{) ja põhjenda, miks tulemus ühtib valemiga } V=\\pi r^2h\\text{.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `V = \\pi\\displaystyle\\int_0^{${h}} ${a}^2\\,dx = \\pi\\cdot ${a * a}\\cdot ${h} = ${numerator}\\pi`,
          `\\text{See ühtib valemiga } V=\\pi r^2h = \\pi\\cdot ${a}^2\\cdot ${h} = ${numerator}\\pi\\text{, sest ristlõike pindala } \\pi r^2 \\text{ on kogu kõrguse ulatuses muutumatu.}`,
        ],
      };
    },
  },
];
