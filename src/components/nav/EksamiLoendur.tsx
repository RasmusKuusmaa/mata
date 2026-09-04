import { getEksamiKuupaev } from "@/app/konto/actions";
import { VAIKIMISI_EKSAMI_KUUPAEV } from "@/lib/gamification/countdown";
import { getCurrentUserId } from "@/lib/session/user";
import { EksamiLoendurClient } from "./EksamiLoendurClient";

/**
 * Resolves which exam date to count down to — the signed-in user's own
 * `/konto` date, or the default Harno date for guests and anyone who
 * hasn't set one — then hands off to the client component that actually
 * ticks. Rendered from `layout.tsx` so it's on every page.
 */
export async function EksamiLoendur() {
  const userId = await getCurrentUserId();
  const sihtpaev = userId
    ? ((await getEksamiKuupaev(userId)) ?? VAIKIMISI_EKSAMI_KUUPAEV)
    : VAIKIMISI_EKSAMI_KUUPAEV;

  return <EksamiLoendurClient sihtpaev={sihtpaev} />;
}
