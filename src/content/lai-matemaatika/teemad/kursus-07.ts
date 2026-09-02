import { makeTeemaFactory, withSequentialEeldused } from "./helpers";

/** VII kursus "Funktsioonid. Arvjadad" — docs/ainekava-2025.pdf lk 11. */
const opitulemused = [
  "selgitab funktsiooni mõistet ja üldtähist ning funktsiooni uurimisega seonduvaid mõisteid",
  "kirjeldab graafiliselt esitatud funktsiooni omadusi; skitseerib graafikuid ning joonestab neid nii paberil kui ka arvutis",
  "leiab valemiga esitatud funktsiooni määramispiirkonna, nullkohad, positiivsus- ja negatiivsuspiirkonna nii algebraliselt kui ka arvutis; kontrollib, kas funktsioon on paaris või paaritu ja analüüsib arvutipõhiselt nende graafikute sümmeetria omadusi",
  "kirjeldab funktsiooni y = f(x) graafiku seost funktsioonide y = f(x) + a, y = f(x + a), y = f(ax), y = a·f(x) graafikutega, visualiseerib vastavaid seoseid arvutis konkreetsete näidetega",
  "selgitab arvjada, aritmeetilise ja geomeetrilise jada ning hääbuva geomeetrilise jada mõistet",
  "selgitab aritmeetilise ja geomeetrilise jada üldliikme valemeid ning tuletab nende jadade n esimese liikme summa valemid ning hääbuva geomeetrilise jada summa valemi",
  "selgitab jada piirväärtuse olemust ning arvutab piirväärtuse; teab arvude π ja e tähendust",
  "tunneb ära ainealased ja reaalelulised probleemid, mis lahenduvad aritmeetilise ja geomeetrilise jada abil. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab, hindab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("07", opitulemused);

export const teemad = withSequentialEeldused(
  [
  teema(
    "07-funktsiooni-moiste-ja-uldtahis",
    "Funktsiooni mõiste ja üldtähis",
    "Funktsiooni definitsioon ja tähistus y = f(x).",
  ),
  teema(
    "07-funktsiooni-esitusviisid",
    "Funktsiooni esitusviisid",
    "Valem, graafik, tabel ja sõnaline kirjeldus.",
  ),
  teema(
    "07-maaramispiirkond",
    "Määramispiirkond",
    "Argumendi lubatud väärtuste hulk.",
  ),
  teema(
    "07-muutumispiirkond",
    "Muutumispiirkond",
    "Funktsiooni väärtuste hulk.",
  ),
  teema(
    "07-paaris-ja-paaritu-funktsioon",
    "Paaris- ja paaritu funktsioon",
    "Graafiku sümmeetria y-telje ja alguspunkti suhtes.",
  ),
  teema("07-nullkohad", "Nullkohad", "Kohad, kus funktsiooni väärtus on null."),
  teema(
    "07-positiivsus-ja-negatiivsuspiirkond",
    "Positiivsus- ja negatiivsuspiirkond",
    "Piirkonnad, kus funktsiooni väärtus on positiivne või negatiivne.",
  ),
  teema(
    "07-kasvamine-ja-kahanemine",
    "Kasvamine ja kahanemine",
    "Funktsiooni monotoonsuse vahemikud.",
  ),
  teema(
    "07-ekstreemum",
    "Ekstreemum",
    "Funktsiooni kohaliku maksimumi ja miinimumi mõiste.",
  ),
  teema(
    "07-astmefunktsioon",
    "Astmefunktsioon",
    "Kuju y = xⁿ funktsioonid ja nende omadused.",
  ),
  teema(
    "07-pohifunktsioonide-graafikud",
    "Põhifunktsioonide graafikud",
    "Ainekava põhifunktsioonide graafikute tundmine.",
  ),
  teema(
    "07-graafiku-teisendused",
    "Graafiku teisendused f(x)+a, f(x+a), f(ax), a·f(x)",
    "Graafiku nihutamine ja venitamine parameetri põhjal.",
  ),
  teema(
    "07-arvjada-moiste-ja-uldliige",
    "Arvjada mõiste ja üldliige",
    "Jada mõiste ja üldliikme valem.",
  ),
  teema(
    "07-aritmeetiline-jada",
    "Aritmeetiline jada",
    "Konstantse vahega jada ja selle üldliige.",
  ),
  teema(
    "07-aritmeetilise-jada-summa",
    "Aritmeetilise jada summa",
    "Esimese n liikme summa valem.",
  ),
  teema(
    "07-geomeetriline-jada",
    "Geomeetriline jada",
    "Konstantse teguriga jada ja selle üldliige.",
  ),
  teema(
    "07-geomeetrilise-jada-summa",
    "Geomeetrilise jada summa",
    "Esimese n liikme summa valem.",
  ),
  teema(
    "07-arvjada-piirvaartus",
    "Arvjada piirväärtus",
    "Jada piirväärtuse mõiste ja arvutamine.",
  ),
  teema(
    "07-haabuv-geomeetriline-jada",
    "Hääbuv geomeetriline jada",
    "Jada, mille teguri absoluutväärtus on alla ühe, ja selle summa.",
  ),
  teema(
    "07-arv-e-piirvaartusena",
    "Arv e piirväärtusena",
    "Arvu e defineerimine jada piirväärtusena.",
  ),
  teema(
    "07-ringjoone-pikkus-ja-pindala-piirvaartusena",
    "Ringjoone pikkus ja ringi pindala piirväärtusena",
    "Hulknurkade jada piirväärtusena saadud valemid.",
  ),
  teema(
    "07-jadade-rakendusulesanded",
    "Jadade rakendusülesanded",
    "Reaalelulised probleemid, mis lahenduvad jadade abil.",
  ),
  ],
  ["06-keskvaartuse-usaldusvahemik"],
  { 12: ["07-funktsiooni-moiste-ja-uldtahis"] },
);
