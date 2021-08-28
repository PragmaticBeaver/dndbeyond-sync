import {
  EVENT_FROM_DNDBEYOND,
  EVENT_FROM_FOUNDRY,
  EVENT_TO_DNDBEYOND,
} from "../common.js";
import { notify } from "../communication.js";

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

function getUserUrl() {
  return window.location.href;
}

/**
 * Injects notification callback into ability buttons.
 * @returns boolean - sucess or failure
 */
function injectAbilities() {
  const abilities = document.getElementsByClassName(
    "ct-quick-info__abilities"
  )[0];
  if (!abilities) {
    return false;
  }

  const abilityContainers = abilities.getElementsByClassName(
    "ddbc-ability-summary"
  );
  for (const container of abilityContainers) {
    const abilityName = container.getElementsByClassName(
      "ddbc-ability-summary__abbr"
    )[0].textContent;
    const abilityScore = container.getElementsByClassName(
      "ddbc-ability-summary__secondary"
    )[0].textContent;

    const abilityModContainer = container.getElementsByClassName(
      "ddbc-signed-number ddbc-signed-number--large"
    )[0];
    const abilityModVal = abilityModContainer.getElementsByClassName(
      "ddbc-signed-number__number"
    )[0].textContent;
    const abilityModSign = abilityModContainer.getElementsByClassName(
      "ddbc-signed-number__sign"
    )[0].textContent;

    const abilityRoll = {
      userUrl: getUserUrl(),
      ability: abilityName,
    };
    const btn = container.getElementsByTagName("button")[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, abilityRoll);
    };
  }
  return true;
}

/**
 * Injects notification callback into ability-save buttons.
 * @returns boolean - sucess or failure
 */
function injectAbilitieSaves() {
  const savesContainer = document.getElementsByClassName(
    "ddbc-saving-throws-summary"
  )[0];
  if (!savesContainer) {
    return false;
  }

  for (const e of savesContainer.children) {
    const val = e.getElementsByClassName(
      "ddbc-saving-throws-summary__ability-name "
    )[0].textContent;
    const saveRoll = {
      userUrl: getUserUrl(),
      save: val,
    };
    const btn = e.getElementsByClassName("integrated-dice__container")[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, saveRoll);
    };
  }
  return true;
}

/**
 * Injects notification callback into skill buttons.
 * @returns boolean - sucess or failure
 */
function injectSkills() {
  const skillsContainer = document.getElementsByClassName("ct-skills__list")[0];
  if (!skillsContainer) {
    return false;
  }

  const skillContainers =
    skillsContainer.getElementsByClassName("ct-skills__item");
  for (const sContainer of skillContainers) {
    const val = sContainer.getElementsByClassName("ct-skills__col--skill")[0]
      .textContent;

    const skillRoll = {
      userUrl: getUserUrl(),
      skill: val,
    };
    const btn = sContainer.getElementsByClassName(
      "integrated-dice__container"
    )[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, skillRoll);
    };
  }
  return true;
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
