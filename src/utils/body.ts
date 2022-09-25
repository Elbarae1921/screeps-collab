/**
 * Calculates the cost in energy of this body
 */
export function getCostOfBody(body: BodyPartConstant[]): number {
  return body.reduce((current, next) => current + BODYPART_COST[next], 0);
}

/**
 * Calculates a body under the given energy, with selected body parts.
 * @param mode if `'maximum'`, add the part in a loop, then move to the next one when the energy is too low.
 * If `'sorted'`, add each one in a loop, sorted by priority.
 * @param bodyParts The body parts to use to create the body.
 */
export function getBodyFor(energy: number, mode: 'maximum' | 'sorted', bodyParts: BodyPartConstant[]): BodyPartConstant[];
/**
 * Calculates a body under the given energy, with selected body parts.
 * @param mode if `'maximum'`, add the part in a loop, then move to the next one when the energy is too low.
 * If `'sorted'`, add each one in a loop, sorted by priority.
 * @param bodyParts The body parts to use to create the body, with their respective priorities.
 */
export function getBodyFor(energy: number, mode: 'maximum' | 'sorted', bodyParts: [BodyPartConstant, number][]): BodyPartConstant[];
export function getBodyFor(energy: number, mode: 'maximum' | 'sorted', bodyParts: BodyPartConstant[] | [BodyPartConstant, number][]): BodyPartConstant[] {
  if (bodyParts.length === 0) {
    return [];
  }

  const parts = bodyParts.map(bp => (Array.isArray(bp) ? [bp[0], bp[1], BODYPART_COST[bp[0]]] : [bp, 1, BODYPART_COST[bp]]) as [BodyPartConstant, number, number]);
  parts.sort((a, b) => a[1] - b[1]);

  const lowestEnergyForPart = Math.min(...parts.map(p => p[2]));

  const result: BodyPartConstant[] = [];

  while (energy >= lowestEnergyForPart) {
    for (const [part, _, cost] of parts) {
        while (energy >= cost) {
          energy -= cost;
          result.push(part);
          if (mode === 'sorted') break;
        }
    }
  }

  return result;
}
