import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-protsendi-pohiulesanded";

const NICE_PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      // A multiple of 20 keeps a·p/100 an integer for every p above (the
      // largest denominator any of them reduces to is 20) — no raw decimal
      // ever reaches the rendered text.
      const a = 20 * int(rng, 1, 20);
      const p = pick(rng, NICE_PERCENTS);
      const tulemus = (a * p) / 100;

      return {
        seed: 1,
        kysimus: `\\text{Leia arvu } ${a} \\text{ } ${p}\\%.`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Protsendi leidmiseks korrutame arvu protsendimääraga:}`,
          `${a} \\cdot \\dfrac{${p}}{100} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, p, b } = redrawUntilNice((r) => {
        const a = int(r, 4, 60);
        const p = pick(r, NICE_PERCENTS);
        const b = (a * p) / 100;
        return Number.isInteger(b) ? { a, p, b } : null;
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Arvu } x \\text{ } ${p}\\% \\text{ on } ${b}\\text{. Leia arv } x.`,
        vastus: { tuup: "arv", ...arvVaartus(a) },
        lahendus: [
          `\\text{Kui } ${p}\\% \\text{ arvust } x \\text{ on } ${b}\\text{, siis } x = ${b} : \\dfrac{${p}}{100}\\text{:}`,
          `x = \\dfrac{${b} \\cdot 100}{${p}} = ${a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, protsent } = redrawUntilNice((r) => {
        const a = int(r, 4, 50);
        const b = int(r, 1, a);
        const protsent = (100 * b) / a;
        return Number.isInteger(protsent) ? { a, b, protsent } : null;
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{Mitu protsenti moodustab arv } ${b} \\text{ arvust } ${a}\\text{?}`,
        vastus: { tuup: "arv", ...arvVaartus(protsent) },
        lahendus: [
          `\\text{Jagame osa tervikuga ja korrutame sajaga:}`,
          `\\dfrac{${b}}{${a}} \\cdot 100\\% = ${protsent}\\%`,
        ],
      };
    },
  },
];
