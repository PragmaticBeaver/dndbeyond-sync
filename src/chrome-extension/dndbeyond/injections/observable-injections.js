import {
  injectDeathSavePane,
  injectDeathSaveSummary,
} from "./inject-death-save.js";
import { injectHpSummary, injectHpManager } from "./inject-hp.js";
import { injectPreferencesPane } from "./inject-preferences-pane.js";

// todo idea - simple attach callback to "change HP"-btn's; onclick => collect current value and notify!

export function observeDocument(doc) {
  const observer = new window.MutationObserver((mutations, _observer) => {
    for (const m of mutations) {
      const element = m.target;

      // console.log("m", m);
      // console.log("target/element", element);

      // side pane - health-manager rendered
      const isHpSidePane =
        element?.className?.trim() === "ct-health-manager" || // initial render
        element?.parentElement?.className?.trim() ===
          "ct-health-manager__adjuster-new-value";
      if (isHpSidePane) {
        injectHpManager(doc);
      }

      // hp summary rendered
      const isHpSummary =
        element?.className?.trim() === "ct-health-summary__hp";
      if (isHpSummary) {
        injectHpSummary(doc);
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
        injectDeathSavePane(doc);
      }

      // preference pane rendered
      const inactiveToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-disabled ddbc-toggle-field--is-interactive"
      )[0];
      const activeToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
      )[0];
      if (inactiveToggle || activeToggle) {
        injectPreferencesPane(doc);
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
