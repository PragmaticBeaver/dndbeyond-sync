import { CHARACTER_URLS, EVENT_TO_FOUNDRY } from "../common.js";
import { loadData } from "../persistence.js";
import {
  handleAbilityCheck,
  handleAbilitySave,
  handleSkillCheck,
  handleInitiativeRoll,
  handleDeathSave,
} from "./handle-rolls.js";
import {
  ROLL_ABILITY,
  ROLL_ABILITY_SAVE,
  ROLL_DEATH_SAVE,
  ROLL_INITIATIVE,
  ROLL_SKILL,
  UPDATE_FROM_BEYOND_DEATH_SAVE,
} from "../../../global.js";
import { updateDeathSave } from "../update.js";
import { getActor } from "../actor.js";

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
      console.log("isCurrentUserPC ", isCurrentUserPC);
      if (!isCurrentUserPC) {
        return;
      }
      // console.log("received event", evt);
      const actor = getActor(actorId);

      switch (evt.type) {
        case ROLL_ABILITY:
          handleAbilityCheck(actor, evt.value);
          break;
        case ROLL_ABILITY_SAVE:
          handleAbilitySave(actor, evt.value);
          break;
        case ROLL_SKILL:
          handleSkillCheck(actor, evt.value);
          break;
        case ROLL_INITIATIVE:
          handleInitiativeRoll(actor);
          break;
        case ROLL_DEATH_SAVE:
          handleDeathSave(actor);
          break;
        case UPDATE_FROM_BEYOND_DEATH_SAVE:
          updateDeathSave(actor, evt.value);
          break;
      }
    }
  });
}
