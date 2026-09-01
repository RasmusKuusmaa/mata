import { makeTeemaFactory } from "./helpers";

/** XI kursus "Integraal. Planimeetria" — docs/ainekava-2025.pdf lk 12. */
const opitulemused = [
  "selgitab algfunktsiooni mõistet ning leiab lihtsamate funktsioonide määramata integraale põhiintegraalide tabeli ja integraali omaduste järgi",
  "selgitab kõvertrapetsi mõistet ning rakendab määratud integraali leides Newtoni-Leibnizi valemit",
  "arvutab määratud integraali abil kõvertrapetsi pindala, mitmest osast koosneva pinnatüki ja kahe kõveraga piiratud pinnatüki pindala ning lihtsama pöördkeha ruumala",
  "selgitab geomeetriliste kujundite ja nende elementide omadusi, kujutab vastavaid kujundeid joonisel; uurib IKT vahendite abil geomeetriliste kujundite omadusi ning kujutab vastavaid kujundeid joonisel",
  "lahendab planimeetria arvutusülesandeid ja lihtsamaid tõestusülesandeid",
  "tunneb ära ainealased ja reaalelulised probleemid, mis on lahendatavad tasandigeomeetrias õpitud kujundite omadustega. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("11", opitulemused);

export const teemad = [
  teema(
    "11-algfunktsioon",
    "Algfunktsioon",
    "Algfunktsiooni mõiste kui tuletamise pöördtehe.",
  ),
  teema(
    "11-maaramata-integraal",
    "Määramata integraal",
    "Algfunktsioonide hulk ja selle tähistus.",
  ),
  teema(
    "11-integraali-omadused",
    "Integraali omadused",
    "Summa, vahe ja konstandiga korrutise integreerimise reeglid.",
  ),
  teema(
    "11-pohiintegraalide-tabel",
    "Põhiintegraalide tabel",
    "Sagedaste funktsioonide algfunktsioonide koondtabel.",
  ),
  teema("11-kovertrapets", "Kõvertrapets", "Kõverjoonelise trapetsi mõiste."),
  teema(
    "11-maaratud-integraal",
    "Määratud integraal",
    "Määratud integraali mõiste ja tähistus.",
  ),
  teema(
    "11-newtoni-leibnizi-valem",
    "Newtoni-Leibnizi valem",
    "Määratud integraali arvutamine algfunktsiooni abil.",
  ),
  teema(
    "11-pindala-maaratud-integraaliga",
    "Pindala määratud integraaliga",
    "Kõvertrapetsi pindala arvutamine.",
  ),
  teema(
    "11-mitmest-osast-koosneva-pinnatuki-pindala",
    "Mitmest osast koosneva pinnatüki pindala",
    "Liitpindalade arvutamine mitme integraali summana.",
  ),
  teema(
    "11-kahe-koveraga-piiratud-pinnatuki-pindala",
    "Kahe kõveraga piiratud pinnatüki pindala",
    "Kahe funktsiooni graafiku vahele jääva pindala arvutamine.",
  ),
  teema(
    "11-poordkeha-ruumala",
    "Pöördkeha ruumala",
    "Pöördkeha ruumala arvutamine integraaliga.",
  ),
  teema(
    "11-too-arvutamine-integraaliga",
    "Töö arvutamine integraaliga",
    "Muutuva jõu töö arvutamine integraali abil.",
  ),
  teema(
    "11-kolmnurga-sise-ja-valisnurk",
    "Kolmnurga sise- ja välisnurk",
    "Sise- ja välisnurga mõiste ning nendevaheline seos.",
  ),
  teema(
    "11-nurgapoolitaja",
    "Kolmnurga nurgapoolitaja ja selle omadus",
    "Nurgapoolitaja mõiste ja omadus külgede suhtes.",
  ),
  teema(
    "11-siseringjoon",
    "Kolmnurga siseringjoon",
    "Kolmnurga siseringjoone mõiste ja konstrueerimine.",
  ),
  teema(
    "11-umberringjoon",
    "Kolmnurga ümberringjoon",
    "Kolmnurga ümberringjoone mõiste ja konstrueerimine.",
  ),
  teema(
    "11-mediaan-ja-omadus",
    "Kolmnurga mediaan ja mediaanide omadus",
    "Mediaani mõiste ja mediaanide lõikepunkti omadus.",
  ),
  teema("11-kesklõik", "Kolmnurga kesklõik", "Kesklõigu mõiste ja omadused."),
  teema(
    "11-meetrilised-seosed-taisnurkses-kolmnurgas",
    "Meetrilised seosed täisnurkses kolmnurgas",
    "Kõrguse ja kaatetite projektsioonide vahelised seosed.",
  ),
  teema(
    "11-hulknurk-ja-liigid",
    "Hulknurk ja selle liigid",
    "Hulknurkade klassifikatsioon.",
  ),
  teema(
    "11-kumera-hulknurga-sisenurkade-summa",
    "Kumera hulknurga sisenurkade summa",
    "Sisenurkade summa valem tippude arvu kaudu.",
  ),
  teema(
    "11-hulknurkade-sarnasus",
    "Hulknurkade sarnasus",
    "Sarnasuse tingimused ja tunnused.",
  ),
  teema(
    "11-sarnaste-hulknurkade-suhted",
    "Sarnaste hulknurkade ümbermõõtude ja pindalade suhe",
    "Sarnasusteguri seos ümbermõõdu ja pindala suhtega.",
  ),
  teema(
    "11-hulknurga-sise-ja-umberringjoon",
    "Hulknurga sise- ja ümberringjoon",
    "Sise- ja ümberringjoone mõiste hulknurga korral.",
  ),
  teema(
    "11-roopkulik-ja-eriliigid",
    "Rööpkülik ja selle eriliigid",
    "Rööpküliku, ristküliku, rombi ja ruudu omadused.",
  ),
  teema(
    "11-trapets-ja-liigid",
    "Trapets ja selle liigid",
    "Trapetsi ja selle eriliikide omadused.",
  ),
  teema(
    "11-trapetsi-kesklois",
    "Trapetsi kesklõik",
    "Kesklõigu mõiste ja pikkuse valem.",
  ),
  teema(
    "11-kesknurk-ja-piirdenurk",
    "Kesknurk ja piirdenurk",
    "Kesknurga ja piirdenurga vaheline seos.",
  ),
  teema(
    "11-thalese-teoreem",
    "Thalese teoreem",
    "Läbimõõdule toetuva piirdenurga omadus.",
  ),
  teema(
    "11-loikaja-ja-puutuja",
    "Ringjoone lõikaja ja puutuja",
    "Lõikaja ja puutuja mõiste ning omadused.",
  ),
  teema(
    "11-koolhulknurk",
    "Kõõlhulknurk",
    "Ringjoonesse joonistatud hulknurga omadused.",
  ),
  teema(
    "11-puutujahulknurk",
    "Puutujahulknurk",
    "Ringjoonele ümber joonistatud hulknurga omadused.",
  ),
  teema(
    "11-kolmnurga-pindala-valemid",
    "Kolmnurga pindala valemid",
    "Erinevad valemid kolmnurga pindala arvutamiseks.",
  ),
  teema(
    "11-rakenduslikud-planimeetriaulesanded",
    "Rakenduslikud planimeetriaülesanded",
    "Reaalelulised probleemid, mis lahenevad planimeetria abil.",
  ),
];
