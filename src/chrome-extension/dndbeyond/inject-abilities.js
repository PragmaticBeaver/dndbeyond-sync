import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
import { notify } from "../communication.js";
import {
  ROLL_ABILITY,
  ROLL_ABILITY_SAVE,
  createSyncEvent,
} from "../../global.js";

/**
 * Injects notification callback into ability buttons.
 * @returns {void}
 */
export function injectAbilities(doc) {
  const abilities = doc.getElementsByClassName("ct-quick-info__abilities")[0];
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

    const roll = createSyncEvent(ROLL_ABILITY, abilityName, getUserUrl());
    const btn = container.getElementsByTagName("button")[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, roll);
    };
  }
}

/**
 * Injects notification callback into ability-save buttons.
 * @returns {void}
 */
export function injectAbilitySaves(doc) {
  const savesContainer = doc.getElementsByClassName(
    "ddbc-saving-throws-summary"
  )[0];
  if (!savesContainer) {
    return;
  }

  for (const e of savesContainer.children) {
    const val = e.getElementsByClassName(
      "ddbc-saving-throws-summary__ability-name "
    )[0].textContent;
    const roll = createSyncEvent(ROLL_ABILITY_SAVE, val, getUserUrl());
    const btn = e.getElementsByClassName("integrated-dice__container")[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, roll);
    };
  }
}