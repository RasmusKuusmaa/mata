import { getCurrentUserId } from "@/lib/session/user";
import { Kodu } from "./Kodu";

export const dynamic = "force-dynamic";

export default async function Home() {
  const userId = await getCurrentUserId();
  return <Kodu userId={userId} />;
}
