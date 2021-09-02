import { EVENT_TO_DNDBEYOND } from "../common.js";
import { injectAbilities, injectAbilitySaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";
import { injectDeathSave } from "./inject-death-save.js";
import { injectInitiative } from "./inject-initiative.js";
import { updateDeathSave } from "./update-death-save.js";
import {
  UPDATE_FROM_FOUNDRY_DEATH_SAVE,
  UPDATE_FROM_FOUNDRY_HP,
} from "../../global.js";
import { updateHP } from "./update-hp.js";
import { injectHP } from "./inject-hp.js";

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
function listenForIncomingEvents() {
  // todo create event type for updates
  document.addEventListener(EVENT_TO_DNDBEYOND, (args) => {
    const evt = args.detail;
    console.log("event", evt);

    switch (evt.type) {
      case UPDATE_FROM_FOUNDRY_DEATH_SAVE:
        updateDeathSave(evt.value);
        break;
      case UPDATE_FROM_FOUNDRY_HP:
        updateHP(evt.value);
        break;
    }

    // HP (also part of death-save, because crit-success = 1 HP!)
    // todo mutate DOM
  });
}

/**
 * Injects DOM with callbacks.
 * @param {*} _mutations
 * @param {*} _observer
 */
function inject(_mutations, _observer) {
  // todo may be => don't inject multiple times ?
  const doc = document.documentElement;
  injectAbilities(doc);
  injectAbilitySaves(doc);
  injectSkills(doc);
  injectInitiative(doc);
  injectDeathSave(doc);
  injectHP(doc);
}

/**
 * todo deathSave-container will only be rendered when PC loses all of his/her HP.
 * how to handle?
 *  => can't find "roll death save"-button
 *  => may need to inject own button for "death save roll" which will ask foundry to make a roll
 *    =>> needs to notify beyond about return
 */

const observer = new window.MutationObserver(inject);
observer.observe(document, {
  subtree: true,
  childList: true,
  characterData: true,
  subtree: true,
});

listenForIncomingEvents();
