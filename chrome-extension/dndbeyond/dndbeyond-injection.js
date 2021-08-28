import {
  EVENT_TO_DNDBEYOND,
  EVENT_FROM_DNDBEYOND,
  getUserUrl,
} from "../common.js";
import { notify } from "../communication.js";
import { injectAbilities, injectAbilitieSaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";

/**
 * todo
 * weapons (hit + damage)
 * spells
 * take DMG / heal
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
 * Injects notification callback into initiative button.
 * @returns boolean - sucess or failure
 */
function injectInitiative() {
  const initContainer = document.getElementsByClassName(
    "ct-initiative-box__value"
  )[0];
  if (!initContainer) {
    return false;
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

function tryInject(mutations, observer) {
  const abilitiesSucess = injectAbilities();
  const abilitySavesSucess = injectAbilitieSaves();
  const skillsSucess = injectSkills();
  const initiativeSucess = injectInitiative();

  if (
    abilitiesSucess &&
    abilitySavesSucess &&
    skillsSucess &&
    initiativeSucess
  ) {
    observer.disconnect();
  }
}

// observe document for DOM changes
const observer = new window.MutationObserver(tryInject);
observer.observe(document, {
  subtree: true,
  childList: true,
  characterData: true,
  subtree: true,
});

listenForIncomingEvents();
