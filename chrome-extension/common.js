export const DNDBEYOND_PORT_ID = "dndbeyond-sync";
export const FOUNDRY_PORT_ID = "foundry-sync";

export const EVENT_FROM_DNDBEYOND = "dndbeyond-sync-from-beyond";
export const EVENT_TO_DNDBEYOND = "dndbeyond-sync-to-beyond";

export const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
export const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

export function getUserUrl() {
  return window.location.href;
}

/**
 * Create new Roll object.
 * @param {*} type roll type; for ecample 'ability'
 * @param {*} value roll value; for example 'str'
 * @param {*} userUrl (optional) user url from D&D Beyond
 * @returns {Roll}
 */
export function createRoll(type, value, userUrl = getUserUrl()) {
  return new Roll(userUrl, type, value);
}

class Roll {
  constructor(userUrl, type, value) {
    this.userUrl = userUrl;
    this.type = type;
    this.value = value;
  }
}
