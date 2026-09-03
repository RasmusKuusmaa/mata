import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 13 (Stereomeetria). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "13-prisma": {
    definitsioon: `
**Prisma** on hulktahukas, mille kaks tahku (põhjad) on kongruentsed
hulknurgad paralleelsetel tasanditel ning ülejäänud tahud (külgtahud) on
rööpkülikud. Korrapärase prisma ruumala ja täispindala:
<MathBlock>{"V = S_p \\\\cdot h \\\\qquad S = 2S_p + S_{\\\\text{külg}}"}</MathBlock>
kus <Math>{"S_p"}</Math> on põhja pindala ja <Math>{"h"}</Math> kõrgus.
`,
    naide: `
Korrapärase nelinurkse prisma põhiserv on <Math>{"a=4"}</Math> ja kõrgus
<Math>{"h=5"}</Math>. Ruumala on
<Math>{"V=a^2h=4^2\\\\cdot5=80"}</Math>.
`,
  },
  "13-puramiid": {
    definitsioon: `
**Püramiid** on hulktahukas, mille üks tahk (põhi) on hulknurk ja ülejäänud
tahud (külgtahud) on kolmnurgad, mis koonduvad ühte tippu.
<MathBlock>{"V = \\\\dfrac13 S_p h \\\\qquad S_{\\\\text{külg}} = \\\\dfrac12 P l"}</MathBlock>
kus <Math>{"P"}</Math> on põhja ümbermõõt ja <Math>{"l"}</Math> apoteem
(külgtahu kõrgus).
`,
    naide: `
Korrapärase nelinurkse püramiidi põhiserv on <Math>{"a=6"}</Math> ja kõrgus
<Math>{"h=4"}</Math>. Ruumala on
<Math>{"V=\\\\dfrac13\\\\cdot6^2\\\\cdot4=48"}</Math>.
`,
  },
  "13-korrapaarased-hulktahukad": {
    definitsioon: `
**Korrapärane hulktahukas** (Platoni keha) on kumer hulktahukas, mille kõik
tahud on kongruentsed korrapärased hulknurgad ja igas tipus koondub sama arv
tahke. Selliseid on täpselt viis: tetraeeder, kuup, oktaeeder, dodekaeeder ja
ikosaeeder. Nende tippude, servade ja tahkude arvud rahuldavad
**Euleri valemit**:
<MathBlock>{"V - E + F = 2"}</MathBlock>
kus <Math>{"V"}</Math> on tippude, <Math>{"E"}</Math> servade ja
<Math>{"F"}</Math> tahkude arv.
`,
    naide: `
Kuubil on <Math>{"F=6"}</Math> tahku ja <Math>{"E=12"}</Math> serva.
Euleri valemist <Math>{"V=2+E-F=2+12-6=8"}</Math> — kuubil on 8 tippu.
`,
  },
  "13-silinder": {
    definitsioon: `
**Silinder** tekib ristküliku pöörlemisel ümber ühe külje (või ringi
liikumisel piki telge). Põhiraadius <Math>{"r"}</Math>, kõrgus
<Math>{"h"}</Math>:
<MathBlock>{"V = \\\\pi r^2 h \\\\qquad S = 2\\\\pi r^2 + 2\\\\pi rh"}</MathBlock>
`,
    naide: `
Silindri põhiraadius on <Math>{"r=3"}</Math> ja kõrgus <Math>{"h=5"}</Math>.
Ruumala on <Math>{"V=\\\\pi\\\\cdot3^2\\\\cdot5=45\\\\pi"}</Math>.
`,
  },
  "13-koonus": {
    definitsioon: `
**Koonus** tekib täisnurkse kolmnurga pöörlemisel ümber ühe kaateti.
Põhiraadius <Math>{"r"}</Math>, kõrgus <Math>{"h"}</Math>, moodustaja
(külgjoon) <Math>{"l=\\\\sqrt{r^2+h^2}"}</Math>:
<MathBlock>{"V = \\\\dfrac13\\\\pi r^2 h \\\\qquad S_{\\\\text{külg}} = \\\\pi rl \\\\qquad S = \\\\pi r^2 + \\\\pi rl"}</MathBlock>
`,
    naide: `
Koonuse põhiraadius on <Math>{"r=3"}</Math> ja moodustaja
<Math>{"l=5"}</Math>. Külgpindala on
<Math>{"S_{\\\\text{külg}}=\\\\pi\\\\cdot3\\\\cdot5=15\\\\pi"}</Math>.
`,
  },
  "13-kera": {
    definitsioon: `
**Kera** on kõigi ruumipunktide hulk, mille kaugus antud punktist (keskpunkt)
ei ületa raadiust <Math>{"r"}</Math>. Kera pind (sfäär) tekib poolringjoone
pöörlemisel ümber diameetri.
<MathBlock>{"V = \\\\dfrac43\\\\pi r^3 \\\\qquad S = 4\\\\pi r^2"}</MathBlock>
`,
    naide: `
Kera raadius on <Math>{"r=3"}</Math>. Pindala on
<Math>{"S=4\\\\pi\\\\cdot3^2=36\\\\pi"}</Math>.
`,
  },
  "13-kera-segment-kiht-voo-sektor": {
    definitsioon: `
Kera **segment** on osa kerast, mis jääb lõikava tasandi ühele poole; **kiht
(vöö)** jääb kahe paralleelse lõikava tasandi vahele; **sektor** tekib
segmendi ja koonuse ühendamisel kera keskpunktist. Raadiuse
<Math>{"R"}</Math> ja segmendi/vöö kõrguse <Math>{"h"}</Math> kaudu:
<MathBlock>{"S_{\\\\text{vöö}}=2\\\\pi Rh \\\\qquad V_{\\\\text{segment}}=\\\\dfrac13\\\\pi h^2(3R-h) \\\\qquad V_{\\\\text{sektor}}=\\\\dfrac23\\\\pi R^2h"}</MathBlock>
`,
    naide: `
Kera raadius on <Math>{"R=5"}</Math> ja vöö kõrgus <Math>{"h=2"}</Math>.
Vöö pindala on <Math>{"S_{\\\\text{vöö}}=2\\\\pi\\\\cdot5\\\\cdot2=20\\\\pi"}</Math>.
`,
  },
  "13-silindri-ruumala-tuletamine": {
    definitsioon: `
Silindri ruumala saab tuletada **ristlõigete meetodiga**: iga kõrguse
<Math>{"x\\\\in[0,h]"}</Math> juures on ristlõige ringjoon raadiusega
<Math>{"r"}</Math>, mille pindala <Math>{"S(x)=\\\\pi r^2"}</Math> on
konstantne. Ruumala on selle integraal:
<MathBlock>{"V=\\\\displaystyle\\\\int_0^h S(x)\\\\,dx=\\\\int_0^h \\\\pi r^2\\\\,dx=\\\\pi r^2h"}</MathBlock>
`,
    naide: `
Kui <Math>{"r=2"}</Math> ja <Math>{"h=5"}</Math>, siis
<Math>{"V=\\\\int_0^5\\\\pi\\\\cdot2^2\\\\,dx=4\\\\pi\\\\cdot5=20\\\\pi"}</Math>.
`,
  },
  "13-koonuse-ruumala-tuletamine": {
    definitsioon: `
Koonuse ruumala tuletatakse sirge <Math>{"f(x)=\\\\dfrac{r}{h}x"}</Math>
pöörlemisel ümber x-telje lõigul <Math>{"[0,h]"}</Math>: iga
<Math>{"x"}</Math> juures on ristlõige ringjoon raadiusega
<Math>{"f(x)"}</Math>.
<MathBlock>{"V=\\\\pi\\\\displaystyle\\\\int_0^h \\\\left(\\\\dfrac{r}{h}x\\\\right)^2dx=\\\\pi\\\\dfrac{r^2}{h^2}\\\\cdot\\\\dfrac{h^3}{3}=\\\\dfrac13\\\\pi r^2h"}</MathBlock>
`,
    naide: `
Kui <Math>{"f(x)=x"}</Math> lõigul <Math>{"[0,3]"}</Math> (st
<Math>{"r=h=3"}</Math>), siis
<Math>{"V=\\\\pi\\\\int_0^3 x^2\\\\,dx=\\\\pi\\\\cdot\\\\dfrac{27}{3}=9\\\\pi"}</Math>.
`,
  },
  "13-kera-ruumala-tuletamine": {
    definitsioon: `
Kera ruumala tuletatakse poolringjoone
<Math>{"y=\\\\sqrt{R^2-x^2}"}</Math> pöörlemisel ümber x-telje lõigul
<Math>{"[-R,R]"}</Math>. Ristlõike pindala on
<Math>{"S(x)=\\\\pi(R^2-x^2)"}</Math>.
<MathBlock>{"V=\\\\pi\\\\displaystyle\\\\int_{-R}^{R}(R^2-x^2)\\\\,dx=\\\\pi\\\\left[R^2x-\\\\dfrac{x^3}{3}\\\\right]_{-R}^{R}=\\\\dfrac43\\\\pi R^3"}</MathBlock>
`,
    naide: `
Kui <Math>{"R=3"}</Math>, siis ristlõike pindala keskpunktis on
<Math>{"S(0)=\\\\pi\\\\cdot3^2=9\\\\pi"}</Math> ja kogu ruumala
<Math>{"V=\\\\dfrac43\\\\pi\\\\cdot3^3=36\\\\pi"}</Math>.
`,
  },
  "13-hulktahukate-loiked": {
    definitsioon: `
Hulktahuka **lõige** tasandiga on hulknurk, mille tipud on tasandi ja
hulktahuka servade lõikepunktid. Lõikefiguuri kuju sõltub sellest, mitut
tahku lõikav tasand läbib — näiteks kuubi diagonaallõige on ristkülik ja
põhjaga paralleelne lõige korrapärase püramiidi puhul on põhjaga sarnane
hulknurk.
`,
    naide: `
Korrapärase püramiidi lõige, mis on põhjast poole kõrguse kohalt paralleelne
põhjaga, on põhjaga sarnane kujund suhtega <Math>{"1:2"}</Math>, mistõttu
lõike pindala on <Math>{"\\\\left(\\\\frac12\\\\right)^2=\\\\frac14"}</Math>
põhja pindalast.
`,
  },
  "13-poordkehade-loiked": {
    definitsioon: `
Pöördkeha (silinder, koonus, kera) lõige tasandiga, mis läbib pöörlemistelge
(**teljelõige**), annab silindri korral ristküliku ja koonuse korral
võrdhaarse kolmnurga. Kera lõige mistahes tasandiga on ring, mille raadius
<Math>{"r"}</Math> leitakse Pythagorase teoreemist kera raadiuse
<Math>{"R"}</Math> ja tasandi kauguse <Math>{"d"}</Math> keskpunktist abil:
<MathBlock>{"r^2 = R^2 - d^2"}</MathBlock>
`,
    naide: `
Kera raadius on <Math>{"R=5"}</Math> ja lõikav tasand asub keskpunktist
kaugusel <Math>{"d=3"}</Math>. Lõikeringi raadius on
<Math>{"r=\\\\sqrt{25-9}=4"}</Math> ja pindala
<Math>{"S=\\\\pi\\\\cdot16=16\\\\pi"}</Math>.
`,
  },
  "13-stereomeetria-rakendusulesanded": {
    definitsioon: `
Reaalelulisi ehitisi ja objekte (paagid, silod, katused) saab sageli
mudeldada tuntud kehade (silinder, koonus, kera, nende osad) kombinatsioonina.
Liitkeha ruumala on selle osade ruumalade summa.
`,
    naide: `
Silo koosneb silindrist (<Math>{"r=2"}</Math>, <Math>{"h=6"}</Math>) ja selle
otsa asetatud poolkerast. Kogu ruumala on
<Math>{"V=\\\\pi\\\\cdot2^2\\\\cdot6+\\\\dfrac23\\\\pi\\\\cdot2^3=24\\\\pi+\\\\dfrac{16\\\\pi}{3}=\\\\dfrac{88\\\\pi}{3}"}</Math>.
`,
  },
};
