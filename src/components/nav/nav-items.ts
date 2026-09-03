import type { FlagName } from "@/lib/flags";
import type { TranslationKey } from "@/lib/i18n";

export type NavItem = {
  labelKey: TranslationKey;
  href: string;
  flag?: FlagName;
};

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.teemad", href: "/lai-matemaatika/teemad" },
  { labelKey: "nav.harjuta", href: "/lai-matemaatika/harjuta" },
  { labelKey: "nav.kalender", href: "/kalender", flag: "kalender" },
  { labelKey: "nav.statistika", href: "/statistika", flag: "statistika" },
  {
    labelKey: "nav.eksamirezhiim",
    href: "/eksam",
    flag: "eksamirezhiim",
  },
  { labelKey: "nav.markmed", href: "/markmed", flag: "markmed" },
  { labelKey: "nav.valemileht", href: "/valemileht" },
];
