import { KulastajaKodu } from "./KulastajaKodu";

export const dynamic = "force-dynamic";

/**
 * Decides between the signed-in dashboard and the guest marketing page.
 * Dynamically imports both the session check and the signed-in dashboard
 * so a route that only needs the guest path (like this file's own render
 * test, see `KulastajaKodu.tsx`) never has to load next-auth.
 */
export default async function Home() {
  const { getCurrentUserId } = await import("@/lib/session/user");
  const userId = await getCurrentUserId();
  if (userId) {
    const { SisseloginudKodu } = await import("./SisseloginudKodu");
    return <SisseloginudKodu userId={userId} />;
  }
  return <KulastajaKodu />;
}
