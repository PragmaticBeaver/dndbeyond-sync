import {
  UPDATE_FROM_FOUNDRY_HP,
  UPDATE_FROM_FOUNDRY_DEATH_SAVE,
} from "../../global.js";
import { EVENT_TO_DNDBEYOND } from "../common.js";
import { supressMessages } from "../communication.js";
import { updateHP } from "./event-handling/update-hp.js";
import { updateDeathSave } from "./event-handling/update-death-save.js";

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
export function listenForIncomingEvents() {
  // todo create event type for updates
  document.addEventListener(EVENT_TO_DNDBEYOND, (args) => {
    const evt = args.detail;
    // console.log("event", evt);

    const suppress = evt.suppress;
    supressMessages(suppress);
    console.log("suppress msg", suppress);

    switch (evt.type) {
      case UPDATE_FROM_FOUNDRY_DEATH_SAVE:
        updateDeathSave(evt.value);
        break;
      case UPDATE_FROM_FOUNDRY_HP:
        updateHP(evt.value);
        break;
    }

    // todo HP (also part of death-save, because crit-success = 1 HP!)
  });
}
