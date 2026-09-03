import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 6 (Tõenäosus, statistika). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "06-permutatsioonid": {
    definitsioon: `
**Permutatsioon** on kõigi <Math>{"n"}</Math> eseme järjestuste arv:
<MathBlock>{"P_n = n!"}</MathBlock>
`,
    naide: `
<Math>{"4"}</Math> raamatu riiulile asetamise viiside arv:
<Math>{"P_4=4!=24"}</Math>.
`,
  },
  "06-variatsioonid": {
    definitsioon: `
**Variatsioon** on järjestatud valik <Math>{"r"}</Math> eset
<Math>{"n"}</Math> hulgast:
<MathBlock>{"V_n^r = \\\\dfrac{n!}{(n-r)!} = n(n-1)\\\\cdots(n-r+1)"}</MathBlock>
`,
    naide: `
Kolme koha (kuld, hõbe, pronks) jagamine <Math>{"5"}</Math> sportlase vahel:
<Math>{"V_5^3=5\\\\cdot4\\\\cdot3=60"}</Math>.
`,
  },
  "06-kombinatsioonid": {
    definitsioon: `
**Kombinatsioon** on järjestamata valik <Math>{"r"}</Math> eset
<Math>{"n"}</Math> hulgast:
<MathBlock>{"C_n^r = \\\\dfrac{n!}{r!(n-r)!}"}</MathBlock>
`,
    naide: `
<Math>{"3"}</Math>-liikmelise komisjoni valimine <Math>{"5"}</Math> inimese
hulgast: <Math>{"C_5^3=10"}</Math>.
`,
  },
  "06-sundmus-ja-sundmuste-liigid": {
    definitsioon: `
**Kindel sündmus** toimub alati, **võimatu sündmus** ei toimu kunagi,
**juhuslik sündmus** võib toimuda või mitte.
`,
    naide: `
Täringuviskel on "saadi arv 1–6" kindel sündmus, "saadi arv 7" võimatu
sündmus, "saadi arv 4" juhuslik sündmus.
`,
  },
  "06-klassikaline-toenaosus": {
    definitsioon: `
**Klassikaline tõenäosus** on soodsate ja kõigi võrdvõimalike tulemuste
suhe:
<MathBlock>{"P(A) = \\\\dfrac{\\\\text{soodsate tulemuste arv}}{\\\\text{kõigi tulemuste arv}}"}</MathBlock>
`,
    naide: `
Täringuviskel paarisarvu tõenäosus: <Math>{"P=\\\\dfrac{3}{6}=\\\\dfrac12"}</Math>.
`,
  },
  "06-suhteline-sagedus-ja-statistiline-toenaosus": {
    definitsioon: `
**Suhteline sagedus** on sündmuse esinemiste arvu ja katsete koguarvu suhe.
Kui katsete arv on väga suur, läheneb suhteline sagedus **statistilisele
tõenäosusele**.
`,
    naide: `
Münti visati <Math>{"100"}</Math> korda, kiri tuli <Math>{"52"}</Math>
korral: suhteline sagedus <Math>{"\\\\dfrac{52}{100}=0{,}52"}</Math>.
`,
  },
  "06-geomeetriline-toenaosus": {
    definitsioon: `
**Geomeetriline tõenäosus** väljendab tõenäosust pindalade, pikkuste või
ruumalade suhtena, kui klassikaline (loenduslik) tõenäosus ei sobi
(lõpmatu arv võrdvõimalikke tulemusi).
`,
    naide: `
Sihtmärgil raadiusega <Math>{"10"}</Math> on keskel ring raadiusega
<Math>{"2"}</Math>: tõenäosus tabada keskringi on
<Math>{"\\\\dfrac{2^2}{10^2}=\\\\dfrac{1}{25}"}</Math>.
`,
  },
  "06-soltuvad-ja-soltumatud-sundmused": {
    definitsioon: `
Sündmused on **sõltumatud**, kui ühe toimumine ei mõjuta teise tõenäosust:
<MathBlock>{"P(A\\\\cap B) = P(A)\\\\cdot P(B)"}</MathBlock>
Vastasel juhul on nad **sõltuvad** ja kehtib
<Math>{"P(A\\\\cap B)=P(A)\\\\cdot P(B|A)"}</Math>.
`,
    naide: `
Kahe erineva täringu viskamised on sõltumatud sündmused.
`,
  },
  "06-valistavad-ja-mittevalistavad-sundmused": {
    definitsioon: `
Sündmused **välistavad** teineteist, kui neil pole ühisosa (mõlemad ei saa
korraga toimuda). Kui neil on ühisosa, on nad **mittevälistavad**.
`,
    naide: `
"Saadi 2" ja "saadi 5" välistavad teineteist ühel täringuviskel; "saadi
paarisarv" ja "saadi üle 3" ei välista, sest arv 4 ja 6 kuuluvad mõlemasse.
`,
  },
  "06-toenaosuste-liitmine": {
    definitsioon: `
Tõenäosuste liitmise valem:
<MathBlock>{"P(A\\\\cup B) = P(A)+P(B)-P(A\\\\cap B)"}</MathBlock>
Välistavate sündmuste korral on <Math>{"P(A\\\\cap B)=0"}</Math>, seega
lihtsalt <Math>{"P(A\\\\cup B)=P(A)+P(B)"}</Math>.
`,
    naide: `
Kui <Math>{"P(A)=\\\\frac13"}</Math> ja <Math>{"P(B)=\\\\frac14"}</Math>
(välistavad), on <Math>{"P(A\\\\cup B)=\\\\frac{7}{12}"}</Math>.
`,
  },
  "06-toenaosuste-korrutamine": {
    definitsioon: `
Tõenäosuste korrutamise valem sõltumatute sündmuste korral:
<MathBlock>{"P(A\\\\cap B) = P(A)\\\\cdot P(B)"}</MathBlock>
Sõltuvate sündmuste korral kasutatakse tingimuslikku tõenäosust:
<Math>{"P(A\\\\cap B)=P(A)\\\\cdot P(B|A)"}</Math>.
`,
    naide: `
Kahe mündi viske korral mõlema kirja tõenäosus:
<Math>{"\\\\frac12\\\\cdot\\\\frac12=\\\\frac14"}</Math>.
`,
  },
  "06-bernoulli-valem": {
    definitsioon: `
**Bernoulli valem** annab tõenäosuse, et sõltumatute katsete jadas
(igaühel õnnestumise tõenäosus <Math>{"p"}</Math>) õnnestub sündmus täpselt
<Math>{"k"}</Math> korda <Math>{"n"}</Math> katsest:
<MathBlock>{"P(X=k) = C_n^k\\\\, p^k(1-p)^{n-k}"}</MathBlock>
`,
    naide: `
Mündi <Math>{"3"}</Math> viske korral täpselt <Math>{"2"}</Math> kirja
tõenäosus: <Math>{"C_3^2\\\\left(\\\\frac12\\\\right)^3=\\\\frac38"}</Math>.
`,
  },
  "06-diskreetne-ja-pidev-juhuslik-suurus": {
    definitsioon: `
**Diskreetne** juhuslik suurus võtab loenduva arvu väärtusi (nt täringu
silmade arv). **Pidev** juhuslik suurus võib võtta iga väärtuse mingis
vahemikus (nt inimese pikkus).
`,
    naide: `
Perre sündivate laste arv on diskreetne; bussi ooteaeg on pidev.
`,
  },
  "06-binoomjaotus": {
    definitsioon: `
**Binoomjaotusega** juhusliku suuruse (n sõltumatut katset, õnnestumise
tõenäosus p) keskväärtus ja dispersioon:
<MathBlock>{"E(X)=np \\\\qquad D(X)=np(1-p)"}</MathBlock>
`,
    naide: `
Kui <Math>{"n=10"}</Math>, <Math>{"p=0{,}3"}</Math>, siis
<Math>{"E(X)=3"}</Math>.
`,
  },
  "06-jaotuspolygoon": {
    definitsioon: `
**Jaotuspolügoon** on diskreetse juhusliku suuruse jaotuse graafiline
esitus. Kõigi tõenäosuste summa peab alati võrduma <Math>{"1"}</Math>-ga.
`,
    naide: `
Kui <Math>{"P(X{=}1)=0{,}2"}</Math> ja <Math>{"P(X{=}2)=0{,}5"}</Math>, siis
<Math>{"P(X{=}3)=1-0{,}2-0{,}5=0{,}3"}</Math>.
`,
  },
  "06-keskvaartus": {
    definitsioon: `
Diskreetse juhusliku suuruse **keskväärtus**:
<MathBlock>{"E(X) = \\\\sum x_i\\\\, p_i"}</MathBlock>
`,
    naide: `
Kui <Math>{"X=1"}</Math> tõenäosusega <Math>{"0{,}5"}</Math> ja
<Math>{"X=3"}</Math> tõenäosusega <Math>{"0{,}5"}</Math>, siis
<Math>{"E(X)=2"}</Math>.
`,
  },
  "06-mood": {
    definitsioon: `
**Mood** on andmestikus kõige sagedamini esinev väärtus.
`,
    naide: `
Andmestikus <Math>{"2,3,3,3,5"}</Math> on mood <Math>{"3"}</Math>.
`,
  },
  "06-mediaan": {
    definitsioon: `
**Mediaan** on järjestatud andmestiku keskmine väärtus. Paaritu arvu andmete
korral on see keskmine liige; paarisarvu korral kahe keskmise liikme
keskmine.
`,
    naide: `
Andmestikus <Math>{"1,3,5,7,9"}</Math> on mediaan <Math>{"5"}</Math>.
`,
  },
  "06-dispersioon-ja-standardhalve": {
    definitsioon: `
**Dispersioon** mõõdab andmete hajuvust keskväärtuse ümber:
<MathBlock>{"D(X) = \\\\dfrac{\\\\sum(x_i-\\\\bar x)^2}{n}"}</MathBlock>
**Standardhälve** on dispersiooni ruutjuur: <Math>{"\\\\sigma=\\\\sqrt{D(X)}"}</Math>.
`,
    naide: `
Andmestikus <Math>{"8,9,10,11,12"}</Math> (keskmine <Math>{"10"}</Math>) on
dispersioon <Math>{"2"}</Math>.
`,
  },
  "06-uldkogum-ja-valim": {
    definitsioon: `
**Üldkogum** on kõik uuritavad objektid; **valim** on üldkogumist valitud
osa, mille põhjal tehakse järeldusi kogu üldkogumi kohta.
`,
    naide: `
Kõik Eesti 12. klassi õpilased on üldkogum; juhuslikult valitud 100 õpilast
on valim.
`,
  },
  "06-andmete-kogumine-ja-susteemiseerimine": {
    definitsioon: `
Andmete **süstematiseerimine** tähendab nende korrastamist sagedustabelisse
või rühmadesse, et neid oleks lihtsam analüüsida.
`,
    naide: `
Sagedustabelis on iga väärtuse kohta kirjas, mitu korda see andmestikus
esineb; summa peab võrduma andmestiku mahuga.
`,
  },
  "06-statistiline-analuus-uhe-tunnuse-jargi": {
    definitsioon: `
Ühe tunnuse statistiline analüüs hõlmab **haaret** (suurima ja vähima
väärtuse vahet), keskmist, moodi, mediaani ja hajuvuse näitajaid.
`,
    naide: `
Andmestikus <Math>{"3,7,9,15"}</Math> on haare <Math>{"15-3=12"}</Math>.
`,
  },
  "06-korrelatsioonivali": {
    definitsioon: `
**Korrelatsiooniväli** (hajuvusdiagramm) kujutab kahe tunnuse
väärtuspaare punktidena. Punktide paiknemise mustrist saab hinnata seose
suunda ja tugevust.
`,
    naide: `
Kui punktid koonduvad ülalt paremale suunatud sirge lähedale, on tegemist
positiivse korrelatsiooniga.
`,
  },
  "06-lineaarne-korrelatsioonikordaja": {
    definitsioon: `
**Lineaarne korrelatsioonikordaja** <Math>{"r"}</Math> näitab lineaarse
seose tugevust ja suunda, <Math>{"-1\\\\le r\\\\le1"}</Math>. Mida lähemal
<Math>{"|r|"}</Math> on <Math>{"1"}</Math>-le, seda tugevam on seos.
`,
    naide: `
<Math>{"r=0{,}9"}</Math> näitab tugevat positiivset seost;
<Math>{"r=0{,}1"}</Math> näitab peaaegu olematut seost.
`,
  },
  "06-normaaljaotus": {
    definitsioon: `
**Normaaljaotus** on sümmeetriline kellukesekujuline jaotus. Umbes
<Math>{"68\\\\%"}</Math> väärtustest jääb vahemikku
<Math>{"[\\\\mu-\\\\sigma,\\\\mu+\\\\sigma]"}</Math>, <Math>{"95\\\\%"}</Math>
vahemikku <Math>{"[\\\\mu-2\\\\sigma,\\\\mu+2\\\\sigma]"}</Math> ja
<Math>{"99{,}7\\\\%"}</Math> vahemikku
<Math>{"[\\\\mu-3\\\\sigma,\\\\mu+3\\\\sigma]"}</Math>.
`,
    naide: `
Kui <Math>{"\\\\mu=100"}</Math> ja <Math>{"\\\\sigma=15"}</Math>, jääb
<Math>{"68\\\\%"}</Math> väärtustest vahemikku <Math>{"[85,115]"}</Math>.
`,
  },
  "06-keskvaartuse-usaldusvahemik": {
    definitsioon: `
Üldkogumi keskväärtuse **usaldusvahemik** valimi keskväärtuse
<Math>{"\\\\bar x"}</Math> ja veapiiri <Math>{"E"}</Math> abil:
<MathBlock>{"[\\\\bar x - E,\\\\ \\\\bar x + E]"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\bar x=50"}</Math> ja <Math>{"E=3"}</Math>, on
usaldusvahemik <Math>{"[47,53]"}</Math>.
`,
  },
};
