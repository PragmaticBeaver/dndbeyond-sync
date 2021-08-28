import {
  CHARACTER_URLS,
  EVENT_FROM_FOUNDRY,
  EVENT_TO_FOUNDRY,
  isGMInstance,
} from "./common.js";
import { loadData } from "./persistence.js";
import {
  handleAbilityCheck,
  handleAbilitySave,
  handleSkillCheck,
} from "./handle-rolls.js";

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
      const urls = loadData(CHARACTER_URLS);
      const actorId = urls[evt.userUrl];
      const PCId = game.user.data.character;

      // todo handle GM
      /**
       * possible handling
       *  =>  isGM?
       *  =>  check all urls for current actor;
       *    =>> no user attached to actor ?
       *    =>> is DM char
       *      =>>>  update this actor
       */

      const isCurrentUserPC = actorId === PCId;
      if (!isCurrentUserPC) {
        return;
      }
      console.log("received event", evt);

      // ability-roll
      if (evt.ability) {
        console.log("ability-roll", evt.ability);
        handleAbilityCheck(evt);
      }

      // ability-save
      if (evt.save) {
        console.log("ability-save", evt.save);
        handleAbilitySave(evt);
      }

      // skill-roll
      if (evt.skill) {
        console.log("skill-roll", evt.skill);
        handleSkillCheck(evt);
      }
    }
  });
}
