import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Per-topic explanation content, keyed by topic id. Empty until Ship 1.8
 * (prerequisites + course one) starts authoring; content ships add entries
 * here (or split across sibling files re-exported from this module) as
 * they go — never delete a topic's entry, only add or edit one.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {};
