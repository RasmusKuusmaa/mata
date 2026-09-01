import { makeTeemaFactory } from "./helpers";

/** XIII kursus "Stereomeetria" — docs/ainekava-2025.pdf lk 13. */
const opitulemused = [
  "omab süsteemse ettekujutuse hulktahukate ja pöördkehade liikidest, tuletab nende pindala ja ruumala arvutamise valemeid",
  "kujutab joonisel prismat, püramiidi, silindrit, koonust ja kera ning nende lihtsamaid lõikeid tasandiga",
  "arvutab kehade pindala ja ruumala ning nende kehade ja tasandi lõike pindala",
  "tunneb ära ainealased ja reaalelulised probleemid, mis on mudeldatavad ruumigeomeetrias õpitud kujunditega ja nende omadustega. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("13", opitulemused);

export const teemad = [
  teema(
    "13-prisma",
    "Prisma pindala ja ruumala",
    "Prisma pind- ja ruumalavalemid.",
  ),
  teema(
    "13-puramiid",
    "Püramiid pindala ja ruumala",
    "Püramiidi pind- ja ruumalavalemid.",
  ),
  teema(
    "13-korrapaarased-hulktahukad",
    "Korrapärased hulktahukad",
    "Viie korrapärase hulktahuka omadused.",
  ),
  teema("13-silinder", "Silinder", "Silindri pind- ja ruumalavalemid."),
  teema("13-koonus", "Koonus", "Koonuse pind- ja ruumalavalemid."),
  teema("13-kera", "Kera", "Kera pind- ja ruumalavalem."),
  teema(
    "13-kera-segment-kiht-voo-sektor",
    "Kera segment, kiht, vöö ja sektor",
    "Kera osade pindala ja ruumala.",
  ),
  teema(
    "13-silindri-ruumala-tuletamine",
    "Silindri ruumala valemi tuletamine",
    "Ruumala valemi tuletuskäik.",
  ),
  teema(
    "13-koonuse-ruumala-tuletamine",
    "Koonuse ruumala valemi tuletamine",
    "Ruumala valemi tuletuskäik.",
  ),
  teema(
    "13-kera-ruumala-tuletamine",
    "Kera ruumala valemi tuletamine",
    "Ruumala valemi tuletuskäik.",
  ),
  teema(
    "13-hulktahukate-loiked",
    "Hulktahukate lõiked tasandiga",
    "Hulktahuka ja tasandi lõikekujundi leidmine.",
  ),
  teema(
    "13-poordkehade-loiked",
    "Pöördkehade lõiked tasandiga",
    "Pöördkeha ja tasandi lõikekujundi leidmine.",
  ),
  teema(
    "13-stereomeetria-rakendusulesanded",
    "Stereomeetria rakendusülesanded",
    "Reaalelulised probleemid, mis lahenevad stereomeetria abil.",
  ),
];
