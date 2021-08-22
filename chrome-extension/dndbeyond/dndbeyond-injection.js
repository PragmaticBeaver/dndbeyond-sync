import { EVENT_FROM_DNDBEYOND, EVENT_TO_DNDBEYOND } from "../common.js";
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

  console.log("abilities", abilities);
  // create callback with clouje of these values
  const abilityContainers = abilities.getElementsByClassName(
    "ddbc-ability-summary"
  );
  console.log("abilityContainers", abilityContainers);
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

    // todo convert to ability roll
    const ability = {
      name: abilityName,
      score: abilityScore,
      mod: abilityModSign + abilityModVal,
    };
    console.log("ability", ability);
    const btn = container.getElementsByTagName("button")[0];
    btn.onclick = () => {
      console.log("i got overridden!");
      console.log("ability", ability);
      notify(EVENT_FROM_DNDBEYOND, ability);
    };
  }
  return true;
}

function tryInject(mutations, observer) {
  const abilitiesSucess = injectAbilities();

  if (abilitiesSucess) {
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
