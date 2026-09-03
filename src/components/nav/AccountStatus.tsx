import Image from "next/image";
import Link from "next/link";
import { logiValja } from "@/app/sisene/actions";
import { t } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/session/user";

/** Server component: signed-in name/avatar with a sign-out button, or a
 * sign-in link for a guest. Rendered as a child of the (client) `NavRail`
 * and `TabBar` so it works without either of them needing to know how
 * sessions work. */
export async function AccountStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/sisene"
        className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-border/50"
      >
        {t("konto.logiSisse")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm">
      {user.pilt ? (
        <Image
          src={user.pilt}
          alt=""
          width={24}
          height={24}
          className="rounded-full"
        />
      ) : (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
          {(user.nimi ?? "?").slice(0, 1).toUpperCase()}
        </span>
      )}
      <span className="flex-1 truncate">{user.nimi}</span>
      <form action={logiValja}>
        <button
          type="submit"
          className="text-xs text-foreground/60 hover:underline"
        >
          {t("konto.logiValja")}
        </button>
      </form>
    </div>
  );
}
