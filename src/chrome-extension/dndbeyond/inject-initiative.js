import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
import { notify } from "../communication.js";
import { ROLL_INITIATIVE, createSyncEvent } from "../../global.js";

/**
 * Injects notification callback into initiative button.
 * @returns {void}
 */
export function injectInitiative(doc) {
  const initContainer = doc.getElementsByClassName(
    "ct-initiative-box__value"
  )[0];
  if (!initContainer) {
    return;
  }

  const roll = createSyncEvent(ROLL_INITIATIVE, "", getUserUrl());
  const btn = initContainer.getElementsByClassName(
    "integrated-dice__container"
  )[0];
  btn.onclick = () => {
    notify(EVENT_FROM_DNDBEYOND, roll);
  };
}
