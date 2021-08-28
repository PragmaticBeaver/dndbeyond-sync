import {
  EVENT_FROM_DNDBEYOND,
  EVENT_FROM_FOUNDRY,
  EVENT_TO_DNDBEYOND,
} from "../common.js";
import { notify } from "../communication.js";

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

  // create callback with clouje of these values
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

function injectSkills() {
  const skillsContainer = document.getElementsByClassName("ct-skills__list")[0];
  if (!skillsContainer) {
    return false;
  }
  console.log("skillsContainer", skillsContainer);
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
      console.log("was clicked", val);
      notify(EVENT_FROM_DNDBEYOND, skillRoll);
    };
  }
  return true;
}

function tryInject(mutations, observer) {
  const abilitiesSucess = injectAbilities();
  const skillsSucess = injectSkills();

  if (abilitiesSucess && skillsSucess) {
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
