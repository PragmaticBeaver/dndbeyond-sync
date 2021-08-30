import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
import { notify } from "../communication.js";

/**
 * Injects notification callback into ability buttons.
 * @returns {void}
 */
export function injectAbilities(_mutations, observer) {
  const abilities = document.getElementsByClassName(
    "ct-quick-info__abilities"
  )[0];
  if (!abilities) {
    return;
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
  observer.disconnect();
}

/**
 * Injects notification callback into ability-save buttons.
 * @returns {void}
 */
export function injectAbilitySaves(_mutations, observer) {
  const savesContainer = document.getElementsByClassName(
    "ddbc-saving-throws-summary"
  )[0];
  if (!savesContainer) {
    return;
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
  observer.disconnect();
}
