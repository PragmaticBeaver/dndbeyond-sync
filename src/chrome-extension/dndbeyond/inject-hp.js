import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../common.js";
import { notify } from "../communication.js";
import { UPDATE_FROM_BEYOND_HP, createSyncEvent } from "../../global.js";

function inject(mutations, _observer) {
  // todo mutation handle => innerText changed || render death-save element
  console.log("mutations", mutations);
  for (const m of mutations) {
    const isCurrentHpMutation = m.target.nodeName === "#text";
    if (!isCurrentHpMutation) {
      continue;
    }

    const value = m.target.data;
    const evt = createSyncEvent(UPDATE_FROM_BEYOND_HP, value, getUserUrl());
    notify(EVENT_FROM_DNDBEYOND, evt);
  }
}

export function injectHP(_doc) {
  let observer;

  const healthContainer = document.getElementsByClassName(
    "ct-quick-info__health"
  )[0];
  if (!healthContainer) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    return;
  }

  observer = new window.MutationObserver(inject);
  observer.observe(healthContainer, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}
