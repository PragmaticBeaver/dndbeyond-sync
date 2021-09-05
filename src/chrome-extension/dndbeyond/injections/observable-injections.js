import {
  injectDeathSavePane,
  injectDeathSaveSummary,
} from "./inject-death-save.js";
import { injectHpSummary, injectHpManager } from "./inject-hp.js";
import { injectPreferencesPane } from "./inject-preferences-pane.js";

// mutations
const HP_SUMMARY = "hp-summary";
const DEATH_SAVE_PANE = "ds-pane";
const PREFERENCE_PANE = "pref-pane";
// complex mutations
const HP_MUT_PANE = "hp-pane";

// todo idea - simple attach callback to "change HP"-btn's; onclick => collect current value and notify!

export function observeDocument(doc) {
  const observer = new window.MutationObserver((mutations, _observer) => {
    const mutationsToHandle = {}; // cache for mutations that need to be handled

    for (const m of mutations) {
      const element = m.target;

      // console.log("m", m);
      // console.log("element", element);

      // side pane - health-manager rendered
      const isHpSidePane = element?.className?.trim() === "ct-health-manager";
      if (isHpSidePane) {
        mutationsToHandle[HP_MUT_PANE] = m;
      }

      // hp summary rendered
      const isHpSummary =
        element?.className?.trim() === "ct-health-summary__hp";
      if (isHpSummary) {
        mutationsToHandle[HP_SUMMARY] = m;
      }

      // following mutations need function 'getElementsByClassName'
      try {
        element.getElementsByClassName("");
      } catch {
        continue;
      }

      // side pane - death save rendered
      const isDeathSavePane = element.getElementsByClassName(
        "ct-health-manager__deathsaves-groups"
      )[0];
      if (isDeathSavePane) {
        mutationsToHandle[DEATH_SAVE_PANE] = m;
      }

      // preference pane rendered
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

    console.log("mutationsToHandle", Object.keys(mutationsToHandle));
    for (const k of Object.keys(mutationsToHandle)) {
      switch (k) {
        case HP_MUT_PANE:
          injectHpManager(doc);
          break;
        case HP_SUMMARY:
          injectHpSummary(doc);
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
  });

  observer.observe(doc, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}
