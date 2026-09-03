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

function extractGeneraatorid(mod: Record<string, unknown>): Generaator[] {
  const found: Generaator[] = [];
  for (const exported of Object.values(mod)) {
    if (isGeneraator(exported)) {
      found.push(exported);
    } else if (Array.isArray(exported)) {
      found.push(...exported.filter(isGeneraator));
    }
  }
  return found;
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
 * Walks `<root>/<aine>/kursus-NN/*.ts` on the real filesystem and
 * `import()`s each file by its absolute path. This only works under a
 * runtime that can load `.ts` files directly (vitest, tsx) — Next.js's
 * bundler never sees a purely-dynamic `import()` built from a runtime
 * string, so it can't trace or transpile the target, and plain Node's ESM
 * loader has no idea what a `.ts` extension is. Test-only for that reason;
 * see `discoverGenerators` for the app's actual path.
 */
async function discoverGeneratorsFromFilesystem(
  root: string,
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
        found.push(...extractGeneraatorid(mod));
      }
    }
  }

  return found;
}

/**
 * Every generator dropped under `src/generators/<aine>/kursus-NN/`,
 * exporting a `Generaator` (or an array of them) from any top-level
 * binding — no central list to edit.
 *
 * Called with no `root` (the app's real path, always): resolves through
 * `generated-index.ts`, a static-import module `scripts/
 * generate-registry-index.ts` regenerates from the same directory scan
 * before every `dev`/`build`/`check` (see package.json). Static imports
 * are what let Next.js's bundler actually include these files in the
 * server bundle — a runtime filesystem scan plus dynamic `import()` of a
 * raw `.ts` path (this module's old approach) throws
 * `ERR_UNKNOWN_FILE_EXTENSION` the moment it runs inside Next.js, in dev
 * or deployed.
 *
 * Called with an explicit `root` (tests only, e.g. the fixtures
 * directory): falls back to the filesystem-scanning path above, which
 * vitest's own `.ts`-aware transform handles fine.
 */
export async function discoverGenerators(root?: string): Promise<Generaator[]> {
  if (root !== undefined) {
    return discoverGeneratorsFromFilesystem(root);
  }

  const { GENERATOR_MODULES } = await import("./generated-index");
  return GENERATOR_MODULES.flatMap((mod) => extractGeneraatorid(mod));
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

/** Re-exported so `generate-registry-index.ts` (and any other future
 * codegen) can reuse the same discovery constants without duplicating
 * them. */
export { DEFAULT_ROOT, COURSE_DIR_PATTERN, listDirs, listGeneratorFiles };
