import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-sundmus-ja-sundmuste-liigid";

const SUNDMUSED = [
  { kirjeldus: "Täringuviskel saadakse arv, mis on suurem kui 0.", liik: "kindel" },
  { kirjeldus: "Mündiviskel tuleb kiri või kull.", liik: "kindel" },
  { kirjeldus: "Täringuviskel saadakse arv 7.", liik: "võimatu" },
  { kirjeldus: "Kotist, kus on ainult punased pallid, tõmmatakse sinine pall.", liik: "võimatu" },
  { kirjeldus: "Täringuviskel saadakse arv 4.", liik: "juhuslik" },
  { kirjeldus: "Täringuviskel saadakse paarisarv.", liik: "juhuslik" },
] as const;

const LIIGID = ["kindel", "võimatu", "juhuslik"] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const valitud = pick(rng, SUNDMUSED.slice(0, 2));

      return {
        seed: 1,
        kysimus: `\\text{Sündmus: ${valitud.kirjeldus} Milline sündmuse liik see on?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ sündmus.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const valitud = pick(rng, SUNDMUSED.slice(2, 4));

      return {
        seed: 2,
        kysimus: `\\text{Sündmus: ${valitud.kirjeldus} Milline sündmuse liik see on?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ sündmus.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const valitud = pick(rng, SUNDMUSED.slice(4));

      return {
        seed: 3,
        kysimus: `\\text{Sündmus: ${valitud.kirjeldus} Milline sündmuse liik see on?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ sündmus.}`],
      };
    },
  },
];
