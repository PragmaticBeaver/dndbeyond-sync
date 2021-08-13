console.log("=>> I was injected!");

/**
 * todo
 *  receive msg's => document.addEventListener
 *  send msg's => document.dispatchEvent
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

// reveive msg from content.js
document.addEventListener("dndbeyond-sync-to-beyond", (...args) => {
  console.log("received args:");
  console.log(args);
});

// send msg to content.js
const syncEvent = new CustomEvent("dndbeyond-sync-from-beyond", {
  detail: { change: "sync-from-beyond" },
});
document.dispatchEvent(syncEvent);
