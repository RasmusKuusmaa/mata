/**
 * The formula sheet handed out with the real exam (todo.md Ship 5.1,
 * `docs/eristuskiri-2027.md`'s Lisa 1). Authored from the curriculum's own
 * established formulas — the same ones already used and verified throughout
 * `src/generators` — rather than transcribed from the PDF appendix directly
 * (no local PDF text extraction available). **TODO:** reconcile section by
 * section against the official Lisa 1 once it can be extracted, the same
 * way `docs/eristuskiri-2027.md` already flags its own open items.
 */
export type ValemiRida = { silt: string; valem: string; markus?: string };
export type ValemiJaotis = { pealkiri: string; read: ValemiRida[] };

export const valemileht: ValemiJaotis[] = [
  {
    pealkiri: "Astmed, juured, logaritmid",
    read: [
      { silt: "Astmete korrutamine", valem: "a^m\\cdot a^n=a^{m+n}" },
      { silt: "Astmete jagamine", valem: "\\dfrac{a^m}{a^n}=a^{m-n}" },
      { silt: "Aste astmes", valem: "(a^m)^n=a^{mn}" },
      { silt: "Negatiivne astendaja", valem: "a^{-n}=\\dfrac{1}{a^n}" },
      {
        silt: "Ratsionaalarvuline astendaja",
        valem: "a^{\\frac{m}{n}}=\\sqrt[n]{a^m}",
      },
      {
        silt: "Juurte korrutamine",
        valem: "\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{ab}",
      },
      {
        silt: "Korrutise logaritm",
        valem: "\\log_a(xy)=\\log_a x+\\log_a y",
      },
      {
        silt: "Jagatise logaritm",
        valem: "\\log_a\\dfrac{x}{y}=\\log_a x-\\log_a y",
      },
      { silt: "Astme logaritm", valem: "\\log_a x^k=k\\log_a x" },
      {
        silt: "Aluse vahetamine",
        valem: "\\log_a x=\\dfrac{\\log_b x}{\\log_b a}",
      },
    ],
  },
  {
    pealkiri: "Trigonomeetria",
    read: [
      { silt: "Põhiseos", valem: "\\sin^2\\alpha+\\cos^2\\alpha=1" },
      { silt: "Tangens ja kotangens", valem: "\\tg\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}\\qquad \\ctg\\alpha=\\dfrac{\\cos\\alpha}{\\sin\\alpha}" },
      {
        silt: "Summa siinus/koosinus",
        valem:
          "\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta",
      },
      {
        silt: "",
        valem:
          "\\cos(\\alpha\\pm\\beta)=\\cos\\alpha\\cos\\beta\\mp\\sin\\alpha\\sin\\beta",
      },
      {
        silt: "Kahekordne nurk",
        valem: "\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha",
      },
      {
        silt: "",
        valem: "\\cos2\\alpha=\\cos^2\\alpha-\\sin^2\\alpha",
      },
      {
        silt: "Siinusteoreem",
        valem:
          "\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R",
      },
      {
        silt: "Koosinusteoreem",
        valem: "c^2=a^2+b^2-2ab\\cos C",
      },
      {
        silt: "Kolmnurga pindala",
        valem: "S=\\dfrac12 ab\\sin C",
      },
      {
        silt: "Kaare pikkus, sektori pindala",
        valem: "l=r\\alpha \\qquad S=\\dfrac12 r^2\\alpha",
        markus: "α radiaanides",
      },
    ],
  },
  {
    pealkiri: "Vektor tasandil ja joone võrrand",
    read: [
      {
        silt: "Kahe punkti vaheline kaugus",
        valem: "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
      },
      {
        silt: "Lõigu keskpunkt",
        valem: "M=\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)",
      },
      { silt: "Vektori pikkus", valem: "|\\vec a|=\\sqrt{a_x^2+a_y^2}" },
      {
        silt: "Skalaarkorrutis",
        valem: "\\vec a\\cdot\\vec b=a_xb_x+a_yb_y=|\\vec a||\\vec b|\\cos\\varphi",
      },
      { silt: "Sirge tõusuga", valem: "y=kx+b" },
      { silt: "Sirge üldvõrrand", valem: "Ax+By+C=0" },
      {
        silt: "Kahe sirge nurk",
        valem: "\\tg\\varphi=\\left|\\dfrac{k_2-k_1}{1+k_1k_2}\\right|",
      },
      { silt: "Ringjoone võrrand", valem: "(x-a)^2+(y-b)^2=r^2" },
    ],
  },
  {
    pealkiri: "Sirge ja tasand ruumis",
    read: [
      {
        silt: "Vektori pikkus ruumis",
        valem: "|\\vec a|=\\sqrt{a_x^2+a_y^2+a_z^2}",
      },
      {
        silt: "Skalaarkorrutis ruumis",
        valem: "\\vec a\\cdot\\vec b=a_xb_x+a_yb_y+a_zb_z",
      },
      { silt: "Tasandi võrrand", valem: "Ax+By+Cz+D=0" },
      {
        silt: "Nurk kahe vektori vahel",
        valem: "\\cos\\varphi=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}",
      },
    ],
  },
  {
    pealkiri: "Funktsioonid ja arvjadad",
    read: [
      {
        silt: "Aritmeetilise jada üldliige",
        valem: "a_n=a_1+(n-1)d",
      },
      {
        silt: "Aritmeetilise jada summa",
        valem: "S_n=\\dfrac{n}{2}(a_1+a_n)",
      },
      {
        silt: "Geomeetrilise jada üldliige",
        valem: "a_n=a_1q^{n-1}",
      },
      {
        silt: "Geomeetrilise jada summa",
        valem: "S_n=\\dfrac{a_1(q^n-1)}{q-1}",
      },
      {
        silt: "Hääbuva jada summa",
        valem: "S=\\dfrac{a_1}{1-q}",
        markus: "|q|<1",
      },
    ],
  },
  {
    pealkiri: "Tuletis",
    read: [
      { silt: "", valem: "(x^n)'=nx^{n-1}" },
      { silt: "", valem: "(\\sin x)'=\\cos x \\qquad (\\cos x)'=-\\sin x" },
      { silt: "", valem: "(\\tg x)'=\\dfrac{1}{\\cos^2 x}" },
      { silt: "", valem: "(e^x)'=e^x \\qquad (a^x)'=a^x\\ln a" },
      { silt: "", valem: "(\\ln x)'=\\dfrac1x \\qquad (\\log_a x)'=\\dfrac{1}{x\\ln a}" },
      { silt: "Korrutise tuletis", valem: "(uv)'=u'v+uv'" },
      {
        silt: "Jagatise tuletis",
        valem: "\\left(\\dfrac{u}{v}\\right)'=\\dfrac{u'v-uv'}{v^2}",
      },
      {
        silt: "Liitfunktsiooni tuletis",
        valem: "\\big(f(g(x))\\big)'=f'(g(x))\\cdot g'(x)",
      },
      {
        silt: "Puutuja võrrand",
        valem: "y=f(a)+f'(a)(x-a)",
      },
    ],
  },
  {
    pealkiri: "Integraal",
    read: [
      { silt: "", valem: "\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C \\quad (n\\ne-1)" },
      { silt: "", valem: "\\int \\sin x\\,dx=-\\cos x+C \\qquad \\int \\cos x\\,dx=\\sin x+C" },
      { silt: "", valem: "\\int e^x\\,dx=e^x+C \\qquad \\int \\dfrac1x\\,dx=\\ln|x|+C" },
      {
        silt: "Newton-Leibnizi valem",
        valem: "\\int_a^b f(x)\\,dx=F(b)-F(a)",
      },
      {
        silt: "Pöördkeha ruumala",
        valem: "V=\\pi\\int_a^b [f(x)]^2\\,dx",
      },
    ],
  },
  {
    pealkiri: "Planimeetria",
    read: [
      { silt: "Pythagorase teoreem", valem: "a^2+b^2=c^2" },
      {
        silt: "Kolmnurga pindala (alus-kõrgus)",
        valem: "S=\\dfrac12 ah",
      },
      {
        silt: "Kolmnurga pindala (Heroni valem)",
        valem: "S=\\sqrt{p(p-a)(p-b)(p-c)}",
        markus: "p — poolümbermõõt",
      },
      { silt: "Ringi pindala, ringjoone pikkus", valem: "S=\\pi r^2 \\qquad l=2\\pi r" },
      {
        silt: "Kumera hulknurga sisenurkade summa",
        valem: "(n-2)\\cdot 180^\\circ",
      },
      {
        silt: "Trapetsi pindala",
        valem: "S=\\dfrac{a+b}{2}h",
      },
    ],
  },
  {
    pealkiri: "Stereomeetria",
    read: [
      { silt: "Prisma", valem: "V=S_p h" },
      { silt: "Püramiid", valem: "V=\\dfrac13 S_p h" },
      { silt: "Silinder", valem: "V=\\pi r^2h \\qquad S=2\\pi r^2+2\\pi rh" },
      { silt: "Koonus", valem: "V=\\dfrac13\\pi r^2h" },
      { silt: "Kera", valem: "V=\\dfrac43\\pi r^3 \\qquad S=4\\pi r^2" },
    ],
  },
  {
    pealkiri: "Tõenäosus ja statistika",
    read: [
      { silt: "Permutatsioonid", valem: "P_n=n!" },
      {
        silt: "Kombinatsioonid",
        valem: "\\binom{n}{k}=\\dfrac{n!}{k!(n-k)!}",
      },
      { silt: "Klassikaline tõenäosus", valem: "P(A)=\\dfrac{m}{n}" },
      {
        silt: "Bernoulli valem",
        valem: "P_n(k)=\\binom{n}{k}p^k(1-p)^{n-k}",
      },
      {
        silt: "Keskväärtus",
        valem: "\\bar x=\\dfrac{1}{n}\\sum_{i=1}^n x_i",
      },
      {
        silt: "Standardhälve",
        valem: "\\sigma=\\sqrt{\\dfrac1n\\sum_{i=1}^n(x_i-\\bar x)^2}",
      },
    ],
  },
];
