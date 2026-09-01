import { makeTeemaFactory } from "./helpers";

/** IV kursus "Trigonomeetria II" — docs/ainekava-2025.pdf lk 10. */
const opitulemused = [
  "teisendab kraadimõõdus antud nurga radiaanmõõdus olevaks nurgaks ja vastupidi",
  "arvutab ringjoone kaare kui ringjoone osa pikkuse ning ringi sektori kui ringi osa pindala",
  "defineerib mis tahes nurga siinuse, koosinuse ja tangensi; tuletab ning teab siinuse, koosinuse ja tangensi vahelisi seoseid",
  "tuletab nurkade 0°, 30°, 45°, 60°, 90°, 180°, 270°, 360° siinuse, koosinuse ja tangensi täpsed väärtused; rakendab taandamisvalemeid, negatiivse ja täispöördest suurema nurga valemeid",
  "kasutab digivahendeid trigonomeetriliste funktsioonide väärtuste ning nende väärtuste järgi nurga suuruse leidmisel",
  "tuletab kahe nurga summa ja vahe valemid ning kahekordse nurga siinuse, koosinuse ja tangensi valemid",
  "teisendab lihtsamaid trigonomeetrilisi avaldisi valemikogu abil",
  "tõestab siinus- ja koosinusteoreemi, lahendab mistahes kolmnurga ning arvutab selle pindala",
  "tunneb ära ainealased ja reaalelulised probleemid, mis on lahendatavad kolmnurga ja ringi kohta õpitut rakendades. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("04", opitulemused);

export const teemad = [
  teema(
    "04-nurga-moiste-uldistamine",
    "Nurga mõiste üldistamine",
    "Suunatud nurk, täispöördest suurem ja negatiivne nurk.",
  ),
  teema(
    "04-kraadi-ja-radiaanmoot",
    "Kraadi- ja radiaanmõõt",
    "Nurga mõõtmine kraadides ja radiaanides ning nendevaheline teisendus.",
  ),
  teema(
    "04-mis-tahes-nurga-funktsioonid",
    "Mis tahes nurga trigonomeetrilised funktsioonid",
    "Siinuse, koosinuse ja tangensi definitsioon ühikringjoonel.",
  ),
  teema(
    "04-tapsed-vaartused",
    "Täpsed väärtused (0°, 30°, 45°, 60°, 90°, 180°, 270°, 360°)",
    "Sagedaste nurkade trigonomeetriliste funktsioonide täpsed väärtused.",
  ),
  teema(
    "04-sama-nurga-funktsioonide-seosed",
    "Seosed sama nurga funktsioonide vahel",
    "Siinuse, koosinuse ja tangensi vahelised põhiseosed.",
  ),
  teema(
    "04-taandamisvalemid",
    "Taandamisvalemid",
    "Nurga taandamine teravnurgale.",
  ),
  teema(
    "04-negatiivse-ja-taispoordest-suurema-nurga-funktsioonid",
    "Negatiivse ja täispöördest suurema nurga funktsioonid",
    "Perioodilisuse ja paarsuse rakendamine.",
  ),
  teema(
    "04-kahe-nurga-summa-ja-vahe",
    "Kahe nurga summa ja vahe",
    "Siinuse, koosinuse ja tangensi liitmisvalemid.",
  ),
  teema(
    "04-kahekordse-nurga-valemid",
    "Kahekordse nurga valemid",
    "Siinuse, koosinuse ja tangensi valemid nurga 2α jaoks.",
  ),
  teema(
    "04-trigonomeetriliste-avaldiste-teisendamine",
    "Trigonomeetriliste avaldiste teisendamine",
    "Valemikogu rakendamine avaldiste lihtsustamisel.",
  ),
  teema(
    "04-ringjoone-kaare-pikkus",
    "Ringjoone kaare pikkus",
    "Kaare pikkuse arvutamine keskpunktinurga järgi.",
  ),
  teema(
    "04-ringi-sektori-pindala",
    "Ringi sektori pindala",
    "Sektori pindala arvutamine keskpunktinurga järgi.",
  ),
  teema(
    "04-kolmnurga-pindala-valemid",
    "Kolmnurga pindala valemid",
    "Pindala kahe külje ja nurga kaudu.",
  ),
  teema(
    "04-siinusteoreem",
    "Siinusteoreem",
    "Külgede ja vastasnurkade siinuste suhe.",
  ),
  teema(
    "04-koosinusteoreem",
    "Koosinusteoreem",
    "Üldistatud Pythagorase teoreem.",
  ),
  teema(
    "04-kolmnurga-lahendamine",
    "Kolmnurga lahendamine",
    "Suvalise kolmnurga tundmatute külgede ja nurkade leidmine.",
  ),
  teema(
    "04-trigonomeetria-rakendusulesanded",
    "Trigonomeetria rakendusülesanded",
    "Reaalelulised probleemid, mis lahenevad trigonomeetria abil.",
  ),
];
