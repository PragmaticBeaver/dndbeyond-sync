// events from D&D Beyond to Foundry
export const ROLL_ABILITY = "roll-ability";
export const ROLL_ABILITY_SAVE = "roll-ability-save";
export const ROLL_SKILL = "roll-skill";
export const ROLL_INITIATIVE = "roll-initiative";
export const ROLL_DEATH_SAVE = "roll-death-save";

// events from D&D Beyond to FoundryVTT
export const UPDATE_FROM_BEYOND_DEATH_SAVE = "update-f-beyond-death-save";
export const UPDATE_FROM_BEYOND_HP = "update-f-beyond-hp";

// events from FoundryVTT to D&D Beyond
export const UPDATE_FROM_FOUNDRY_DEATH_SAVE = "update-f-foundry-death-save";
export const UPDATE_FROM_FOUNDRY_HP = "update-f-foundry-hp";

/**
 * Create new SyncEvent object.
 * @param {string} type SyncEvent type; for ecample 'ability'
 * @param {any} value SyncEvent value; for example 'str'
 * @param {string} userUrl Character url from D&D Beyond
 * @param {boolean} suppress (default true) Flag to supress events that would be called because of changes. This can prevent infinit communication loops.
 * @returns {SyncEvent}
 */
export function createSyncEvent(type, value, userUrl, suppress = true) {
  return new SyncEvent(userUrl, type, value, suppress);
}

class SyncEvent {
  constructor(userUrl, type, value, suppress) {
    this.userUrl = userUrl;
    this.type = type;
    this.value = value;
    this.suppress = suppress;
  }
}
