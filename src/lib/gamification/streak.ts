/** Daily streak state, mirroring `userStats` (todo.md Ship 4.9). Dates are
 * `YYYY-MM-DD` strings — the caller decides the timezone once, at the
 * boundary, rather than this module reasoning about `Date` objects. */
export type StreakSeis = {
  streakCurrent: number;
  streakLongest: number;
  streakFreezesLeft: number;
  lastActiveDate: string | null;
};

const MAX_FREEZES = 1;

function paevadeVahe(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / msPerDay,
  );
}

/** ISO week key (`2027-W03`) a date falls in, for weekly freeze
 * replenishment — a plain ISO-8601 week-number computation, no library. */
function isoNadal(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - day + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDay = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3);
  const week =
    1 + Math.round((d.getTime() - firstThursday.getTime()) / (7 * 86400000));
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/**
 * Rolls a streak forward to `tana` given one more day of activity. Calling
 * this more than once for the same `tana` is a no-op (idempotent for
 * repeated activity on the same day). A one-day gap continues the streak; a
 * two-day gap consumes a weekly freeze if one is available (bridging the
 * missed day rather than resetting); anything else resets to a fresh
 * streak of 1. Freezes replenish to `MAX_FREEZES` at most once per ISO
 * week, the first time this function runs in a new week.
 */
export function markeeriTegevus(seis: StreakSeis, tana: string): StreakSeis {
  const freezesLeft =
    seis.lastActiveDate !== null &&
    isoNadal(seis.lastActiveDate) !== isoNadal(tana)
      ? MAX_FREEZES
      : seis.streakFreezesLeft;

  if (seis.lastActiveDate === tana) {
    return { ...seis, streakFreezesLeft: freezesLeft };
  }

  if (seis.lastActiveDate === null) {
    return {
      streakCurrent: 1,
      streakLongest: Math.max(1, seis.streakLongest),
      streakFreezesLeft: freezesLeft,
      lastActiveDate: tana,
    };
  }

  const vahe = paevadeVahe(seis.lastActiveDate, tana);

  if (vahe === 1) {
    const streakCurrent = seis.streakCurrent + 1;
    return {
      streakCurrent,
      streakLongest: Math.max(streakCurrent, seis.streakLongest),
      streakFreezesLeft: freezesLeft,
      lastActiveDate: tana,
    };
  }

  if (vahe === 2 && freezesLeft > 0) {
    const streakCurrent = seis.streakCurrent + 1;
    return {
      streakCurrent,
      streakLongest: Math.max(streakCurrent, seis.streakLongest),
      streakFreezesLeft: freezesLeft - 1,
      lastActiveDate: tana,
    };
  }

  return {
    streakCurrent: 1,
    streakLongest: seis.streakLongest,
    streakFreezesLeft: freezesLeft,
    lastActiveDate: tana,
  };
}

/** A fresh streak state for a user who has never been active. */
export const TYHI_STREAK: StreakSeis = {
  streakCurrent: 0,
  streakLongest: 0,
  streakFreezesLeft: MAX_FREEZES,
  lastActiveDate: null,
};
