import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 14 (Matemaatika rakendused, reaalsete protsesside
 * uurimine). One entry per topic. Re-exported from `selgitused/index.ts`.
 *
 * Every `<Math>{"..."}</Math>`/`<MathBlock>{"..."}</MathBlock>` string here
 * is MDX source, evaluated via `evaluateSync` (see `Selgitus.tsx`) — the
 * `{"..."}` is itself parsed a SECOND time as a JS string literal by that
 * step, so a LaTeX command needs **four** backslashes in this file's own
 * template literal (`\\\\vec`), not two (`\\vec`) — two only survives as a
 * literal single backslash in the MDX source text, and MDX's JS-string
 * parsing of THAT then either silently drops it (for a non-special escape
 * letter like `\\p`, `\\c`, `\\s` — e.g. `\\pi` renders as the plain letters
 * "pi", not π) or converts it to a control character and throws (for a
 * special one — `\\v`, `\\t`, `\\n`, `\\r`, `\\b`, `\\f` — e.g. `\\vec`
 * throws a KaTeX parse error over an invisible vertical-tab character).
 * Confirmed directly against `@mdx-js/mdx`'s `evaluateSync`, not just
 * reasoned about — see this course's own commit and `QUESTIONS.md`'s
 * 2026-09-04 entry for the story. Every other `selgitused/kursus-NN.ts`
 * file already shipped uses the two-backslash (broken) form; this is a
 * live, site-wide rendering defect worth a dedicated fix pass, out of
 * scope for course 14 itself.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "14-matemaatilise-mudeli-moiste": {
    definitsioon: `
**Matemaatiline mudel** on reaalse nähtuse kirjeldus matemaatiliste
objektide (valemite, võrrandite, funktsioonide) abil. Mudel lihtsustab
tegelikkust, jättes kõrvale ebaolulise, et keskenduda uuritava protsessi
jaoks olulistele seostele.
`,
    naide: `
Vaba langemise kõrgus ajahetkel <Math>{"t"}</Math> — mudel
<MathBlock>{"h(t) = h_0 - \\\\dfrac12 gt^2"}</MathBlock>
kirjeldab tegelikku langemist, jättes kõrvale õhutakistuse.
`,
  },
  "14-modelleerimise-etapid": {
    definitsioon: `
**Modelleerimise etapid**: (1) reaalse probleemi püstitus, (2) oluliste
suuruste ja seoste väljaselgitamine, (3) matemaatilise mudeli koostamine,
(4) mudeli lahendamine, (5) tulemuse tõlgendamine reaalses kontekstis,
(6) mudeli headuse hindamine ja vajadusel täpsustamine.
`,
    naide: `
Kaupluse kasumi modelleerimisel: kõigepealt sõnastatakse "kui palju
kaupa müüa, et kasum oleks maksimaalne", seejärel koostatakse kasumi
funktsioon hinna ja koguse kaudu, leitakse funktsiooni maksimum ja
tõlgendatakse tulemust reaalse hinna ja kogusena.
`,
  },
  "14-mudeli-headuse-hindamine": {
    definitsioon: `
**Mudeli headust** hinnatakse selle järgi, kui hästi ta kirjeldab
tegelikke andmeid (ennustuse ja tegelikkuse erinevus) ning kui hästi ta
töötab ka väljaspool andmeid, mille põhjal ta koostati. Liiga lihtne mudel
jätab olulise kõrvale; liiga keeruline mudel sobitub ainult olemasolevate
andmetega ega ennusta hästi uusi.
`,
    naide: `
Kui lineaarne mudel ennustab järgmise aasta müügiks negatiivse arvu, on
mudel selgelt ebasobiv selles piirkonnas — reaalsuses ei saa müük olla
negatiivne.
`,
  },
  "14-tekstulesanded-vorrandite-abil": {
    definitsioon: `
Tekstülesande lahendamine võrrandi abil: (1) tähistatakse tundmatu suurus
muutujaga, (2) sõnastatakse ülesande tingimuste põhjal võrrand, (3)
lahendatakse võrrand, (4) kontrollitakse lahendi sobivust ülesande
mõttega (nt kas tulemus on positiivne, kui otsitakse pikkust).
`,
    naide: `
Kahe arvu summa on 24 ja üks on teisest 6 võrra suurem. Kui väiksem arv on
<Math>{"x"}</Math>, siis <Math>{"x+(x+6)=24"}</Math>, ehk
<Math>{"2x=18"}</Math>, seega <Math>{"x=9"}</Math>.
`,
  },
  "14-protsentulesanded-mudelina": {
    definitsioon: `
**Protsentülesanded mudelina**: liitprotsendilise kasvu/kahanemise mudel
<MathBlock>{"K_n = K_0\\\\left(1+\\\\dfrac{p}{100}\\\\right)^n"}</MathBlock>
kirjeldab nii rahalist kasvu (hoius, laen) kui ka teisi liitkasvu
protsesse (rahvaarv, hinnatõus).
`,
    naide: `
Hoius 1000 eurot kasvab intressimääraga 5% aastas. Kolme aasta pärast on
<Math>{"K_3 = 1000\\\\cdot1{,}05^3 \\\\approx 1157{,}6"}</Math> eurot.
`,
  },
  "14-lineaarmudelid": {
    definitsioon: `
**Lineaarne mudel** kirjeldab protsesse, kus suurus muutub iga sammuga
sama palju (ühtlane kasvu- või kahanemiskiirus):
<MathBlock>{"y = kx+b"}</MathBlock>
kus <Math>{"k"}</Math> on muutumiskiirus ja <Math>{"b"}</Math>
algväärtus.
`,
    naide: `
Takso baashind on 3 eurot ja iga kilomeeter maksab 0,8 eurot:
<Math>{"y=0{,}8x+3"}</Math>. 10 km sõidu hind on
<Math>{"y=0{,}8\\\\cdot10+3=11"}</Math> eurot.
`,
  },
  "14-ruutmudelid": {
    definitsioon: `
**Ruutmudel** sobib protsessidele, kus tulemus sõltub muutujast
ruutfunktsioonina, nt kasumi sõltuvus hinnast või kauguse sõltuvus ajast
ühtlase kiirenduse korral:
<MathBlock>{"y = ax^2+bx+c"}</MathBlock>
Mudeli maksimum või miinimum leitakse haripunktist
<Math>{"x=-\\\\dfrac{b}{2a}"}</Math>.
`,
    naide: `
Kasumifunktsioon <Math>{"K(x)=-2x^2+40x"}</Math> (x — toodetud ühikute
arv). Maksimumi kohal <Math>{"x=-\\\\dfrac{40}{2\\\\cdot(-2)}=10"}</Math>,
maksimaalne kasum <Math>{"K(10)=200"}</Math>.
`,
  },
  "14-eksponentmudelid": {
    definitsioon: `
**Eksponentmudel** kirjeldab protsesse, kus muutumiskiirus on võrdeline
hetkeväärtusega (liitkasv, radioaktiivne lagunemine):
<MathBlock>{"y = y_0\\\\cdot a^x"}</MathBlock>
kus <Math>{"a>1"}</Math> annab kasvu ja <Math>{"0<a<1"}</Math>
kahanemise.
`,
    naide: `
Bakterite arv kahekordistub iga tunniga, alguses 100 rakku:
<Math>{"y=100\\\\cdot2^t"}</Math>. 3 tunni pärast
<Math>{"y=100\\\\cdot2^3=800"}</Math>.
`,
  },
  "14-rakendused-loodusteaduses": {
    definitsioon: `
Matemaatilisi mudeleid kasutatakse loodusteaduslike protsesside
kirjeldamiseks: eksponentmudel radioaktiivsel lagunemisel ja populatsiooni
kasvul, ruutmudel vaba langemisel, trigonomeetrilised mudelid
perioodilistel nähtustel (loodete, hooajaliste temperatuuride muutumine).
`,
    naide: `
Radioaktiivse aine kogus poolestusajaga <Math>{"T"}</Math>:
<Math>{"m(t)=m_0\\\\cdot\\\\left(\\\\dfrac12\\\\right)^{t/T}"}</Math>.
`,
  },
  "14-rakendused-majanduses": {
    definitsioon: `
Majanduses kasutatakse lineaarmudeleid kulude ja tulude sõltuvuse
kirjeldamiseks, ruutmudeleid kasumi maksimeerimiseks ning eksponentmudeleid
liitintressi ja majanduskasvu kirjeldamiseks.
`,
    naide: `
Firma kulud on <Math>{"K(x)=500+20x"}</Math> ja tulu
<Math>{"T(x)=50x"}</Math>. Kasumi nullkoht (tasuvuspunkt) on kohal, kus
<Math>{"T(x)=K(x)"}</Math>, ehk <Math>{"x=\\\\dfrac{500}{30}\\\\approx16{,}7"}</Math>.
`,
  },
  "14-rakendused-tehnoloogias": {
    definitsioon: `
Tehnoloogias kasutatakse matemaatilisi mudeleid näiteks signaalitöötluses
(trigonomeetrilised funktsioonid), andmemahu kasvu kirjeldamisel
(eksponentmudel) ja optimeerimisülesannetes (ruutmudelid, tuletis).
`,
    naide: `
Andmemaht kahekordistub iga 2 aastaga: alates
<Math>{"A_0"}</Math>-st on mudel
<Math>{"A(t)=A_0\\\\cdot2^{t/2}"}</Math>.
`,
  },
};
