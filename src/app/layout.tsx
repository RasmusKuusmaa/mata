import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { AccountStatus } from "@/components/nav/AccountStatus";
import { NavRail } from "@/components/nav/NavRail";
import { OfflineBanner } from "@/components/nav/OfflineBanner";
import { TabBar } from "@/components/nav/TabBar";
import { t } from "@/lib/i18n";
import "katex/dist/katex.min.css";
import "./globals.css";

const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: { template: `%s · ${t("meta.title")}`, default: t("meta.title") },
  description: t("meta.description"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="et"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans md:flex-row">
        <NavRail account={<AccountStatus />} />
        <div className="flex flex-1 flex-col">
          <OfflineBanner />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
        </div>
        <TabBar />
      </body>
    </html>
  );
}
