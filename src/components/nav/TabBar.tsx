"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";
import { visibleNavItems } from "./visible-nav-items";

export function TabBar() {
  const pathname = usePathname();
  const items = visibleNavItems();

  return (
    <nav
      aria-label={t("nav.aria")}
      className="fixed inset-x-0 bottom-0 z-10 flex overflow-x-auto border-t border-border bg-surface md:hidden"
    >
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 px-3 py-2 text-center text-xs font-medium whitespace-nowrap ${
              active ? "text-accent" : "text-foreground/70"
            }`}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
