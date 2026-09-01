import { getFlag } from "@/lib/flags";
import { NAV_ITEMS, type NavItem } from "./nav-items";

export function visibleNavItems(): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.flag || getFlag(item.flag));
}
