import type { TeemaId } from "./types";

/** The subset of Teema/Eeldusteema that the prerequisite graph needs. */
export type TeemaNode = {
  id: TeemaId;
  eeldused: TeemaId[];
};

export function buildIndex(teemad: TeemaNode[]): Map<TeemaId, TeemaNode> {
  return new Map(teemad.map((t) => [t.id, t]));
}

/**
 * Every prerequisite reachable from `id`, transitively, deepest first.
 * Cycle-safe: a topic already visited is never re-descended into, so a
 * cycle in the data (which shouldn't exist, but content is hand-authored)
 * terminates the walk instead of looping forever.
 */
export function getPrerequisiteChain(
  id: TeemaId,
  index: Map<TeemaId, TeemaNode>,
): TeemaId[] {
  const seen = new Set<TeemaId>();
  const chain: TeemaId[] = [];

  function visit(current: TeemaId) {
    const node = index.get(current);
    if (!node) return;
    for (const prereqId of node.eeldused) {
      if (seen.has(prereqId)) continue;
      seen.add(prereqId);
      visit(prereqId);
      chain.push(prereqId);
    }
  }

  visit(id);
  return chain;
}

/** Topics that directly declare `id` as a prerequisite. */
export function getDependents(
  id: TeemaId,
  index: Map<TeemaId, TeemaNode>,
): TeemaId[] {
  const dependents: TeemaId[] = [];
  for (const node of index.values()) {
    if (node.eeldused.includes(id)) dependents.push(node.id);
  }
  return dependents;
}
