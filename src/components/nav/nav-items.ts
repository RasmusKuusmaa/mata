import type { FlagName } from "@/lib/flags";
import type { TranslationKey } from "@/lib/i18n";

export type NavItem = {
  labelKey: TranslationKey;
  href: string;
  flag?: FlagName;
};

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.teemad", href: "/lai-matemaatika/teemad" },
  { labelKey: "nav.teekaart", href: "/lai-matemaatika/teekaart" },
  { labelKey: "nav.harjuta", href: "/lai-matemaatika/harjuta" },
  { labelKey: "nav.kalender", href: "/kalender" },
  { labelKey: "nav.statistika", href: "/statistika" },
  { labelKey: "nav.eksamirezhiim", href: "/eksam" },
  { labelKey: "nav.markmed", href: "/markmed" },
  { labelKey: "nav.valemileht", href: "/valemileht" },
  { labelKey: "nav.saavutused", href: "/saavutused" },
  { labelKey: "nav.sobrad", href: "/sobrad" },
  { labelKey: "nav.konto", href: "/konto" },
];
