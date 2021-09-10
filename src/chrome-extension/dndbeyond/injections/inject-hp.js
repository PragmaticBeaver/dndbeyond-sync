import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../../common.js";
import { notify } from "../../communication.js";
import {
  UPDATE_FROM_BEYOND_DAMAGE,
  UPDATE_FROM_BEYOND_HEAL,
  createSyncEvent,
} from "../../../global.js";

function getSummaryChangeValue(container) {
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
    const val = getSummaryChangeValue(container);
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
    const val = getSummaryChangeValue(container);
    if (!val) {
      return;
    }
    const evt = createSyncEvent(UPDATE_FROM_BEYOND_DAMAGE, val, getUserUrl());
    notify(EVENT_FROM_DNDBEYOND, evt);
  };
}

const hpManagerState = {
  heal: 0,
  dmg: 0,
};

function apply() {
  const isHeal = hpManagerState.heal > hpManagerState.dmg;
  const val = isHeal
    ? hpManagerState.heal - hpManagerState.dmg
    : hpManagerState.dmg - hpManagerState.heal;

  if (val === 0) {
    return;
  }

  const evtName = isHeal ? UPDATE_FROM_BEYOND_HEAL : UPDATE_FROM_BEYOND_DAMAGE;

  const evt = createSyncEvent(evtName, val, getUserUrl());
  notify(EVENT_FROM_DNDBEYOND, evt);

  hpManagerState.dmg = 0;
  hpManagerState.heal = 0;
}

export function injectHpManager(doc) {
  const healBtn = document.getElementById("dndbeyond-sync-hp-heal-btn");
  if (!healBtn) {
    const btn = doc.getElementsByClassName(
      "ct-theme-button action-increase ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button"
    )[0];
    btn.id = "dndbeyond-sync-hp-heal-btn";
    btn.onclick = () => {
      hpManagerState.heal += 1;
    };
  }

  const dmgBtn = document.getElementById("dndbeyond-sync-hp-dmg-btn");
  if (!dmgBtn) {
    const btn = doc.getElementsByClassName(
      "ct-theme-button action-decrease ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button"
    )[0];
    btn.id = "dndbeyond-sync-hp-dmg-btn";
    btn.onclick = () => {
      hpManagerState.dmg += 1;
    };
  }

  // todo first render does not work, why?
  const container = doc.getElementsByClassName("ct-sidebar__pane-content")[0];
  const actions = container.getElementsByClassName(
    "ct-health-manager__actions"
  )[0];
  if (!actions) {
    console.log("no actions rendered");
    return;
  }

  const applySpan = Array.from(
    actions.getElementsByClassName("ct-button__content")
  ).find((btn) => {
    return btn.innerText.toLowerCase() === "apply changes";
  });
  applySpan.onclick = apply;

  const applyBtn = applySpan.parentElement;
  applyBtn.onclick = apply;
}
