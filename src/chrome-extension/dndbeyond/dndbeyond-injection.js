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
import { supressMessages, shouldSuppressMsg } from "../communication.js";

// ENTRY FILE FOR D&D BEYOND CODE

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
function listenForIncomingEvents() {
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

    // HP (also part of death-save, because crit-success = 1 HP!)
    // todo mutate DOM
  });
}

/**
 * Injects DOM with callbacks.
 */
function inject() {
  console.log("injecting ...");
  const doc = document.documentElement;
  injectAbilities(doc);
  // injectAbilitySaves(doc);
  // injectSkills(doc);
  // injectInitiative(doc);
  // injectDeathSave(doc);
  // injectHP(doc);
}

/**
 * todo deathSave-container will only be rendered when PC loses all of his/her HP.
 * how to handle?
 *  => can't find "roll death save"-button
 *  => may need to inject own button for "death save roll" which will ask foundry to make a roll
 *    =>> needs to notify beyond about return
 */

const interval = setInterval(() => {
  if (document.readyState !== "complete") {
    return;
  }
  inject();
  listenForIncomingEvents();
  clearInterval(interval);
}, 1000);
