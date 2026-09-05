import type { FlagName } from "@/lib/flags";
import type { TranslationKey } from "@/lib/i18n";

export type NavItem = {
  labelKey: TranslationKey;
  href: string;
  flag?: FlagName;
};

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.teemad", href: "/lai-matemaatika/teemad" },
  {
    labelKey: "nav.teekaart",
    href: "/lai-matemaatika/teekaart",
    flag: "kontosusteem",
  },
  {
    labelKey: "nav.harjuta",
    href: "/lai-matemaatika/harjuta",
    flag: "kontosusteem",
  },
  { labelKey: "nav.kalender", href: "/kalender", flag: "kontosusteem" },
  { labelKey: "nav.statistika", href: "/statistika", flag: "kontosusteem" },
  { labelKey: "nav.eksamirezhiim", href: "/eksam", flag: "kontosusteem" },
  { labelKey: "nav.markmed", href: "/markmed", flag: "kontosusteem" },
  { labelKey: "nav.valemileht", href: "/valemileht" },
  { labelKey: "nav.saavutused", href: "/saavutused", flag: "kontosusteem" },
  { labelKey: "nav.sobrad", href: "/sobrad", flag: "kontosusteem" },
  { labelKey: "nav.konto", href: "/konto", flag: "kontosusteem" },
];
