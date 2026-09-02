import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Raskus, TeemaId } from "@/content/types";
import type { Generaator } from "./types";

const DEFAULT_ROOT = path.join(process.cwd(), "src/generators");
const COURSE_DIR_PATTERN = /^kursus-\d{2}$/;

function isGeneraator(value: unknown): value is Generaator {
  return (
    typeof value === "object" &&
    value !== null &&
    "aine" in value &&
    "teemaId" in value &&
    "raskus" in value &&
    typeof (value as Generaator).genereeri === "function"
  );
}

function listDirs(dir: string): string[] {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function listGeneratorFiles(dir: string): string[] {
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.tsx?$/.test(entry.name) &&
          !/\.test\.tsx?$/.test(entry.name),
      )
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

/**
 * Every generator found under `<root>/<aine>/kursus-NN/*.ts` — dropping a
 * file there, exporting a `Generaator` (or an array of them) from any of
 * its top-level bindings, registers it. No central list to edit.
 *
 * Node-only: walks the real filesystem and `import()`s each module by its
 * absolute path. Generators only ever run server-side (never shipped to
 * the client), so this must only be called from server code.
 */
export async function discoverGenerators(
  root: string = DEFAULT_ROOT,
): Promise<Generaator[]> {
  const found: Generaator[] = [];

  for (const aine of listDirs(root)) {
    const aineDir = path.join(root, aine);
    for (const kursusDir of listDirs(aineDir).filter((name) =>
      COURSE_DIR_PATTERN.test(name),
    )) {
      const kursusPath = path.join(aineDir, kursusDir);
      for (const file of listGeneratorFiles(kursusPath)) {
        const moduleUrl = pathToFileURL(path.join(kursusPath, file)).href;
        const mod: Record<string, unknown> =
          await import(/* webpackIgnore: true */ moduleUrl);
        for (const exported of Object.values(mod)) {
          if (isGeneraator(exported)) {
            found.push(exported);
          } else if (Array.isArray(exported)) {
            found.push(...exported.filter(isGeneraator));
          }
        }
      }
    }
  }

  return found;
}

function difficultyKey(teemaId: TeemaId, raskus: Raskus): string {
  return `${teemaId}:${raskus}`;
}

export type GeneratorRegistry = {
  generators: Generaator[];
  byTeema: Map<TeemaId, Generaator[]>;
  byDifficulty: Map<string, Generaator[]>;
};

/** Indexes already-discovered generators by topic and by topic+difficulty. */
export function indexGenerators(generators: Generaator[]): GeneratorRegistry {
  const byTeema = new Map<TeemaId, Generaator[]>();
  const byDifficulty = new Map<string, Generaator[]>();

  for (const generator of generators) {
    const teemaList = byTeema.get(generator.teemaId) ?? [];
    teemaList.push(generator);
    byTeema.set(generator.teemaId, teemaList);

    const key = difficultyKey(generator.teemaId, generator.raskus);
    const difficultyList = byDifficulty.get(key) ?? [];
    difficultyList.push(generator);
    byDifficulty.set(key, difficultyList);
  }

  return { generators, byTeema, byDifficulty };
}

export function forTeema(
  registry: GeneratorRegistry,
  teemaId: TeemaId,
): Generaator[] {
  return registry.byTeema.get(teemaId) ?? [];
}

export function forDifficulty(
  registry: GeneratorRegistry,
  teemaId: TeemaId,
  raskus: Raskus,
): Generaator[] {
  return registry.byDifficulty.get(difficultyKey(teemaId, raskus)) ?? [];
}

/** Discovers and indexes in one call — the common entry point. */
export async function buildRegistry(
  root?: string,
): Promise<GeneratorRegistry> {
  return indexGenerators(await discoverGenerators(root));
}
