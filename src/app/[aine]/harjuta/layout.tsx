import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getFlag } from "@/lib/flags";

/** Guards `/[aine]/harjuta` and every sub-route (custom test builder,
 * a topic's practice session, daily review) behind the `kontosusteem`
 * flag in one place, rather than repeating the check in each page. */
export default function HarjutaLayout({ children }: { children: ReactNode }) {
  if (!getFlag("kontosusteem")) notFound();
  return children;
}
