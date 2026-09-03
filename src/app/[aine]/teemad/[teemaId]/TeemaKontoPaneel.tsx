"use client";

import { useEffect, useRef, useState } from "react";
import type { TeemaId } from "@/content/types";
import { t } from "@/lib/i18n";
import {
  getTeemaKasutajaAndmed,
  lulitaKordamine,
  salvestaMarkmed,
} from "./actions";

const SALVESTAMISE_VIIDE_MS = 800;

/** Everything on the topic page that's personal to a signed-in user — the
 * "vajab kordamist" toggle and the notes panel. Client-fetched on mount
 * rather than folded into the page's own server component so the page
 * itself stays statically generatable (`generateStaticParams`) even though
 * this part is per-user. Renders nothing for a guest rather than a broken
 * form — signing in is one click away via the nav. */
export function TeemaKontoPaneel({ teemaId }: { teemaId: TeemaId }) {
  const [andmed, setAndmed] = useState<{
    manualReview: boolean;
    sisu: string;
  } | null>();
  const [salvestusSeis, setSalvestusSeis] = useState<
    "jõude" | "salvestamas" | "salvestatud"
  >("jõude");
  const ajastiRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let tuhistatud = false;
    getTeemaKasutajaAndmed(teemaId).then((tulemus) => {
      if (!tuhistatud) setAndmed(tulemus);
    });
    return () => {
      tuhistatud = true;
    };
  }, [teemaId]);

  if (andmed === undefined) return null; // still loading
  if (andmed === null) {
    return (
      <p className="mt-6 text-xs text-foreground/50">
        {t("teema.markmedLogiSisseKoht")}
      </p>
    );
  }

  function vahetaKordamine() {
    const uusVaartus = !andmed!.manualReview;
    setAndmed({ ...andmed!, manualReview: uusVaartus });
    void lulitaKordamine(teemaId, uusVaartus);
  }

  function muudaMarkmeid(sisu: string) {
    setAndmed({ ...andmed!, sisu });
    setSalvestusSeis("salvestamas");
    if (ajastiRef.current) clearTimeout(ajastiRef.current);
    ajastiRef.current = setTimeout(() => {
      void salvestaMarkmed(teemaId, sisu).then(() =>
        setSalvestusSeis("salvestatud"),
      );
    }, SALVESTAMISE_VIIDE_MS);
  }

  return (
    <section className="mt-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={andmed.manualReview}
          onChange={vahetaKordamine}
          className="h-4 w-4 rounded border-border"
        />
        <span className="font-medium">{t("teema.vajabKordamist")}</span>
      </label>
      <p className="mt-1 text-xs text-foreground/50">
        {t("teema.vajabKordamistSelgitus")}
      </p>

      <h2 className="mt-6 font-display text-lg font-semibold">
        {t("teema.markmedPealkiri")}
      </h2>
      <textarea
        value={andmed.sisu}
        onChange={(event) => muudaMarkmeid(event.target.value)}
        placeholder={t("teema.markmedKoht")}
        rows={5}
        className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      />
      {salvestusSeis !== "jõude" && (
        <p className="mt-1 text-xs text-foreground/50">
          {salvestusSeis === "salvestamas"
            ? t("teema.markmedSalvestamine")
            : t("teema.markmedSalvestatud")}
        </p>
      )}
    </section>
  );
}
