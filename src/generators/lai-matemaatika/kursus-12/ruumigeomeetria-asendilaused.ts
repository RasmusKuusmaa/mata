import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-ruumigeomeetria-asendilaused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => ({
      seed: 1,
      kysimus: `\\text{Kaks sirget ruumis ei lõiku, ei ole paralleelsed ega asu samal tasandil. Kuidas selliseid sirgeid nimetatakse?}`,
      vastus: {
        tuup: "valik",
        oige: "kiivad sirged",
        eksitajad: ["paralleelsed sirged", "lõikuvad sirged", "ristsirged"],
      },
      lahendus: [
        `\\text{Selliseid sirgeid nimetatakse } \\textbf{kiivadeks sirgeteks}\\text{ — need ei asu ühelgi ühisel tasandil.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => ({
      seed: 2,
      kysimus: `\\text{Sirge asub täielikult tasandil. Mitu ühist punkti on sirgel ja tasandil?}`,
      vastus: {
        tuup: "valik",
        oige: "lõpmata palju",
        eksitajad: ["0", "1", "2"],
      },
      lahendus: [
        `\\text{Kui sirge asub täielikult tasandil, on ühiseid punkte } \\textbf{lõpmata palju}\\text{ — iga sirge punkt on ühtlasi tasandi punkt.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => ({
      seed: 3,
      kysimus: `\\text{Kaks tasandit ruumis ei ole paralleelsed. Mis kujuga on nende lõikehulk?}`,
      vastus: { tuup: "valik", oige: "sirge", eksitajad: ["punkt", "tasand", "tühihulk"] },
      lahendus: [
        `\\text{Kui kaks tasandit ei ole paralleelsed, lõikuvad nad mööda } \\textbf{sirget}\\text{.}`,
      ],
    }),
  },
];
