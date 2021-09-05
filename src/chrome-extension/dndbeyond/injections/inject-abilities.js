import { EVENT_FROM_DNDBEYOND, getUserUrl, insertNode } from "../../common.js";
import { notify } from "../../communication.js";
import {
  ROLL_ABILITY,
  ROLL_ABILITY_SAVE,
  createSyncEvent,
} from "../../../global.js";

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

  Array.from(abilityContainers).forEach((container) => {
    const abilityName = container.getElementsByClassName(
      "ddbc-ability-summary__abbr"
    )[0].textContent;

    const btn = document.createElement("button");
    btn.classList = "dndsync-beyond-ability-btn";
    const evt = createSyncEvent(ROLL_ABILITY, abilityName, getUserUrl(), true);
    btn.onclick = (ev) => {
      ev.stopPropagation();
      notify(EVENT_FROM_DNDBEYOND, evt);
    };

    const abilityContainer = container.getElementsByClassName(
      "ddbc-ability-summary__primary"
    )[0];

    insertNode(abilityContainer, btn);
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
      "ddbc-saving-throws-summary__ability-name"
    )[0].textContent;

    const btn = document.createElement("button");
    btn.classList = "dndsync-beyond-saving-throw-btn";
    const roll = createSyncEvent(ROLL_ABILITY_SAVE, val, getUserUrl(), true);
    btn.onclick = (ev) => {
      ev.stopPropagation();
      notify(EVENT_FROM_DNDBEYOND, roll);
    };

    const modifierContainer = e.getElementsByClassName(
      "ddbc-saving-throws-summary__ability-modifier"
    )[0];
    modifierContainer.classList += " dndsync-beyond-saving-throw-container";

    insertNode(modifierContainer, btn);

    const svg = btn.getElementsByTagName("svg")[0];
    svg.classList += " dndsync-beyond-saving-throw-svg";
    modifierContainer.appendChild(svg);
  }
}
