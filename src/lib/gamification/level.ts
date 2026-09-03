/**
 * Levels from cumulative XP on a sub-linear curve (todo.md Ship 4.10) — each
 * level costs more than the last, so early levels come quickly (rewarding a
 * new learner fast) while the curve flattens later rather than requiring
 * ever-larger jumps.
 *
 * Level `n` starts at `50 * (n - 1)^2` XP: level 1 at 0, level 2 at 50,
 * level 3 at 200, level 4 at 450, and so on.
 */
const XP_KORDAJA = 50;

export function xpTasemeAlguseks(tase: number): number {
  return XP_KORDAJA * (tase - 1) ** 2;
}

export function tasemeleXp(xp: number): number {
  if (xp <= 0) return 1;
  return 1 + Math.floor(Math.sqrt(xp / XP_KORDAJA));
}

/** XP still needed to reach the next level from `xp`. */
export function jargmiseTasemeniXp(xp: number): number {
  const praegune = tasemeleXp(xp);
  return xpTasemeAlguseks(praegune + 1) - xp;
}
