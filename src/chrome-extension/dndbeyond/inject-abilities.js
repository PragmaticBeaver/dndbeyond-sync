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
  console.log("abilityContainers", abilityContainers);

  Array.from(abilityContainers).forEach((container) => {
    const abilityName = container.getElementsByClassName(
      "ddbc-ability-summary__abbr"
    )[0].textContent;

    const abilityContainer = container.getElementsByClassName(
      "ddbc-ability-summary__primary"
    )[0];
    const children = Array.from(abilityContainer.children);

    const btn = document.createElement("button");
    btn.classList = "dndsync-beyond-btn";
    const evt = createSyncEvent(ROLL_ABILITY, abilityName, getUserUrl(), true);
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, evt);
    };
    children.forEach((c) => {
      btn.appendChild(c);
    });

    abilityContainer.appendChild(btn);
  });
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
    const roll = createSyncEvent(ROLL_ABILITY_SAVE, val, getUserUrl(), true);
    const btn = e.getElementsByClassName("integrated-dice__container")[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, roll);
    };
  }
}
