import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
import { notify } from "../communication.js";

/**
 * Injects notification callback into skill buttons.
 * @returns boolean - sucess or failure
 */
export function injectSkills(_mutations, observer) {
  const skillsContainer = document.getElementsByClassName("ct-skills__list")[0];
  if (!skillsContainer) {
    return;
  }

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
      notify(EVENT_FROM_DNDBEYOND, skillRoll);
    };
  }
  observer.disconnect();
}
