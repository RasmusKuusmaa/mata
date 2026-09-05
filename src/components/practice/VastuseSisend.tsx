"use client";

import { t } from "@/lib/i18n";
import type { KlientVastuseTuup } from "@/lib/practice/session";

type Props = {
  vastuseTuup: KlientVastuseTuup;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Set once a `valik` question is graded, to highlight the correct
   * option — callers that never reveal correctness mid-flow (exam mode)
   * simply never pass this. */
  oigeVastus?: string;
  autoFocus?: boolean;
};

/** The answer-input widget for one question, shared by the immediate-
 * feedback practice flow (`HarjutusSessioon`) and the ungraded-until-the-end
 * exam flow (`EksamSessioon`) so both stay visually and behaviorally
 * consistent. */
export function VastuseSisend({
  vastuseTuup,
  value,
  onChange,
  disabled = false,
  oigeVastus,
  autoFocus = false,
}: Props) {
  if (vastuseTuup.tuup === "valik") {
    return (
      <div className="flex flex-col gap-2">
        {vastuseTuup.valikud.map((valik) => {
          const onOigeVastus = oigeVastus !== undefined && oigeVastus === valik;
          return (
            <button
              key={valik}
              type="button"
              disabled={disabled}
              onClick={() => onChange(valik)}
              className={`flex min-h-12 items-center rounded-md border px-4 py-3 text-left text-base transition-colors sm:text-sm ${
                onOigeVastus
                  ? "border-accent bg-accent/10"
                  : value === valik
                    ? "border-foreground/40 bg-surface"
                    : "border-border bg-surface hover:border-foreground/30"
              }`}
            >
              {valik}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <input
      type="text"
      autoFocus={autoFocus}
      inputMode={vastuseTuup.tuup === "hulk" ? "text" : "decimal"}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      placeholder={
        vastuseTuup.tuup === "hulk"
          ? t("harjuta.hulgiKoht")
          : t("harjuta.sisendKoht")
      }
      // `text-base` on mobile: iOS Safari zooms in on focus below 16px.
      className="w-full rounded-md border border-border bg-surface px-3 py-3 text-base sm:py-2 sm:text-sm"
    />
  );
}
