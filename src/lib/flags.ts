/**
 * Feature flags for trunk-based development.
 *
 * Everything not yet finished ships behind a flag here, defaulting to `false`
 * in production. Work happens on `main`; a flag lets an unfinished feature sit
 * in the shipped bundle without being reachable.
 *
 * DELETE-ON-LAUNCH RULE: when a flagged feature goes live, remove its entry
 * from `defaults` and its `FlagName` union member in the same commit that
 * flips it on. A flag that outlives its launch is dead weight — this file
 * should stay nearly empty by the end of the project (see Ship 6.7).
 *
 * Flags are read from `NEXT_PUBLIC_FLAG_<NAME>` env vars (`true`/`1` to
 * enable) so they can be toggled per-environment without a code change, and
 * are readable on both server and client since Next.js inlines
 * `NEXT_PUBLIC_*` vars at build time.
 */

import { useMemo } from "react";

export type FlagName = "statistika" | "eksamirezhiim";

const defaults: Record<FlagName, boolean> = {
  statistika: false,
  eksamirezhiim: false,
};

function readEnvFlag(name: FlagName): boolean | undefined {
  const raw = process.env[`NEXT_PUBLIC_FLAG_${name.toUpperCase()}`];
  if (raw === undefined) return undefined;
  return raw === "true" || raw === "1";
}

/** Server-side flag read. Also safe to call from client components. */
export function getFlag(name: FlagName): boolean {
  return readEnvFlag(name) ?? defaults[name];
}

/** Client-side flag read. Call only from a component's own render body. */
export function useFlag(name: FlagName): boolean {
  return useMemo(() => getFlag(name), [name]);
}
