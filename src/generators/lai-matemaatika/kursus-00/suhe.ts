import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice, reduceFraction } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-suhe-ja-vordeline-soltuvus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { teguriga, a, b, redN1, redN2, oige, eksitajad } =
        redrawUntilNice((r) => {
          const teguriga = int(r, 2, 6);
          const n1 = int(r, 1, 9);
          const n2 = int(r, 1, 9);
          const a = n1 * teguriga;
          const b = n2 * teguriga;
          const [redN1, redN2] = reduceFraction(n1, n2);
          const oige = `${redN1} : ${redN2}`;
          const eksitajad = [`${a} : ${b}`, `${redN1 + 1} : ${redN2}`, `${redN2} : ${redN1}`];
          const koik = [oige, ...eksitajad];
          return new Set(koik).size === koik.length
            ? { teguriga, n1, n2, a, b, redN1, redN2, oige, eksitajad }
            : null;
        }, rng);

      return {
        seed: 1,
        kysimus: `\\text{Lihtsusta suhe } ${a} : ${b}.`,
        vastus: { tuup: "valik", oige, eksitajad },
        lahendus: [
          `\\text{Jagame mõlemad pooled nende suurima ühisteguriga } ${teguriga}\\text{:}`,
          `${a} : ${b} = ${redN1} : ${redN2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, c, x } = redrawUntilNice((r) => {
        const a = int(r, 2, 10);
        const k = int(r, 2, 8);
        const b = a * k;
        const c = int(r, 2, 12);
        const x = (b * c) / a;
        return Number.isInteger(x) ? { a, b, c, x } : null;
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Otseses võrdelises sõltuvuses vastab arvule } ${a} \\text{ arv } ${b}\\text{. Milline arv vastab arvule } ${c}\\text{?}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Otsese võrdelisuse korral on suhe püsiv: } \\dfrac{${b}}{${a}} = \\dfrac{x}{${c}}\\text{.}`,
          `x = \\dfrac{${b} \\cdot ${c}}{${a}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { toojad1, paevad1, toojad2, paevad2 } = redrawUntilNice((r) => {
        const toojad1 = int(r, 2, 12);
        const paevad1 = int(r, 2, 12);
        const toojad2 = pick(r, [2, 3, 4, 5, 6]);
        const paevad2 = (toojad1 * paevad1) / toojad2;
        return Number.isInteger(paevad2)
          ? { toojad1, paevad1, toojad2, paevad2 }
          : null;
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{${toojad1} töölist teevad töö ära } ${paevad1} \\text{ päevaga. Mitme päevaga teeks sama töö ära } ${toojad2} \\text{ töölist (töötempo on kõigil sama)?}`,
        vastus: { tuup: "arv", ...arvVaartus(paevad2) },
        lahendus: [
          `\\text{Pöördvõrdelisuse korral jääb korrutis püsivaks: } ${toojad1} \\cdot ${paevad1} = ${toojad2} \\cdot x\\text{.}`,
          `x = \\dfrac{${toojad1} \\cdot ${paevad1}}{${toojad2}} = ${paevad2}`,
        ],
      };
    },
  },
];
