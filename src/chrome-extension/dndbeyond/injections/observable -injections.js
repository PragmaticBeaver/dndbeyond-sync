import { injectDeathSave } from "./inject-death-save.js";
import { handleHPChange } from "./inject-hp.js";
import { injectPreferencesPane } from "./inject-preferences-pane.js";

export function observeDocument(doc) {
  const observer = new window.MutationObserver((mutations, _observer) => {
    for (const m of mutations) {
      const element = m.target;

      try {
        element.getElementsByClassName("");
      } catch {
        // HP changes
        const isCurrentHpMutation =
          m.target.nodeName === "#text" && !isNaN(m.target.nodeValue);
        if (isCurrentHpMutation) {
          handleHPChange(m.target.data);
        }
        continue;
      }

      // death save
      const deathSavesGroups = element.getElementsByClassName(
        "ct-health-manager__deathsaves-groups"
      )[0];
      if (deathSavesGroups) {
        injectDeathSave(doc);
        continue;
      }

      // preference pane
      const inactiveToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-disabled ddbc-toggle-field--is-interactive"
      )[0];
      const activeToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
      )[0];
      if (inactiveToggle || activeToggle) {
        injectPreferencesPane(document);
        continue;
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
