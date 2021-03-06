/**
 * Gathers the ID's of currently available PC-sheet's from the global foundryVTT CONFIG.
 * @returns {string[]} List of active PC-sheet ID's.
 */
export function getPCSheetIds() {
  return Object.values(CONFIG.Actor.sheetClasses.character)
    .map((sheet) => sheet.cls)
    .map((sheetClass) => sheetClass.name);
}

/**
 * Gets Actor of current User.
 * @returns {*} Actor
 */
export function getActorOfCurrentUser() {
  const PCid = game.user.data.character;
  return getActor(PCid);
}

/**
 * Gets Actor by ID.
 * @param {string} actorId
 * @returns {*} Actor
 */
export function getActor(actorId) {
  return game.actors.get(actorId);
}
