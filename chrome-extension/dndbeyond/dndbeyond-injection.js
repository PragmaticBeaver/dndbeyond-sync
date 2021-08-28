import { EVENT_TO_DNDBEYOND } from "../common.js";
import { injectAbilities, injectAbilitieSaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";

/**
 * todo
 * initiative
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

function tryInject(mutations, observer) {
  const abilitiesSucess = injectAbilities();
  const abilitySavesSucess = injectAbilitieSaves();
  const skillsSucess = injectSkills();

  if (abilitiesSucess && abilitySavesSucess && skillsSucess) {
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
