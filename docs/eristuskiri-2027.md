# Matemaatika riigieksami eristuskiri 2027

Allikas: Harno, "Kitsa ja laia matemaatikakursuse riigieksami eristuskiri", kinnitatud
31.08.2026 peadirektori käskkirjaga „2026/2027. õppeaasta riigieksamite eristuskirjade
kinnitamine". Laaditud alla: `docs/eristuskiri-2027.pdf` (allalaadimislink:
https://projektid.edu.ee/display/THO/Riigieksamite+materjalid+2027, Lisa 4).

This platform targets **lai matemaatika** only (see `docs/eristuskiri-2027.pdf`
Lisa 1 for the formula sheet, mirrored conceptually as KaTeX in Ship 0.7 with
Estonian macros `\tg`, `\ctg`, `\arctg`).

## Eksami vorm ja struktuur

- Kaheosaline kirjalik eksam, üks eksamipäev.
- **Eksami I osa:** 120 minutit, 4 ülesannet à 5 punkti + 3 ülesannet à 10 punkti
  (kokku 50 punkti).
- **45-minutiline vaheaeg** kahe osa vahel.
- **Eksami II osa:** 150 minutit, 5 ülesannet à 10 punkti (kokku 50 punkti).
- Kokku 100 punkti, eksam algab kell 10.00.
- Eksam loetakse sooritatuks alates 1% maksimaalsest tulemusest.
- Eksamitöö koostatakse ühes variandis, eraldi vihikutena kummagi osa jaoks,
  vaba ruumiga lahenduste jaoks.

## Mõtlemistasandite punktijaotus

- **I mõtlemistasand** (faktid, protseduurid, mõisted — meenutamine, äratundmine,
  info leidmine, arvutamine, mõõtmine, klassifitseerimine): **~20%**
- **II mõtlemistasand** (teadmiste rakendamine — meetodite valimine, info esitamine
  eri viisidel, modelleerimine, rutiinsete ülesannete lahendamine): **~30%**
- **III mõtlemistasand** (arutlemine — põhjendamine, analüüs, süntees, üldistamine,
  tulemuste hindamine, mitterutiinsed ja reaalsusest lähtuvad ülesanded): **~50%**

This maps directly onto `Raskus` (`kerge` / `keskmine` / `raske`) weighting for
generated practice sets and mock exams (Ship 5.2).

## Lubatud abivahendid

- Isiklikud kirjutus- ja joonestusvahendid.
- Taskuarvuti (kalkulaator), mis **ei tohi**:
  - olla programmeeritav,
  - joonestada graafikuid,
  - ühenduda internetti,
  - salvestada või vahetada infot mistahes kujul
    (v.a arvutamise vahetulemuse salvestamine kalkulaatori mällu).
- Ainekava põhjal koostatud valemileht (vt `docs/eristuskiri-2027.pdf` Lisa 1,
  laia matemaatika valemileht), lisatakse eksamitööle.
- **Keelatud:** õpikud, käsiraamatud ja muud matemaatilise sisuga materjalid,
  mobiiltelefonid, nutikellad, kaamerad, muud tehnilised vahendid.

This is the source for `/valemileht` (Ship 5.1) content and for stating the
calculator/timing rules in the `/eksam` UI (Ship 5.2).

## Hindamine

- 100 hindepunkti süsteem, kodeeritud tööd.
- Must või sinine tindi-/pastapliiats nõutav; pliiatsiga kirjutatu hinnatakse 0
  punktiga.
- Eksam loetakse sooritatuks alates 1%-st.

## Eksami sihtrühm ja keel

- Kõigile gümnasistidele kohustuslik. Eksternidele ja kutseõppeasutuste
  lõpetajatele samuti võimaldatud vastavalt tingimustele.
- Eksam valmistatakse ette eesti ja vene keeles.

## Teemad, mida eksamil ei käsitleta (eksami kate)

**Ei leitud eraldi loendit.** Käesolev eristuskiri (Lisa 4, 2026/2027. õa) ei
sisalda struktureeritud loetelu teemadest, mida 2027. aasta laia matemaatika
riigieksamil ei käsitleta — dokument kirjeldab ainult eksami vormi, ülesehitust,
mõtlemistasandite jaotust, korraldust ja hindamist. Selline välistusloend on
mõnel varasemal aastal avaldatud eraldi õpetajatele suunatud materjalina, mitte
ametlikus eristuskirjas.

**TODO:** kontrollida Harno kodulehte (https://harno.ee/riigieksamid) ja
`projektid.edu.ee` 2027. aasta materjalide lehte perioodiliselt — kui välistusloend
avaldatakse hiljem eraldi dokumendina, laadida see alla ja uuendada
`eksamiKate[2027]` iga teema kohta (vt Ship 0.17). Kuni selle avaldamiseni
märgitakse **kõik** teemad eksamikõlblikuks: `eksamiKate: { 2027: true }` iga
Ship 0.10–0.16 loodud teema kohta.

**Kontrollitud 2026-09-02:** `harno.ee/riigieksamid` viitab veel 2026. aasta
materjalidele; `projektid.edu.ee`'s THO-ruumi 2027. aasta lehel on ainsa
matemaatika dokumendina üleval sama eristuskiri (Lisa 4), eraldi välistusloendit
ei leidu. Ship 0.17 rakendub praeguse vaikeväärtusega — kõik teemad jäävad
eksamikõlblikuks —, kuni loend avaldatakse.
