export type Punkt = { x: number; y: number };

export type JoonisElement =
  | { tuup: "loik"; a: Punkt; b: Punkt }
  | { tuup: "punkt"; koht: Punkt; silt?: string }
  | {
      tuup: "nurgakaar";
      tipp: Punkt;
      a: Punkt;
      b: Punkt;
      raadius?: number;
      silt?: string;
    }
  | { tuup: "taisnurk"; tipp: Punkt; a: Punkt; b: Punkt; suurus?: number }
  | { tuup: "silt"; koht: Punkt; tekst: string };

export type JoonisProps = {
  elemendid: JoonisElement[];
  laius?: number;
  korgus?: number;
  /** Padding around the content's bounding box, in math units. */
  padding?: number;
};

const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 240;
const DEFAULT_PADDING = 1;

// Every other size defaults to a fraction of the figure's bounding box, so
// a figure spanning 0-10 and one spanning 0-1000 both look proportioned —
// callers only need to think in their own math units.
const STROKE_WIDTH_FRACTION = 0.004;
const POINT_RADIUS_FRACTION = 0.012;
const ARC_RADIUS_FRACTION = 0.12;
const RIGHT_ANGLE_SIZE_FRACTION = 0.07;
const LABEL_OFFSET_FRACTION = 0.05;
const FONT_SIZE_FRACTION = 0.1;

/** Kills float noise (e.g. `Math.cos(-Math.PI / 2)` isn't quite 0) so
 * rendered coordinates and path strings never carry a stray `1e-17`. */
function round(value: number): number {
  return Math.round(value * 1e6) / 1e6;
}

function roundPoint(p: Punkt): Punkt {
  return { x: round(p.x), y: round(p.y) };
}

function toSvg(p: Punkt): Punkt {
  // Math coordinates have y pointing up; SVG's y points down. Flipping
  // once here means every other function works in plain math coordinates.
  return roundPoint({ x: p.x, y: -p.y });
}

function subtract(a: Punkt, b: Punkt): Punkt {
  return { x: a.x - b.x, y: a.y - b.y };
}

function length(v: Punkt): number {
  return Math.hypot(v.x, v.y);
}

function normalize(v: Punkt): Punkt {
  const len = length(v);
  if (len === 0) {
    throw new Error("Joonis: cannot orient a mark at two coincident points");
  }
  return { x: v.x / len, y: v.y / len };
}

function angleOf(v: Punkt): number {
  return Math.atan2(v.y, v.x);
}

/** Every point an element references, already in svg (y-flipped) space. */
function elementPoints(el: JoonisElement): Punkt[] {
  switch (el.tuup) {
    case "loik":
      return [toSvg(el.a), toSvg(el.b)];
    case "punkt":
      return [toSvg(el.koht)];
    case "nurgakaar":
    case "taisnurk":
      return [toSvg(el.tipp), toSvg(el.a), toSvg(el.b)];
    case "silt":
      return [toSvg(el.koht)];
  }
}

type Box = { minX: number; minY: number; width: number; height: number };

function boundingBox(elemendid: JoonisElement[], padding: number): Box {
  const points = elemendid.flatMap(elementPoints);
  if (points.length === 0) {
    return {
      minX: -padding,
      minY: -padding,
      width: padding * 2,
      height: padding * 2,
    };
  }
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs) - padding;
  const maxX = Math.max(...xs) + padding;
  const minY = Math.min(...ys) - padding;
  const maxY = Math.max(...ys) + padding;
  return { minX, minY, width: maxX - minX, height: maxY - minY };
}

function renderLoik(
  el: Extract<JoonisElement, { tuup: "loik" }>,
  unit: number,
  key: number,
) {
  const a = toSvg(el.a);
  const b = toSvg(el.b);
  return (
    <line
      key={key}
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke="currentColor"
      strokeWidth={unit * STROKE_WIDTH_FRACTION}
    />
  );
}

function renderPunkt(
  el: Extract<JoonisElement, { tuup: "punkt" }>,
  unit: number,
  key: number,
) {
  const p = toSvg(el.koht);
  const offset = unit * LABEL_OFFSET_FRACTION;
  return (
    <g key={key}>
      <circle cx={p.x} cy={p.y} r={unit * POINT_RADIUS_FRACTION} fill="currentColor" />
      {el.silt !== undefined && (
        <text
          x={p.x + offset}
          y={p.y - offset}
          fontSize={unit * FONT_SIZE_FRACTION}
          fill="currentColor"
        >
          {el.silt}
        </text>
      )}
    </g>
  );
}

/** The shorter (interior) signed angle from `angleA` to `angleB`, in (-π, π]. */
function shortestDelta(angleA: number, angleB: number): number {
  let delta = angleB - angleA;
  while (delta <= -Math.PI) delta += 2 * Math.PI;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  return delta;
}

function renderNurgakaar(
  el: Extract<JoonisElement, { tuup: "nurgakaar" }>,
  unit: number,
  key: number,
) {
  const tipp = toSvg(el.tipp);
  const a = toSvg(el.a);
  const b = toSvg(el.b);
  const raadius = el.raadius ?? unit * ARC_RADIUS_FRACTION;

  const angleA = angleOf(subtract(a, tipp));
  const angleB = angleOf(subtract(b, tipp));
  const delta = shortestDelta(angleA, angleB);
  const sweepFlag = delta >= 0 ? 1 : 0;

  const start = roundPoint({
    x: tipp.x + raadius * Math.cos(angleA),
    y: tipp.y + raadius * Math.sin(angleA),
  });
  const end = roundPoint({
    x: tipp.x + raadius * Math.cos(angleA + delta),
    y: tipp.y + raadius * Math.sin(angleA + delta),
  });

  const path = `M ${start.x} ${start.y} A ${round(raadius)} ${round(raadius)} 0 0 ${sweepFlag} ${end.x} ${end.y}`;

  const midAngle = angleA + delta / 2;
  const labelRadius = raadius + unit * LABEL_OFFSET_FRACTION;
  const labelPos = roundPoint({
    x: tipp.x + labelRadius * Math.cos(midAngle),
    y: tipp.y + labelRadius * Math.sin(midAngle),
  });

  return (
    <g key={key}>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={unit * STROKE_WIDTH_FRACTION}
      />
      {el.silt !== undefined && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize={unit * FONT_SIZE_FRACTION}
          fill="currentColor"
          textAnchor="middle"
        >
          {el.silt}
        </text>
      )}
    </g>
  );
}

function renderTaisnurk(
  el: Extract<JoonisElement, { tuup: "taisnurk" }>,
  unit: number,
  key: number,
) {
  const tipp = toSvg(el.tipp);
  const a = toSvg(el.a);
  const b = toSvg(el.b);
  const suurus = el.suurus ?? unit * RIGHT_ANGLE_SIZE_FRACTION;

  const u1 = normalize(subtract(a, tipp));
  const u2 = normalize(subtract(b, tipp));

  const p1 = roundPoint({ x: tipp.x + suurus * u1.x, y: tipp.y + suurus * u1.y });
  const corner = roundPoint({ x: p1.x + suurus * u2.x, y: p1.y + suurus * u2.y });
  const p2 = roundPoint({ x: tipp.x + suurus * u2.x, y: tipp.y + suurus * u2.y });

  const path = `M ${p1.x} ${p1.y} L ${corner.x} ${corner.y} L ${p2.x} ${p2.y}`;

  return (
    <path
      key={key}
      d={path}
      fill="none"
      stroke="currentColor"
      strokeWidth={unit * STROKE_WIDTH_FRACTION}
    />
  );
}

function renderSilt(
  el: Extract<JoonisElement, { tuup: "silt" }>,
  unit: number,
  key: number,
) {
  const p = toSvg(el.koht);
  return (
    <text
      key={key}
      x={p.x}
      y={p.y}
      fontSize={unit * FONT_SIZE_FRACTION}
      fill="currentColor"
      textAnchor="middle"
    >
      {el.tekst}
    </text>
  );
}

function renderElement(el: JoonisElement, unit: number, key: number) {
  switch (el.tuup) {
    case "loik":
      return renderLoik(el, unit, key);
    case "punkt":
      return renderPunkt(el, unit, key);
    case "nurgakaar":
      return renderNurgakaar(el, unit, key);
    case "taisnurk":
      return renderTaisnurk(el, unit, key);
    case "silt":
      return renderSilt(el, unit, key);
  }
}

/**
 * Declarative SVG figure driven by the same math-space parameters as the
 * question it illustrates, so the figure and the numbers can never drift
 * apart. Elements are given in ordinary math coordinates (y up) — the
 * y-axis is flipped once, here.
 */
export function Joonis({
  elemendid,
  laius = DEFAULT_WIDTH,
  korgus = DEFAULT_HEIGHT,
  padding = DEFAULT_PADDING,
}: JoonisProps) {
  const box = boundingBox(elemendid, padding);
  const unit = Math.max(box.width, box.height);

  return (
    <svg
      viewBox={`${box.minX} ${box.minY} ${box.width} ${box.height}`}
      width={laius}
      height={korgus}
      role="img"
    >
      {elemendid.map((el, i) => renderElement(el, unit, i))}
    </svg>
  );
}
