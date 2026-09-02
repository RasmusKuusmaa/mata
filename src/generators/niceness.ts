import katex from "katex";
import { MACROS } from "@/components/math/macros";
import { vastusIsNice } from "./nice";
import type { Ulesanne } from "./types";

const FORBIDDEN_TOKENS = ["NaN", "Infinity", "undefined"] as const;
const NEGATIVE_ZERO_PATTERN = /(?<!\d)-0(?![\d,])/;
const RAW_DECIMAL_POINT_PATTERN = /\d\.\d/;

/** Every rendered string of an `Ulesanne`: the question, each solution
 * step, and the hint, if there is one. */
function renderedStrings(ulesanne: Ulesanne): { label: string; text: string }[] {
  const strings = [
    { label: "kysimus", text: ulesanne.kysimus },
    ...ulesanne.lahendus.map((text, i) => ({
      label: `lahendus[${i}]`,
      text,
    })),
  ];
  if (ulesanne.vihje !== undefined) {
    strings.push({ label: "vihje", text: ulesanne.vihje });
  }
  return strings;
}

function checkString(label: string, text: string): string[] {
  const problems: string[] = [];

  if (text.length === 0) {
    problems.push(`${label} is empty`);
    return problems;
  }

  for (const token of FORBIDDEN_TOKENS) {
    if (text.includes(token)) {
      problems.push(`${label} contains "${token}": ${text}`);
    }
  }

  if (NEGATIVE_ZERO_PATTERN.test(text)) {
    problems.push(`${label} contains a raw "-0": ${text}`);
  }

  if (RAW_DECIMAL_POINT_PATTERN.test(text)) {
    problems.push(`${label} contains a raw decimal point: ${text}`);
  }

  try {
    katex.renderToString(text, {
      throwOnError: true,
      strict: false,
      macros: MACROS,
    });
  } catch (error) {
    problems.push(`${label} is not valid LaTeX: ${text} (${error})`);
  }

  return problems;
}

/**
 * Every check Ship 0.24 names, run against one generated `Ulesanne`.
 * Returns an empty array when everything's nice.
 */
export function checkUlesanne(ulesanne: Ulesanne): string[] {
  const problems: string[] = [];

  if (!vastusIsNice(ulesanne.vastus)) {
    problems.push(`answer is not nice: ${JSON.stringify(ulesanne.vastus)}`);
  }

  if (ulesanne.lahendus.length === 0) {
    problems.push("lahendus is empty");
  }

  for (const { label, text } of renderedStrings(ulesanne)) {
    problems.push(...checkString(label, text));
  }

  if (ulesanne.vastus.tuup === "valik") {
    const { oige, eksitajad } = ulesanne.vastus;
    if (new Set(eksitajad).size !== eksitajad.length) {
      problems.push(`valik eksitajad are not unique: ${eksitajad.join(", ")}`);
    }
    if (eksitajad.includes(oige)) {
      problems.push(`valik eksitajad contain the correct answer: ${oige}`);
    }
  }

  return problems;
}
