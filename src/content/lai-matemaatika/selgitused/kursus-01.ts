import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 1 (Avaldised ja arvuhulgad). One entry per topic,
 * added as Ship 1.8/2.x authors it — never delete an entry, only add or
 * edit one. Re-exported from `selgitused/index.ts`.
 *
 * No bare `$...$` math delimiters anywhere below — see `eeldused.ts`'s
 * header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "01-arvuhulgad": {
    definitsioon: `
Arvuhulgad on üksteise sisse pesastunud:
<MathBlock>{"N \\\\subset Z \\\\subset Q \\\\subset R"}</MathBlock>

- <Math>{"N"}</Math> — **naturaalarvud**: <Math>{"0, 1, 2, 3, \\\\ldots"}</Math>
- <Math>{"Z"}</Math> — **täisarvud**: naturaalarvud ja nende vastandarvud
  (nt <Math>{"-5"}</Math>)
- <Math>{"Q"}</Math> — **ratsionaalarvud**: esitatavad murruna
  <Math>{"\\\\dfrac{a}{b}"}</Math>, kus <Math>{"a, b \\\\in Z"}</Math>,
  <Math>{"b \\\\neq 0"}</Math>
- <Math>{"I"}</Math> — **irratsionaalarvud**: lõpmatud mitteperioodilised
  kümnendmurrud (nt <Math>{"\\\\sqrt{2}"}</Math>, <Math>{"\\\\pi"}</Math>) —
  <Math>{"I"}</Math> ja <Math>{"Q"}</Math> ei kattu
- <Math>{"R"}</Math> — **reaalarvud**: ratsionaal- ja irratsionaalarvude
  ühend, <Math>{"R = Q \\\\cup I"}</Math>

Iga arv kuulub oma **kitsaimasse** hulka — nt <Math>{"3"}</Math> kuulub
kõikidesse hulkadesse <Math>{"N, Z, Q, R"}</Math>, aga selle kitsaim hulk on
<Math>{"N"}</Math>.
`,
    naide: `
Arv <Math>{"-\\\\dfrac{2}{3}"}</Math> ei ole täisarv, seega ei kuulu
hulkadesse <Math>{"N"}</Math> ega <Math>{"Z"}</Math>. See on esitatav kahe
täisarvu jagatisena, seega on selle kitsaim hulk <Math>{"Q"}</Math>.
`,
  },
  "01-reaalarvude-piirkonnad-arvteljel": {
    definitsioon: `
Arvupiirkonda (intervalli) märgitakse nurksulgudega, kui otspunkt kuulub
piirkonda, ja ümarsulgudega, kui ei kuulu:

- <Math>{"[a; b]"}</Math> — **kinnine** piirkond, sisaldab mõlemat otspunkti: <Math>{"a \\\\le x \\\\le b"}</Math>
- <Math>{"(a; b)"}</Math> — **lahtine** piirkond, ei sisalda kumbagi: <Math>{"a < x < b"}</Math>
- <Math>{"[a; b)"}</Math> — sisaldab ainult vasakut otspunkti: <Math>{"a \\\\le x < b"}</Math>
- <Math>{"(a; b]"}</Math> — sisaldab ainult paremat otspunkti: <Math>{"a < x \\\\le b"}</Math>
`,
    naide: `
Piirkond <Math>{"(-2; 5]"}</Math> sisaldab kõiki arve <Math>{"x"}</Math>,
mille korral <Math>{"-2 < x \\\\le 5"}</Math>. Seega <Math>{"5"}</Math>
kuulub sellesse piirkonda, aga <Math>{"-2"}</Math> mitte.
`,
  },
  "01-absoluutvaartus": {
    definitsioon: `
Arvu <Math>{"x"}</Math> absoluutväärtus <Math>{"|x|"}</Math> on selle arvu
kaugus nullist arvteljel — alati mittenegatiivne:
<MathBlock>{"|x| = \\\\begin{cases} x, & x \\\\ge 0 \\\\\\\\ -x, & x < 0 \\\\end{cases}"}</MathBlock>

Kahe arvu <Math>{"a"}</Math> ja <Math>{"b"}</Math> vaheline kaugus arvteljel
on <Math>{"|a - b|"}</Math>.
`,
    naide: `
<MathBlock>{"|-7| = 7 \\\\qquad |4| = 4 \\\\qquad |3 - 8| = |-5| = 5"}</MathBlock>
`,
  },
  "01-arvususteemid": {
    definitsioon: `
**Positsiooniline arvusüsteem** — iga koha väärtus sõltub selle asukohast.
Kümnendsüsteemis (alus <Math>{"10"}</Math>) vastab koht kümne astmele,
kahendsüsteemis (alus <Math>{"2"}</Math>, kasutusel arvutites) kahe astmele:

<MathBlock>{"1011_2 = 1 \\\\cdot 2^3 + 0 \\\\cdot 2^2 + 1 \\\\cdot 2^1 + 1 \\\\cdot 2^0"}</MathBlock>

Kümnendarvu teisendamiseks kahendsüsteemi jagatakse arvu korduvalt kahega ja
loetakse jäägid alt üles.
`,
    naide: `
<MathBlock>{"1011_2 = 8 + 0 + 2 + 1 = 11_{10}"}</MathBlock>
`,
  },
  "01-ratsionaalavaldiste-teisendamine": {
    definitsioon: `
Ratsionaalavaldis on kahe hulkliikme jagatis. Lihtsustamiseks:

- **monoomide jagamisel** jagatakse kordajad ja lahutatakse sama aluse
  astendajad: <Math>{"\\\\dfrac{cx^a}{dx^b} = \\\\dfrac{c}{d}x^{a-b}"}</Math>
- **taandamiseks** tegurdatakse nii lugeja kui nimetaja ja lühendatakse
  ühised tegurid, nt lühendvalemi
  <Math>{"a^2 - b^2 = (a-b)(a+b)"}</Math> või ruutkolmliikme tegurdamise
  abil.
`,
    naide: `
<MathBlock>{"\\\\dfrac{x^2 - 9}{x - 3} = \\\\dfrac{(x-3)(x+3)}{x-3} = x + 3"}</MathBlock>
`,
  },
  "01-irratsionaalavaldiste-teisendamine": {
    definitsioon: `
Juuri sisaldavate avaldiste teisendamise põhireeglid:

- **korrutamine**: <Math>{"\\\\sqrt{a} \\\\cdot \\\\sqrt{b} = \\\\sqrt{ab}"}</Math>
- **nimetaja vabastamine juurest**: korrutatakse murru mõlemat poolt
  nimetaja juurega, <Math>{"\\\\dfrac{a}{\\\\sqrt{b}} = \\\\dfrac{a\\\\sqrt{b}}{b}"}</Math>
- **sama juurealusega liikmete liitmine/lahutamine**: liidetakse/lahutatakse
  ainult kordajad, <Math>{"k_1\\\\sqrt{m} \\\\pm k_2\\\\sqrt{m} = (k_1 \\\\pm k_2)\\\\sqrt{m}"}</Math>
  — erineva juurealusega liikmeid **ei saa** kokku liita.
`,
    naide: `
<MathBlock>{"3\\\\sqrt{5} + 2\\\\sqrt{5} = 5\\\\sqrt{5}"}</MathBlock>
`,
  },
  "01-n-es-juur": {
    definitsioon: `
Arvu <Math>{"a"}</Math> **n-es juur** <Math>{"\\\\sqrt[n]{a}"}</Math> on arv,
mille <Math>{"n"}</Math>-es aste on <Math>{"a"}</Math>. Paarisarvulise
astendaja korral peab <Math>{"a \\\\ge 0"}</Math> ja juur on
mittenegatiivne; paaritu astendaja korral on juur määratud ka negatiivsete
arvude puhul.
`,
    naide: `
<MathBlock>{"\\\\sqrt[3]{-8} = -2\\\\text{, sest } (-2)^3 = -8"}</MathBlock>
`,
  },
  "01-taisarvuline-astendaja": {
    definitsioon: `
Täisarvulise astendajaga aste laiendab astendamist täisarvudele:

- <Math>{"a^0 = 1"}</Math> (kui <Math>{"a \\\\neq 0"}</Math>)
- <Math>{"a^{-n} = \\\\dfrac{1}{a^n}"}</Math> (kui <Math>{"a \\\\neq 0"}</Math>)
`,
    naide: `
<MathBlock>{"5^{-2} = \\\\dfrac{1}{5^2} = \\\\dfrac{1}{25}"}</MathBlock>
`,
  },
  "01-ratsionaalarvuline-astendaja": {
    definitsioon: `
Ratsionaalarvulise astendajaga aste seob astendamise juurimisega:
<MathBlock>{"a^{\\\\frac{m}{n}} = \\\\sqrt[n]{a^m} = \\\\left(\\\\sqrt[n]{a}\\\\right)^m"}</MathBlock>

Negatiivse ratsionaalarvulise astendaja korral võetakse lisaks pöördväärtus:
<MathBlock>{"a^{-\\\\frac{m}{n}} = \\\\dfrac{1}{\\\\left(\\\\sqrt[n]{a}\\\\right)^m}"}</MathBlock>
`,
    naide: `
<MathBlock>{"8^{\\\\frac{2}{3}} = \\\\left(\\\\sqrt[3]{8}\\\\right)^2 = 2^2 = 4"}</MathBlock>
`,
  },
  "01-tehted-astmetega": {
    definitsioon: `
Astmete tehete reeglid:

<MathBlock>{"a^m \\\\cdot a^n = a^{m+n} \\\\qquad a^m : a^n = a^{m-n} \\\\qquad (a^m)^n = a^{mn} \\\\qquad (ab)^n = a^n b^n"}</MathBlock>
`,
    naide: `
<MathBlock>{"\\\\dfrac{2^5 \\\\cdot 2^2}{2^4} = 2^{5+2-4} = 2^3 = 8"}</MathBlock>
`,
  },
  "01-tehted-juurtega": {
    definitsioon: `
Võrdse juurijaga (sama astendajaga) juurte tehted:

<MathBlock>{"\\\\sqrt{a} \\\\cdot \\\\sqrt{b} = \\\\sqrt{ab} \\\\qquad \\\\dfrac{\\\\sqrt{a}}{\\\\sqrt{b}} = \\\\sqrt{\\\\dfrac{a}{b}}"}</MathBlock>

Erineva juurijaga juuri ei saa otse korrutada ega jagada — need tuleb kõigepealt teisendada sama juurijaga.
`,
    naide: `
<MathBlock>{"\\\\sqrt{8} \\\\cdot \\\\sqrt{2} = \\\\sqrt{16} = 4"}</MathBlock>
`,
  },
  "01-protsentulesanded": {
    definitsioon: `
Protsendi kolm põhiülesannet (vt eeldusteema) laienevad gümnaasiumis
**liitprotsendiks**, kui suurus muutub sama protsendimäära võrra mitmel
järjestikusel perioodil:
<MathBlock>{"A = A_0 \\\\cdot \\\\left(1 + \\\\dfrac{p}{100}\\\\right)^n"}</MathBlock>

kus <Math>{"A_0"}</Math> on algväärtus, <Math>{"p"}</Math> perioodi
kasvumäär protsentides ja <Math>{"n"}</Math> perioodide arv. Kahanemise
korral kasutatakse märki <Math>{"-"}</Math>.
`,
    naide: `
Hoius <Math>{"1000"}</Math> eurot kasvab <Math>{"10\\\\%"}</Math> aastas:

<MathBlock>{"A = 1000 \\\\cdot 1{,}1^2 = 1210"}</MathBlock>
`,
  },
};
