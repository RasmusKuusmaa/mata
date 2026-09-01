/**
 * Estonian trigonometric notation. Estonian textbooks write tangent,
 * cotangent and arctangent as "tg", "ctg", "arctg" rather than the
 * "tan"/"cot"/"arctan" KaTeX ships by default.
 */
export const MACROS: Record<string, string> = {
  "\\tg": "\\operatorname{tg}",
  "\\ctg": "\\operatorname{ctg}",
  "\\arctg": "\\operatorname{arctg}",
};
