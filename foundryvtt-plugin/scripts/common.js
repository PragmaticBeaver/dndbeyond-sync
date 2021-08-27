export const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
export const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

export function isGMInstance() {
  return game.user.isGM;
}
