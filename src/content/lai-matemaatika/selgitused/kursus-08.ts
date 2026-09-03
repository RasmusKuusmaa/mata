import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 8 (Eksponent- ja logaritmfunktsioon). One entry
 * per topic. Re-exported from `selgitused/index.ts`. No bare `$...$` math
 * delimiters — see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "08-liitprotsendiline-kasvamine-ja-kahanemine": {
    definitsioon: `
**Liitprotsendiline muutus** tähendab, et iga perioodi protsent arvutatakse
eelmise perioodi (mitte algse) väärtuse pealt:
<MathBlock>{"A = A_0\\\\left(1\\\\pm\\\\dfrac{p}{100}\\\\right)^n"}</MathBlock>
Pluss on kasvamise, miinus kahanemise korral.
`,
    naide: `
Hoius <Math>{"100"}</Math> eurot kasvab <Math>{"10\\\\%"}</Math> aastas: 2
aasta pärast <Math>{"100\\\\cdot1{,}1^2=121"}</Math> eurot.
`,
  },
  "08-eksponentfunktsioon-ja-graafik": {
    definitsioon: `
**Eksponentfunktsioon** on kujul <Math>{"y=a^x"}</Math>, kus
<Math>{"a>0"}</Math> ja <Math>{"a\\\\ne1"}</Math>. Kui <Math>{"a>1"}</Math>,
on funktsioon kasvav; kui <Math>{"0<a<1"}</Math>, on kahanev. Graafik läbib
alati punkti <Math>{"(0,1)"}</Math> ja on alati positiivne.
`,
    naide: `
<Math>{"y=2^x"}</Math> on kasvav: <Math>{"2^{-1}=0{,}5"}</Math>,
<Math>{"2^0=1"}</Math>, <Math>{"2^1=2"}</Math>.
`,
  },
  "08-funktsioon-e-x": {
    definitsioon: `
Funktsioon <Math>{"y=e^x"}</Math> on eksponentfunktsioon alusega
Euleri arv <Math>{"e\\\\approx2{,}71828"}</Math>. Nagu iga eksponentfunktsioon
alusega <Math>{"a>1"}</Math>, on ka see alati positiivne ja kasvav.
`,
    naide: `
<Math>{"e^0=1"}</Math> ja <Math>{"e^x\\\\cdot e^{-x}=e^0=1"}</Math> iga
<Math>{"x"}</Math> korral.
`,
  },
  "08-arvu-logaritm": {
    definitsioon: `
**Logaritm** <Math>{"\\\\log_a b"}</Math> on aste, milleni tuleb tõsta alus
<Math>{"a"}</Math>, et saada <Math>{"b"}</Math>:
<MathBlock>{"\\\\log_a b = c \\\\quad \\\\Longleftrightarrow \\\\quad a^c = b"}</MathBlock>
Alati kehtib <Math>{"\\\\log_a 1 = 0"}</Math> ja <Math>{"\\\\log_a a = 1"}</Math>.
`,
    naide: `
<Math>{"\\\\log_2 8 = 3"}</Math>, sest <Math>{"2^3=8"}</Math>.
`,
  },
  "08-korrutise-jagatise-astme-logaritm": {
    definitsioon: `
Logaritmi omadused:
<MathBlock>{"\\\\log_a(xy)=\\\\log_a x+\\\\log_a y \\\\qquad \\\\log_a\\\\dfrac{x}{y}=\\\\log_a x-\\\\log_a y \\\\qquad \\\\log_a(x^k)=k\\\\log_a x"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\log_a x=2"}</Math> ja <Math>{"\\\\log_a y=3"}</Math>, siis
<Math>{"\\\\log_a(xy)=5"}</Math>.
`,
  },
  "08-logaritmimine-ja-potentseerimine": {
    definitsioon: `
**Potentseerimine** on üleminek logaritmilt algarvule
(<Math>{"\\\\log_a x=c \\\\Rightarrow x=a^c"}</Math>); **logaritmimine** on
vastupidine üleminek.
`,
    naide: `
Kui <Math>{"\\\\log_2 x=3"}</Math>, siis potentseerides <Math>{"x=2^3=8"}</Math>.
`,
  },
  "08-logaritmi-aluse-vahetamine": {
    definitsioon: `
Aluse vahetuse valem viib logaritmi suvaliselt aluselt teisele:
<MathBlock>{"\\\\log_a b = \\\\dfrac{\\\\log_c b}{\\\\log_c a}"}</MathBlock>
Erijuht: <Math>{"\\\\log_b a = \\\\dfrac{1}{\\\\log_a b}"}</Math>.
`,
    naide: `
<Math>{"\\\\log_4 8 = \\\\dfrac{\\\\log_2 8}{\\\\log_2 4} = \\\\dfrac{3}{2}"}</Math>.
`,
  },
  "08-logaritmfunktsioon-ja-graafik": {
    definitsioon: `
**Logaritmfunktsioon** <Math>{"y=\\\\log_a x"}</Math> on eksponentfunktsiooni
pöördfunktsioon. Määramispiirkond on <Math>{"x>0"}</Math>. Kui
<Math>{"a>1"}</Math>, on kasvav; kui <Math>{"0<a<1"}</Math>, kahanev.
`,
    naide: `
<Math>{"y=\\\\log_2 x"}</Math> läbib punkti <Math>{"(1,0)"}</Math> ja on
kasvav, sest alus <Math>{"2>1"}</Math>.
`,
  },
  "08-poordfunktsioon": {
    definitsioon: `
Eksponentfunktsioon <Math>{"y=a^x"}</Math> ja logaritmfunktsioon
<Math>{"y=\\\\log_a x"}</Math> on teineteise **pöördfunktsioonid**: kui
<Math>{"f(k)=v"}</Math>, siis <Math>{"f^{-1}(v)=k"}</Math>.
`,
    naide: `
Kui <Math>{"2^3=8"}</Math>, siis <Math>{"\\\\log_2 8=3"}</Math> — need
kirjeldavad sama seost vastupidises suunas.
`,
  },
  "08-eksponentvorrand": {
    definitsioon: `
**Eksponentvõrrandi** lihtsaim lahendusviis on viia mõlemad pooled samale
alusele — siis peavad astendajad olema võrdsed:
<MathBlock>{"a^{f(x)}=a^{g(x)} \\\\quad \\\\Longleftrightarrow \\\\quad f(x)=g(x)"}</MathBlock>
`,
    naide: `
<Math>{"2^{2x-1}=2^5 \\\\Rightarrow 2x-1=5 \\\\Rightarrow x=3"}</Math>.
`,
  },
  "08-logaritmvorrand": {
    definitsioon: `
**Logaritmvõrrandi** lahendamiseks isoleeritakse logaritm ja
potentseeritakse:
<MathBlock>{"\\\\log_a x = c \\\\quad \\\\Longrightarrow \\\\quad x=a^c"}</MathBlock>
Lahend tuleb kontrollida algse võrrandi määramispiirkonna vastu
(<Math>{"x>0"}</Math>).
`,
    naide: `
<Math>{"\\\\log_2 x = 3 \\\\Rightarrow x=2^3=8"}</Math>.
`,
  },
  "08-eksponentvorratus": {
    definitsioon: `
Eksponentvõrratuse lahendamisel viiakse pooled samale alusele. Kui
<Math>{"a>1"}</Math>, säilib võrratuse suund; kui <Math>{"0<a<1"}</Math>,
**pöördub** suund vastupidiseks (nagu negatiivse arvuga korrutamisel).
`,
    naide: `
<Math>{"\\\\left(\\\\frac12\\\\right)^x > \\\\left(\\\\frac12\\\\right)^3 \\\\Rightarrow x<3"}</Math>
(suund pöördub, sest alus on alla ühe).
`,
  },
  "08-logaritmvorratus": {
    definitsioon: `
Logaritmvõrratuse lahendamisel tuleb arvestada kahte asja: alusest sõltuvat
suunda (nagu eksponentvõrratuses) ning logaritmi **määramispiirkonda**
(<Math>{"x>0"}</Math>), mis jääb lahendihulka piirama.
`,
    naide: `
<Math>{"\\\\log_2 x < 3 \\\\Rightarrow x<8"}</Math>, aga kuna
<Math>{"x>0"}</Math> peab ka kehtima, on lahend <Math>{"0<x<8"}</Math>.
`,
  },
  "08-eksponent-ja-logaritmmudelid": {
    definitsioon: `
Paljud reaalelulised protsessid (populatsiooni kasv, radioaktiivne lagunemine,
liitintress) järgivad eksponentsiaalset mudelit
<Math>{"A(t)=A_0\\\\cdot k^t"}</Math>. Aja leidmiseks, mille jooksul jõutakse
kindla väärtuseni, kasutatakse logaritmi.
`,
    naide: `
Kui populatsioon kahekordistub igal aastal ja alguses on <Math>{"10"}</Math>,
siis <Math>{"3"}</Math> aasta pärast on <Math>{"10\\\\cdot2^3=80"}</Math>.
`,
  },
};
