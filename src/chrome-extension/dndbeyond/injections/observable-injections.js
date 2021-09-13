import {
  injectDeathSavePane,
  injectDeathSaveSummary,
} from "./inject-death-save.js";
import {
  handleManualHpChange,
  injectHpSummary,
  injectHpManager,
} from "./inject-hp.js";
import { injectPreferencesPane } from "./inject-preferences-pane.js";

// todo idea - simple attach callback to "change HP"-btn's; onclick => collect current value and notify!

// mutations
const HP_MANAGER = "hp-pane";
const HP_SUMMARY = "hp-summary";
const DEATH_SAVE_PANE = "ds-pane";
const PREFERENCE_PANE = "pref-pane";
const HP_MANUAL_CHANGE = "hp-manual";

function detectMutations(mutations) {
  const mutationsToHandle = {};

  for (const m of mutations) {
    const element = m.target;

    // console.log("===");
    // console.log("m", m);
    // console.log("target/element", element);

    // side pane - health-manager
    const isHpSidePane =
      element?.className?.trim() === "ct-health-manager" || // initial render
      element?.parentElement?.className?.trim() ===
        "ct-health-manager__adjuster-new-value";
    if (isHpSidePane) {
      mutationsToHandle[HP_MANAGER] = m;
    }

    // hp summary manual HP input
    if (m.removedNodes.length > 0) {
      Array.from(m.removedNodes).forEach((n) => {
        if (
          n.className?.trim() ===
          "ct-theme-input ct-health-summary__hp-item-input"
        ) {
          if (!mutationsToHandle[HP_MANUAL_CHANGE]) {
            mutationsToHandle[HP_MANUAL_CHANGE] = {};
          }
          mutationsToHandle[HP_MANUAL_CHANGE]["input"] = m;
        }
      });
    }
    if (m.addedNodes.length > 0) {
      Array.from(m.addedNodes).forEach((n) => {
        if (n.className?.trim() === "ct-health-summary__hp-number") {
          if (!mutationsToHandle[HP_MANUAL_CHANGE]) {
            mutationsToHandle[HP_MANUAL_CHANGE] = {};
          }
          mutationsToHandle[HP_MANUAL_CHANGE]["div"] = m;
        }
      });
    }

    // hp summary
    const isHpSummary = element?.className?.trim() === "ct-health-summary__hp";
    if (isHpSummary) {
      mutationsToHandle[HP_SUMMARY] = m;
    }

    // following mutations need function 'getElementsByClassName'
    try {
      element.getElementsByClassName("");
    } catch {
      continue;
    }

    // side pane - death save
    const isDeathSavePane = element.getElementsByClassName(
      "ct-health-manager__deathsaves-groups"
    )[0];
    if (isDeathSavePane) {
      mutationsToHandle[DEATH_SAVE_PANE] = m;
    }

    // preference pane
    const inactiveToggle = element.getElementsByClassName(
      "ddbc-toggle-field  ddbc-toggle-field--is-disabled ddbc-toggle-field--is-interactive"
    )[0];
    const activeToggle = element.getElementsByClassName(
      "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
    )[0];
    if (inactiveToggle || activeToggle) {
      mutationsToHandle[PREFERENCE_PANE] = m;
    }
  }

  return mutationsToHandle;
}

function handleMutations(mutationsDto) {
  const doc = document;

  console.log("mutationsDto", mutationsDto);

  for (const k of Object.keys(mutationsDto)) {
    switch (k) {
      case HP_MANAGER:
        injectHpManager(doc);
        break;
      case HP_SUMMARY:
        injectHpSummary(doc);
        break;
      case HP_MANUAL_CHANGE:
        if (
          !mutationsDto[HP_MANUAL_CHANGE]["input"] ||
          !mutationsDto[HP_MANUAL_CHANGE]["div"]
        ) {
          break;
        }
        handleManualHpChange(doc);
        break;
      case DEATH_SAVE_PANE:
        injectDeathSavePane(doc);
        break;
      case PREFERENCE_PANE:
        injectPreferencesPane(doc);
        break;
      default:
        console.warn("unknown mutation", k);
        break;
    }
  }
}

export function observeDocument(doc) {
  const observer = new window.MutationObserver((mutations, _observer) => {
    const muts = detectMutations(mutations);
    handleMutations(muts);
  });

  observer.observe(doc, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}
