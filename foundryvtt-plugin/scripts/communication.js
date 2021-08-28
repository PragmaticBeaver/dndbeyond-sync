import {
  CHARACTER_URLS,
  EVENT_FROM_FOUNDRY,
  EVENT_TO_FOUNDRY,
} from "./common.js";

import { loadData } from "./persistence.js";

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

      console.log("game.world", game.world);

      const userUrl = loadData(CHARACTER_URLS);
      console.log(userUrl);
      if (evt.userUrl !== userUrl) {
        return;
      }
      console.log("received event", evt);

      // todo handle GM

      // ability-roll
      if (evt.ability) {
        console.log("ability-roll", evt.ability);
        // todo roll d20 => CONFIG.Dice.D20Roll
        // todo roll damage => CONFIG.Dice.DamageRoll
      }

      // skill-roll
      if (evt.skill) {
        console.log("skill-roll", evt.skill);
        // todo
      }
    }
  });
}
