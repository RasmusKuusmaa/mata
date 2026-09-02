import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";
import { selgitused as eeldusteSelgitused } from "./eeldused";

/**
 * Per-topic explanation content, keyed by topic id. Split into one sibling
 * file per course (or the E-series), re-exported and merged here — content
 * ships add entries as they go, never deleting a topic's entry.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  ...eeldusteSelgitused,
};
