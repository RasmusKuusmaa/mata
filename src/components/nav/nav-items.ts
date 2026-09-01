import type { FlagName } from "@/lib/flags";

export type NavItem = {
  label: string;
  href: string;
  flag?: FlagName;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Teemad", href: "/lai-matemaatika/teemad" },
  { label: "Harjuta", href: "/lai-matemaatika/harjuta" },
  { label: "Kalender", href: "/kalender", flag: "kalender" },
  { label: "Statistika", href: "/statistika", flag: "statistika" },
  { label: "Eksamirežiim", href: "/eksam", flag: "eksamirezhiim" },
  { label: "Märkmed", href: "/markmed", flag: "markmed" },
];
