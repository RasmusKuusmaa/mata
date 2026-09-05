import { redirect } from "next/navigation";
import { getFlag } from "@/lib/flags";
import { getCurrentUserId } from "@/lib/session/user";
import { Kodu } from "./Kodu";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!getFlag("kontosusteem")) redirect("/lai-matemaatika/teemad");

  const userId = await getCurrentUserId();
  return <Kodu userId={userId} />;
}
