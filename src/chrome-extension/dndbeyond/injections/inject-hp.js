import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../../common.js";
import { notify } from "../../communication.js";
import {
  UPDATE_FROM_BEYOND_DAMAGE,
  UPDATE_FROM_BEYOND_HEAL,
  createSyncEvent,
} from "../../../global.js";

// HP summary

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

// HP manager

function apply(currentHp, newHp) {
  const val = Math.abs(currentHp - newHp);
  if (val === 0) {
    return;
  }

  const isHeal = currentHp < newHp;
  const evtName = isHeal ? UPDATE_FROM_BEYOND_HEAL : UPDATE_FROM_BEYOND_DAMAGE;

  const evt = createSyncEvent(evtName, val, getUserUrl());
  notify(EVENT_FROM_DNDBEYOND, evt);
}

export function injectHpManager(doc) {
  const container = doc.getElementsByClassName("ct-sidebar__pane-content")[0];

  const currentHp = container.getElementsByClassName(
    "ct-health-manager__health-item-value"
  )[0].innerText;

  const newHp = container.getElementsByClassName(
    "ct-health-manager__adjuster-new-value"
  )[0].innerText;

  const actions = container.getElementsByClassName(
    "ct-health-manager__actions"
  )[0];
  if (!actions) {
    return;
  }

  const applySpan = Array.from(
    actions.getElementsByClassName("ct-button__content")
  ).find((btn) => {
    return btn.innerText.toLowerCase() === "apply changes";
  });
  const applyBtn = applySpan.parentElement;
  applyBtn.onclick = () => {
    apply(currentHp, newHp);
  };
}
