import {
  EVENT_TO_DNDBEYOND,
  EVENT_FROM_DNDBEYOND,
  getUserUrl,
} from "../common.js";
import { notify } from "../communication.js";
import { injectAbilities, injectAbilitySaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";
import { injectDeathSave } from "./inject-deathSave.js";

/**
 * todo
 * death save => actor.rollDeathSave
 * hit die => actor.rollHitDie
 * long rest => actor.longRest
 * short rest => actor.shortRest
 * weapons (hit + damage)
 * spells
 * take DMG / heal => actor.applyDamage
 * inspiration
 * passive stats
 * feat / trait (post into foundry)
 * use charge of magic item
 * item sync (add / remove)
 */

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
function listenForIncomingEvents() {
  document.addEventListener(EVENT_TO_DNDBEYOND, (...args) => {
    console.log("injection: received args", args);
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
}

/**
 * Injects notification callback into initiative button.
 * @returns {void}
 */
function injectInitiative(doc) {
  const initContainer = doc.getElementsByClassName(
    "ct-initiative-box__value"
  )[0];
  if (!initContainer) {
    return;
  }

  const roll = {
    userUrl: getUserUrl(),
    initiative: "initiative",
  };
  const btn = initContainer.getElementsByClassName(
    "integrated-dice__container"
  )[0];
  btn.onclick = () => {
    notify(EVENT_FROM_DNDBEYOND, roll);
  };
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
