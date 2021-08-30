import {
  EVENT_TO_DNDBEYOND,
  EVENT_FROM_DNDBEYOND,
  getUserUrl,
} from "../common.js";
import { notify } from "../communication.js";
import { injectAbilities, injectAbilitySaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";

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

function inject() {
  observe(injectAbilities);
  observe(injectAbilitySaves);
  observe(injectSkills);
  observe(injectInitiative);
  observe(injectDeathSave);
}

/**
 * Injects notification callback into initiative button.
 * @returns boolean - sucess or failure
 */
function injectInitiative(_mutations, observer) {
  const initContainer = document.getElementsByClassName(
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

  observer.disconnect();
}

/**
 * todo deathSave-container will only be rendered when PC loses all of his/her HP.
 * how to handle?
 *  => can't find "roll death save"-button
 *  => may need to inject own button for "death save roll" which will ask foundry to make a roll
 *    =>> needs to notify beyond about return
 */

/**
 * Injects notification callback into death save buttons.
 * @returns boolean - sucess or failure
 */
function injectDeathSave(_mutations, _observer) {
  const deathSaveContainer = document.getElementsByClassName(
    "ct-health-manager__deathsaves"
  )[0];
  if (!deathSaveContainer) {
    return;
  }

  console.log("deathSaveContainer", deathSaveContainer);

  // todo
  // not needed because
  // the container needs to be injected with a button
  // each time it is rendered?
  // observer.disconnect();
}

function observe(cb) {
  const observer = new window.MutationObserver(cb);
  observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}

inject();
listenForIncomingEvents();
