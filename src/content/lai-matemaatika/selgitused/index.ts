import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";
import { selgitused as eeldusteSelgitused } from "./eeldused";
import { selgitused as kursus01Selgitused } from "./kursus-01";
import { selgitused as kursus02Selgitused } from "./kursus-02";
import { selgitused as kursus03Selgitused } from "./kursus-03";
import { selgitused as kursus04Selgitused } from "./kursus-04";
import { selgitused as kursus05Selgitused } from "./kursus-05";
import { selgitused as kursus07Selgitused } from "./kursus-07";
import { selgitused as kursus08Selgitused } from "./kursus-08";
import { selgitused as kursus09Selgitused } from "./kursus-09";
import { selgitused as kursus10Selgitused } from "./kursus-10";
import { selgitused as kursus11Selgitused } from "./kursus-11";

/**
 * Per-topic explanation content, keyed by topic id. Split into one sibling
 * file per course (or the E-series), re-exported and merged here — content
 * ships add entries as they go, never deleting a topic's entry.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  ...eeldusteSelgitused,
  ...kursus01Selgitused,
  ...kursus02Selgitused,
  ...kursus03Selgitused,
  ...kursus04Selgitused,
  ...kursus05Selgitused,
  ...kursus07Selgitused,
  ...kursus08Selgitused,
  ...kursus09Selgitused,
  ...kursus10Selgitused,
  ...kursus11Selgitused,
};
