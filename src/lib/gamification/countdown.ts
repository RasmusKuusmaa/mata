/** Default exam date (todo.md Ship 4.5) — late April 2027, the Harno exam
 * period, used until a user sets their own in `/konto`. */
export const VAIKIMISI_EKSAMI_KUUPAEV = "2027-04-26";

/** Whole days from `now` to `eksamiKuupaev` (a `YYYY-MM-DD` string). Never
 * negative in the UI's eyes — a past date reports 0 rather than a
 * confusing negative countdown. */
export function paevaEksamini(
  eksamiKuupaev: string | null,
  now: Date = new Date(),
): number {
  const kuupaev = eksamiKuupaev ?? VAIKIMISI_EKSAMI_KUUPAEV;
  const tana = now.toISOString().slice(0, 10);
  const diff = Math.round(
    (Date.parse(`${kuupaev}T00:00:00Z`) - Date.parse(`${tana}T00:00:00Z`)) /
      86_400_000,
  );
  return Math.max(0, diff);
}
