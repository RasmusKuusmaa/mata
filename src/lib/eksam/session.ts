import { teemad as PARIS_TEEMAD } from "@/content/lai-matemaatika/teemad";
import type { Raskus, Teema, TeemaId } from "@/content/types";
import { buildRegistry, forDifficulty } from "@/generators/registry";
import { mulberry32 } from "@/generators/rng";
import type { Rng } from "@/generators/types";
import { alustaKohandatudSeeria } from "@/lib/practice/session";
import { EKSAMI_SLOTID, type EksamiKusimus, type EksamiSeeria } from "./constants";

export {
  OSA_I_MINUTID,
  VAHEAEG_MINUTID,
  OSA_II_MINUTID,
  EKSAMI_MAKSIMUMPUNKTID,
  type EksamiKusimus,
  type EksamiSeeria,
} from "./constants";

/**
 * Builds a full two-part mock exam: for every slot in `EKSAMI_SLOTID`, picks
 * a random topic that (a) is covered by the 2027 exam (`eksamiKate[2027]`)
 * and (b) has at least one registered generator at that slot's difficulty,
 * preferring topics not already used elsewhere in this exam for breadth.
 * Falls back to reusing a topic only if every eligible one is already
 * taken. Throws if a difficulty has no eligible topic at all — a content
 * gap, not something to silently paper over in exam mode.
 */
export async function alustaEksam(
  options: { rng?: Rng; root?: string; teemad?: Teema[] } = {},
): Promise<EksamiSeeria> {
  const rng = options.rng ?? mulberry32(Date.now());
  const registry = await buildRegistry(options.root);

  const kaetudTeemad = (options.teemad ?? PARIS_TEEMAD).filter(
    (teema) => teema.eksamiKate[2027],
  );

  const eligibleByRaskus = new Map<Raskus, TeemaId[]>();
  function eligible(raskus: Raskus): TeemaId[] {
    const cached = eligibleByRaskus.get(raskus);
    if (cached) return cached;
    const ids = kaetudTeemad
      .filter((teema) => forDifficulty(registry, teema.id, raskus).length > 0)
      .map((teema) => teema.id);
    eligibleByRaskus.set(raskus, ids);
    return ids;
  }

  const kasutatud = new Set<TeemaId>();
  const kusimused: EksamiKusimus[] = [];

  for (const slot of EKSAMI_SLOTID) {
    const kandidaadid = eligible(slot.raskus);
    if (kandidaadid.length === 0) {
      throw new Error(
        `no exam-eligible topic registered for difficulty ${slot.raskus}`,
      );
    }
    const varsked = kandidaadid.filter((id) => !kasutatud.has(id));
    const valik = varsked.length > 0 ? varsked : kandidaadid;
    const teemaId = valik[Math.floor(rng() * valik.length)];
    kasutatud.add(teemaId);

    const seeria = await alustaKohandatudSeeria(
      [{ teemaId, raskus: slot.raskus }],
      1,
      { rng, root: options.root },
    );

    kusimused.push({
      osa: slot.osa,
      punktid: slot.punktid,
      raskus: slot.raskus,
      teemaId,
      token: seeria.token,
      ulesanne: seeria.ulesanded[0],
    });
  }

  return {
    osaI: kusimused.filter((k) => k.osa === 1),
    osaII: kusimused.filter((k) => k.osa === 2),
  };
}
