import { ROLL_SKILL, createSyncEvent } from "../../global.js";
import { EVENT_FROM_DNDBEYOND, getUserUrl, insertNode } from "../common.js";
import { notify } from "../communication.js";

/**
 * Injects notification callback into skill buttons.
 * @returns {void}
 */
export function injectSkills(doc) {
  const skillsContainer = doc.getElementsByClassName("ct-skills__list")[0];
  if (!skillsContainer) {
    return;
  }

  const skillContainers =
    skillsContainer.getElementsByClassName("ct-skills__item");
  for (const sContainer of skillContainers) {
    const val = sContainer.getElementsByClassName("ct-skills__col--skill")[0]
      .textContent;

    const roll = createSyncEvent(ROLL_SKILL, val, getUserUrl(), true);
    const btn = document.createElement("button");
    btn.classList = "dndsync-beyond-skill-btn";
    btn.onclick = (ev) => {
      ev.stopPropagation();
      notify(EVENT_FROM_DNDBEYOND, roll);
    };

    const modifierContainer = sContainer.getElementsByClassName(
      "ct-skills__col--modifier"
    )[0];
    insertNode(modifierContainer, btn);
  }
}
