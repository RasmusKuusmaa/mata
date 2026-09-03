import { alus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-ruutmudelid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3] as const);
      const h = int(rng, 2, 10);
      const b = -2 * a * h;

      return {
        seed: 1,
        kysimus: `\\text{Kasumifunktsioon on } K(x)=${a}x^2${b >= 0 ? "+" : "-"}${Math.abs(b)}x \\text{ (eurodes, } x \\text{ — toodetud ühikute arv). Mitme ühiku juures on kasum minimaalne (haripunkti } x\\text{-koordinaat)?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `x = -\\dfrac{b}{2a} = -\\dfrac{${b}}{${2 * a}} = ${h}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = -pick(rng, [1, 2, 3] as const);
      const h = int(rng, 5, 30);
      const k = int(rng, 50, 300);
      const b = -2 * a * h;
      const c = a * h * h + k;

      return {
        seed: 2,
        kysimus: `\\text{Kasumifunktsioon on } K(x)=${a}x^2${b >= 0 ? "+" : "-"}${Math.abs(b)}x${c >= 0 ? "+" : "-"}${Math.abs(c)} \\text{ (eurodes). Leia maksimaalne kasum.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Haripunkti } x\\text{-koordinaat: } x=-\\dfrac{${b}}{${2 * a}}=${h}`,
          `K(${h}) = ${a}\\cdot${alus(h)}^2${b >= 0 ? "+" : "-"}${Math.abs(b)}\\cdot${alus(h)}${c >= 0 ? "+" : "-"}${Math.abs(c)} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // g=10 (lihtsustatud); v0 valitud 5-kordseks, et lennuaeg tuleks täisarv.
      const v0Nice = 5 * int(rng, 2, 6);
      const tNice = (2 * v0Nice) / 10;

      return {
        seed: 3,
        kysimus: `\\text{Keha visatakse üles algkiirusega } ${v0Nice} \\text{ m/s. Kõrguse mudel on } h(t)=${v0Nice}t-5t^2 \\text{ (lihtsustatud, } g=10\\text{). Mitme sekundi pärast keha maandub (} h=0\\text{, } t>0\\text{)?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: tNice },
        lahendus: [
          `${v0Nice}t-5t^2=0 \\quad\\Rightarrow\\quad t(${v0Nice}-5t)=0`,
          `t=0 \\text{ või } t=\\dfrac{${v0Nice}}{5}=${tNice}`,
        ],
      };
    },
  },
];
