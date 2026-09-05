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
      // `pb-[env(safe-area-inset-bottom)]` keeps the labels clear of the
      // iPhone home indicator, which otherwise overlaps the bottom row.
      className="fixed inset-x-0 bottom-0 z-10 flex border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex min-h-12 flex-1 items-center justify-center px-2 py-3 text-center text-sm font-medium transition-colors ${
              active
                ? "text-accent after:absolute after:inset-x-4 after:top-0 after:h-0.5 after:bg-accent"
                : "text-foreground/70"
            }`}
          >
            {t(item.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
