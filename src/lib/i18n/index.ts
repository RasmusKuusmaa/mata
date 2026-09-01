import { et } from "./et";

/**
 * The exam is also published in Ukrainian, so a second locale is a plausible
 * future rather than a hypothetical. Extend this union and `CATALOGUES` when
 * a new locale's catalogue file (e.g. `uk.ts`) lands — no other call site
 * needs to change.
 */
export type Locale = "et";

export type TranslationKey = keyof typeof et;

const CATALOGUES: Record<Locale, Record<TranslationKey, string>> = { et };

const DEFAULT_LOCALE: Locale = "et";

const SUPPORTED_LOCALES: readonly Locale[] = ["et"];

export function resolveLocale(requested?: string | null): Locale {
  if (
    requested &&
    (SUPPORTED_LOCALES as readonly string[]).includes(requested)
  ) {
    return requested as Locale;
  }
  return DEFAULT_LOCALE;
}

export function t(
  key: TranslationKey,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return CATALOGUES[locale][key];
}
