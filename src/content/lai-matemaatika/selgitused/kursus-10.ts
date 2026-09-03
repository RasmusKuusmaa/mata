import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 10 (Tuletise rakendused). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "10-puutuja-vorrand": {
    definitsioon: `
Funktsiooni graafiku puutuja võrrand kohal <Math>{"x=a"}</Math>:
<MathBlock>{"y = f(a) + f'(a)(x-a)"}</MathBlock>
`,
    naide: `
Kui <Math>{"f(x)=x^2"}</Math>, <Math>{"a=2"}</Math>: <Math>{"f(2)=4"}</Math>,
<Math>{"f'(2)=4"}</Math>, puutuja on <Math>{"y=4+4(x-2)=4x-4"}</Math>.
`,
  },
  "10-kasvamis-ja-kahanemisvahemikud": {
    definitsioon: `
Funktsioon **kasvab** vahemikus, kus <Math>{"f'(x)>0"}</Math>, ja
**kahaneb**, kus <Math>{"f'(x)<0"}</Math>. Vahemike piirid on tuletise
nullkohad.
`,
    naide: `
Kui <Math>{"f'(x)=3(x-2)(x+2)"}</Math>, kahaneb funktsioon vahemikus
<Math>{"-2<x<2"}</Math> ja kasvab mujal.
`,
  },
  "10-ekstreemumi-tarvilik-tingimus": {
    definitsioon: `
**Ekstreemumi tarvilik tingimus**: kui funktsioonil on ekstreemum kohal
<Math>{"x=a"}</Math>, siis <Math>{"f'(a)=0"}</Math> (või tuletis ei
eksisteeri). See annab ekstreemumi **kandidaadid** — tingimus ei taga, et
kandidaat tegelikult ekstreemum on.
`,
    naide: `
Kui <Math>{"f'(x)=2x-6"}</Math>, on ekstreemumikandidaat
<Math>{"x=3"}</Math>.
`,
  },
  "10-ekstreemumi-piisav-tingimus": {
    definitsioon: `
**Ekstreemumi piisav tingimus** kinnitab, kas kandidaat on tegelikult
ekstreemum: kui tuletis vahetab kandidaadi juures märgi plussist miinusesse,
on **maksimum**; miinusest plussi, on **miinimum**. Sama saab kontrollida
teise tuletise märgi järgi: <Math>{"f''(a)>0"}</Math> annab miinimumi,
<Math>{"f''(a)<0"}</Math> maksimumi.
`,
    naide: `
Kui <Math>{"f''(3)=6>0"}</Math>, on <Math>{"x=3"}</Math> kohal miinimum.
`,
  },
  "10-suurim-ja-vahim-vaartus-loigul": {
    definitsioon: `
Funktsiooni suurima ja vähima väärtuse leidmiseks lõigul <Math>{"[a,b]"}</Math>
võrreldakse funktsiooni väärtusi lõigu **otspunktides** ja
**ekstreemumikandidaatides**, mis jäävad lõigu sisse.
`,
    naide: `
Kui <Math>{"f(x)=x^2"}</Math> lõigul <Math>{"[-1,3]"}</Math>: kandidaat
<Math>{"x=0"}</Math> (<Math>{"f(0)=0"}</Math>), otspunktid
<Math>{"f(-1)=1"}</Math>, <Math>{"f(3)=9"}</Math> — suurim on
<Math>{"9"}</Math>, vähim on <Math>{"0"}</Math>.
`,
  },
  "10-kumerus-ja-nogusus": {
    definitsioon: `
Graafik on **kumer**, kus <Math>{"f''(x)>0"}</Math> (nagu ∪), ja **nõgus**,
kus <Math>{"f''(x)<0"}</Math> (nagu ∩).
`,
    naide: `
Kui <Math>{"f''(x)=6x"}</Math>, on graafik kumer, kui <Math>{"x>0"}</Math>,
ja nõgus, kui <Math>{"x<0"}</Math>.
`,
  },
  "10-kaanupunkt": {
    definitsioon: `
**Käänupunkt** on koht, kus graafiku kumerus vahetub nõgususeks (või
vastupidi) — seal <Math>{"f''(x)=0"}</Math> ja teine tuletis vahetab märki.
`,
    naide: `
Kui <Math>{"f''(x)=6x"}</Math>, on käänupunkt kohal <Math>{"x=0"}</Math>.
`,
  },
  "10-funktsiooni-tailielik-uurimine": {
    definitsioon: `
Funktsiooni **täielik uurimine** koondab kõik omadused: määramispiirkonna,
nullkohad, paarsuse, kasvamis-/kahanemisvahemikud, ekstreemumid,
kumerus-/nõgususvahemikud ja käänupunktid — need kokku annavad piisavalt
infot graafiku täpseks skitseerimiseks.
`,
    naide: `
Kui käänupunkt on kohal <Math>{"x=2"}</Math> ja
<Math>{"f(x)=(x-2)^3+5"}</Math>, siis funktsiooni väärtus käänupunktis on
<Math>{"f(2)=5"}</Math>.
`,
  },
  "10-graafiku-skitseerimine": {
    definitsioon: `
Uuritud omaduste (nullkohad, ekstreemumid, kasvamis-/kahanemisvahemikud,
käänupunktid) põhjal saab graafiku joonestada ilma väärtuste tabelita —
piisab teadmisest, kus funktsioon kasvab/kahaneb ja kus on pöördepunktid.
`,
    naide: `
Kui tuletis on alati positiivne, on graafik kogu ulatuses kasvav, ilma
lokaalsete tippudeta.
`,
  },
  "10-rakenduslikud-ekstreemumulesanded": {
    definitsioon: `
Optimeerimisülesannetes tõlgitakse reaalne olukord funktsiooniks (nt pindala
antud ümbermõõdu korral), leitakse selle tuletis, ekstreemumikandidaadid ning
kontrollitakse piisava tingimusega, kumb kandidaat annab soovitud
(maksimaalse või minimaalse) väärtuse.
`,
    naide: `
Antud ümbermõõduga ristküliku suurim pindala saavutatakse ruudu kujul.
`,
  },
};
