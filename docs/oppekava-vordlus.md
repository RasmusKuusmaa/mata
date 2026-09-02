# Ainekava võrdlus — Ship 0.16

Allikas: `docs/ainekava-2025.pdf` — Vabariigi Valitsuse 6. jaanuari 2011. a määrus nr 2
„Gümnaasiumi riiklik õppekava", Lisa 5 „Ainevaldkond Matemaatika", Vabariigi Valitsuse
13.06.2025 määruse nr 44 sõnastuses. Peatükk 2.3 „Lai matemaatika", alapeatükk 2.3.2
„Õpitulemused", kursused I–XIV (lk 9–13).

## Miks pole eraldi 2011. ja 2023. aasta dokumenti

`types.ts` defineerib `allikas: ('rok2011' | 'rok2023')[]` lootuses, et olemas on kaks
eraldiseisvat ainekava-dokumenti võrdlemiseks. Tegelikkuses on Gümnaasiumi riiklik
õppekava üks ja seesama 2011. aasta määrus (nr 2), mida on hiljem korduvalt muudetud —
sh matemaatika ainekava sisulise reformiga, mille tulemus on kehtiv alates 2023. aastast
ja mida `docs/ainekava-2025.pdf` peegeldab 13.06.2025 muutmismääruse sõnastuses. Kahte
paralleelset ainekava ei eksisteeri; on üks pidevalt uuendatav dokument.

`rok2011` tähistab käesolevas koodibaasis reformieelset (enne 2023. aasta muudatust
kehtinud) Lisa 5 sõnastust — vana 14-kursuselist jaotust, mille tekst erineb praegusest
kohati oluliselt (nt tuletise ja integraali käsitluse maht ja järjekord). Seda dokumenti
ei ole alla laaditud, sest see ei kehti enam ja 2027. aasta eksam lähtub praegusest
(reformijärgsest) ainekavast. `rok2011` jääb liidus alles tuleviku jaoks — kui mõni
allikas peaks vajama vana sõnastuse võrdlust —, kuid pole hetkel üheski teemas
kasutuses.

## Mida kontrolliti

Iga kursuse (K01–K14) `opitulemused`-massiiv (`src/content/lai-matemaatika/teemad/
kursus-NN.ts`) võrreldi rida-realt `docs/ainekava-2025.pdf` peatüki 2.3.2 vastava
kursuse õpilase õpitulemuste loeteluga.

| Kursus | Ainekava kursuse nimi (lk-viide) | Õpitulemuste arv | Vastavus |
| --- | --- | --- | --- |
| K01 | Avaldised ja arvuhulgad (lk 9) | 6/6 | Sõna-sõnalt vastab |
| K02 | Võrrandid ja võrrandisüsteemid (lk 9) | 8/8 | Sõna-sõnalt vastab |
| K03 | Võrratused. Trigonomeetria I (lk 9–10) | 7/7 | Sõna-sõnalt vastab |
| K04 | Trigonomeetria II (lk 10) | 9/9 | Sõna-sõnalt vastab |
| K05 | Vektor tasandil. Joone võrrand (lk 10) | 7/7 | Sõna-sõnalt vastab |
| K06 | Tõenäosus, statistika (lk 10–11) | 10/10 | Sõna-sõnalt vastab |
| K07 | Funktsioonid. Arvjadad (lk 11) | 8/8 | Sõna-sõnalt vastab |
| K08 | Eksponent- ja logaritmfunktsioon (lk 11) | 9/9 | Sõna-sõnalt vastab |
| K09 | Trigonomeetrilised funktsioonid. Funktsiooni piirväärtus ja tuletis (lk 11–12) | 6/6 | Sõna-sõnalt vastab |
| K10 | Tuletise rakendused (lk 12) | 6/6 | Sõna-sõnalt vastab |
| K11 | Integraal. Planimeetria (lk 12) | 6/6 | Sõna-sõnalt vastab |
| K12 | Sirge ja tasand ruumis (lk 12) | 6/6 | Sõna-sõnalt vastab |
| K13 | Stereomeetria (lk 13) | 4/4 | Sõna-sõnalt vastab |
| K14 | Matemaatika rakendused, reaalsete protsesside uurimine (lk 13) | 7/7 | Sõna-sõnalt vastab |

Kõik 14 kohustusliku kursuse nimed (`kursused.ts`) vastavad täpselt ainekava
alapeatükis 1.2 toodud loetelule ja alapeatüki 2.3.2 kursuste pealkirjadele.

## Tulemus

Kõik 94 õpitulemust kõigi 14 kursuse kohta on juba `opitulemused`-massiivides sõna-
sõnalt ainekavast üle võetud (vt `helpers.ts` kommentaari kursuse-granulaarsuse kohta)
ja iga teema kannab `allikas: ['rok2023']`. Puudu olevaid õpitulemusi ei leitud —
lisamist ei vaja ükski teema.

Kuna eraldi „rok2011"-dokumenti pole (vt eespool), ei ole ka „ainult 2011-s" sisu, mida
säilitada, ega vaja tekkinud teemasid `allikas: ['rok2011']` (ega mõlema) märkega.
Teemapuu jääb muutumatuks — see on juba liit (praegusel juhul lihtsalt kattuv hulk) selle
ühe kehtiva ainekavaga.

Ei muudetud ühtegi teemat, `eeldused`-seost ega `eksamiKate` väärtust.
