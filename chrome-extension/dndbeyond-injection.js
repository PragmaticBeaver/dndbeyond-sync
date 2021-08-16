console.log("=>> I was injected!");

/**
 * todo
 *  receive msg's => document.addEventListener
 *  send msg's => document.dispatchEvent
 */

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
function listenForContentEvents() {
  document.addEventListener("dndbeyond-sync-to-beyond", (...args) => {
    console.log("injection: received args", args);
    // todo mutate DOM
  });
}

/**
 * Dispatches custom DOM event on document using "dndbeyond-sync-from-beyond" as key.
 * @param {*} blob message data
 */
function notifyContentScript(blob) {
  const syncEvent = new CustomEvent("dndbeyond-sync-from-beyond", {
    detail: blob,
  });
  console.log("notify content-script", syncEvent);
  document.dispatchEvent(syncEvent);
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
      notifyContentScript(ability);
    };
  }
  return true;
}

function tryInject(mutations, observer) {
  console.log("DOM changed;");
  console.log(mutations, observer);

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

listenForContentEvents();
