import { EVENT_FROM_FOUNDRY, EVENT_TO_FOUNDRY } from "./common.js";

/**
 * Dispatches custom DOM event on document using "EVENT_FROM_FOUNDRY" as key.
 * @param {*} blob message data
 */
export function notify(blob) {
  const syncEvent = new CustomEvent(EVENT_FROM_FOUNDRY, {
    detail: blob,
  });
  console.log("notify", EVENT_FROM_FOUNDRY, blob);
  document.dispatchEvent(syncEvent);
}

/**
 * Listens for messages from dndbeyond-sync extension ("dndbeyond-sync-to-foundry" DOM events).
 */
export function listenForIncomingEvents() {
  document.addEventListener(EVENT_TO_FOUNDRY, (...args) => {
    for (const customEvt of args) {
      const evt = customEvt.detail;
      console.log("=>> received", evt);

      // todo is for current user?
      console.log(CONFIG);
      console.log(game); //game.user
      const user = game.users.get(game.userId);
      console.log("user", user);
      const charId = user.data.character;
      console.log("char", charId);

      const actor = game.actors.get(charId);
      console.log("actor", actor);
      const sheet = actor.sheet;
      console.log("sheet", sheet);

      // todo handle GM

      // todo mutate VTT

      // ability-roll
      if (evt.ability) {
        console.log("ability-roll", evt.ability);
        // todo roll d20 => CONFIG.Dice.D20Roll
        // todo roll damage => CONFIG.Dice.DamageRoll
      }

      // skill-roll
      if (evt.skill) {
        console.log("skill-roll", evt.skill);
      }
    }
  });
}
