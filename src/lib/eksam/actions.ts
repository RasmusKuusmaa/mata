"use server";

import { alustaEksam } from "./session";
import type { EksamiSeeria } from "./session";

/** Server action wrapping `alustaEksam` with production defaults — mirrors
 * `practice/actions.ts`'s `alustaSeeria` wrapper. Per-question grading
 * reuses `practice/actions.ts`'s existing `kontrolliVastust` unchanged: an
 * exam question is graded and recorded exactly like a practice one, just
 * scheduled and scored differently by the exam UI. */
export async function alustaEksamAction(): Promise<EksamiSeeria> {
  return alustaEksam();
}
