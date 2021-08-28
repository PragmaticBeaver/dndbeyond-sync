// module
export const MODULE_NAME = "dndbeyond-sync";

// communication
export const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
export const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

// data
export const CHARACTER_URLS = "charUrls";

/**
 * Checks if current FoundryVTT instance is GM.
 * @returns {boolean} is GM
 */
export function isGMInstance() {
  return game.user.isGM;
}
