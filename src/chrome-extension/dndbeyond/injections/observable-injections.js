import {
  injectDeathSavePane,
  injectDeathSaveSummary,
} from "./inject-death-save.js";
import {
  handleManualHpChange,
  injectHpSummary,
  injectHpManager,
} from "./inject-hp.js";

// todo idea - simple attach callback to "change HP"-btn's; onclick => collect current value and notify!

// mutations
const HP_MANAGER = "hp-pane";
const HP_SUMMARY = "hp-summary";
const DEATH_SAVE_PANE = "ds-pane";
const PREFERENCE_PANE = "pref-pane";
const HP_MANUAL_CHANGE = "hp-manual";
// container for DOM render / unrender changes
const DOM_CHANGE = "dom-change";
// pc died
const HP_SUMMARY_UNRENDERED = "hp-summary-removed";
const DEATH_SAVES_RENDERED = "ds-rendered";

function detectMutsFromRemovedNodes(mutation) {
  Array.from(mutation.removedNodes).forEach((n) => {
    // hp summary manual HP input
    if (
      n.className?.trim() === "ct-theme-input ct-health-summary__hp-item-input"
    ) {
      mutationsToHandle[HP_MANUAL_CHANGE]["input"] = mutation;
    }

    // hp-summary unrendered
    if (n.className?.trim() === "ct-health-summary__hp-number") {
      mutationsToHandle[DOM_CHANGE][HP_SUMMARY_UNRENDERED] = mutation;
    }
  });
}

function detectMutsFromAddedNodes(mutation) {
  Array.from(mutation.addedNodes).forEach((n) => {
    // hp summary manual HP input
    if (n.className?.trim() === "ct-health-summary__hp-number") {
      mutationsToHandle[HP_MANUAL_CHANGE]["div"] = mutation;
    }

    // death-saves rendered
    if (n.className?.trim() === "ct-health-summary__deathsaves-label") {
      mutationsToHandle[DOM_CHANGE][DEATH_SAVES_RENDERED] = mutation;
    }
  });
}

function detectMutations(mutations) {
  const mutationsToHandle = {};
  mutationsToHandle[HP_MANUAL_CHANGE] = {};
  mutationsToHandle[DOM_CHANGE] = {};

  for (const m of mutations) {
    const element = m.target;

    console.log("===");
    console.log("m", m);
    console.log("target/element", element);

    if (m.removedNodes.length > 0) {
      detectMutsFromRemovedNodes(m);
    }
    if (m.addedNodes.length > 0) {
      detectMutsFromAddedNodes(m);
    }

    // side pane - health-manager
    const isHpSidePane =
      element?.className?.trim() === "ct-health-manager" || // initial render
      element?.parentElement?.className?.trim() ===
        "ct-health-manager__adjuster-new-value";
    if (isHpSidePane) {
      mutationsToHandle[HP_MANAGER] = m;
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

  // console.log("mutationsDto", mutationsDto);

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
        // do nothing
        break;
      case DOM_CHANGE:
        const domChanges = mutationsDto[DOM_CHANGE];

        const pcDied =
          domChanges[HP_SUMMARY_UNRENDERED] && domChanges[DEATH_SAVES_RENDERED];
        if (pcDied) {
          // todo - UPDATE_FROM_BEYOND_PC_DEATH
        }

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
