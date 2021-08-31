import { ROLL_SKILL } from "../../global.js";
import { createRoll, EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
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

    const roll = createRoll(ROLL_SKILL, val);
    const btn = sContainer.getElementsByClassName(
      "integrated-dice__container"
    )[0];
    btn.onclick = () => {
      notify(EVENT_FROM_DNDBEYOND, roll);
    };
  }
}
