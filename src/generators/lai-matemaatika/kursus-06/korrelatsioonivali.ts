import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-korrelatsioonivali";

const KIRJELDUSED = [
  {
    kirjeldus: "Hajuvusdiagrammil koonduvad punktid ülalt paremale suunduvale sirgele lähedale (kui üks tunnus kasvab, kasvab ka teine).",
    liik: "positiivne korrelatsioon",
  },
  {
    kirjeldus: "Hajuvusdiagrammil koonduvad punktid alla paremale suunduvale sirgele lähedale (kui üks tunnus kasvab, teine kahaneb).",
    liik: "negatiivne korrelatsioon",
  },
  {
    kirjeldus: "Hajuvusdiagrammil on punktid laiali hajutatud, ilma nähtava suunata.",
    liik: "korrelatsioon puudub",
  },
] as const;

const LIIGID = KIRJELDUSED.map((k) => k.liik);

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => {
      const valitud = KIRJELDUSED[0];

      return {
        seed: 1,
        kysimus: `\\text{${valitud.kirjeldus} Millist tüüpi seost see kirjeldab?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See kirjeldab } \\textbf{${valitud.liik}}\\text{it.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      const valitud = KIRJELDUSED[1];

      return {
        seed: 2,
        kysimus: `\\text{${valitud.kirjeldus} Millist tüüpi seost see kirjeldab?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See kirjeldab } \\textbf{${valitud.liik}}\\text{it.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => {
      const valitud = KIRJELDUSED[2];

      return {
        seed: 3,
        kysimus: `\\text{${valitud.kirjeldus} Millist tüüpi seost see kirjeldab?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: LIIGID.filter((l) => l !== valitud.liik) },
        lahendus: [`\\text{See kirjeldab olukorda, kus } \\textbf{${valitud.liik}}\\text{.}`],
      };
    },
  },
];
