import { injectDeathSave } from "./inject-death-save.js";
import { handleHPChange } from "./inject-hp.js";
import { injectPreferencesPane } from "./inject-preferences-pane.js";

// mutations
const HP_MUT = "hp-val";
const DEATH_SAVE = "death-save";
const PREFERENCE_PANE = "pref-pane";
// complex mutations
const HP_SIDEPANE_MUT = "hp-sidePane";

export function observeDocument(doc) {
  const observer = new window.MutationObserver((mutations, _observer) => {
    const mutationsToHandle = {}; // cache for mutations that need to be handled

    for (const m of mutations) {
      const element = m.target;

      // side pane - hp change
      const isSidePaneHpChange =
        element?.className?.trim() === "ct-health-manager";
      if (isSidePaneHpChange) {
        mutationsToHandle[HP_SIDEPANE_MUT] = m;
      }

      // hp change
      const isCurrentHpMutation =
        element.nodeName === "#text" && !isNaN(element.nodeValue);
      if (isCurrentHpMutation) {
        mutationsToHandle[HP_MUT] = m;
      }

      // following mutations need function 'getElementsByClassName'
      try {
        element.getElementsByClassName("");
      } catch {
        continue;
      }

      // death save
      const deathSavesGroups = element.getElementsByClassName(
        "ct-health-manager__deathsaves-groups"
      )[0];
      if (deathSavesGroups) {
        mutationsToHandle[DEATH_SAVE] = m;
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

    // complex mutations / multiple mutations
    const keys = Object.keys(mutationsToHandle);
    if (keys.length > 1) {
      // side pane HP mutation
      const isSidePaneHpMut =
        keys.includes(HP_SIDEPANE_MUT) && keys.includes(HP_MUT);
      if (isSidePaneHpMut) {
        // todo
        console.log("isSidePaneHpMut", isSidePaneHpMut);
      }
      return;
    }

    // simple mutations / single mutations
    const k = keys[0];
    const mutation = mutationsToHandle[k];
    switch (k) {
      case HP_MUT:
        handleHPChange(mutation.target.data);
        break;
      case DEATH_SAVE:
        injectDeathSave(doc);
        break;
      case PREFERENCE_PANE:
        injectPreferencesPane(doc);
        break;
    }
  });

  observer.observe(doc, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}
