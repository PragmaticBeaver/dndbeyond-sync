import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../../common.js";
import { notify } from "../../communication.js";
import {
  UPDATE_FROM_BEYOND_DAMAGE,
  UPDATE_FROM_BEYOND_HEAL,
  createSyncEvent,
} from "../../../global.js";

function getChangeValue(container) {
  return container.getElementsByClassName(
    "ct-theme-input ct-health-summary__adjuster-field-input"
  )[0].value;
}

export function injectHpSummary(doc) {
  const beyondSyncBtnHeal = document.getElementById(
    "dndbeyond-sync-hpsummary-heal-btn"
  );
  const beyondSyncBtnDamage = document.getElementById(
    "dndbeyond-sync-hpsummary-damage-btn"
  );
  if (beyondSyncBtnHeal && beyondSyncBtnDamage) {
    return;
  }

  const container = doc.getElementsByClassName("ct-health-summary__hp")[0];

  const healBtn = container.getElementsByClassName(
    "ct-theme-button ct-health-summary__adjuster-button ct-health-summary__adjuster-button--heal ct-theme-button--outline ct-theme-button--interactive ct-button character-button ddbc-button character-button-block-small"
  )[0];
  healBtn.id = "dndbeyond-sync-hpsummary-heal-btn";
  healBtn.classList += " dndsync-beyond-hp-btn";
  healBtn.onclick = () => {
    const val = getChangeValue(container);
    if (!val) {
      return;
    }
    const evt = createSyncEvent(UPDATE_FROM_BEYOND_HEAL, val, getUserUrl());
    notify(EVENT_FROM_DNDBEYOND, evt);
  };

  const dmgBtn = container.getElementsByClassName(
    "ct-theme-button ct-health-summary__adjuster-button ct-health-summary__adjuster-button--damage ct-theme-button--outline ct-theme-button--interactive ct-button character-button ddbc-button character-button-block-small"
  )[0];
  dmgBtn.id = "dndbeyond-sync-hpsummary-damage-btn";
  dmgBtn.classList += " dndsync-beyond-hp-btn";
  dmgBtn.onclick = () => {
    const val = getChangeValue(container);
    if (!val) {
      return;
    }
    const evt = createSyncEvent(UPDATE_FROM_BEYOND_DAMAGE, val, getUserUrl());
    notify(EVENT_FROM_DNDBEYOND, evt);
  };
}

export function injectHpManager(doc) {
  // todo set element with id and check for that id; don't execute if id exists!
  console.log("injectHpManager");
  // todo
  // override apply button so it WONT ask for approval!
}
