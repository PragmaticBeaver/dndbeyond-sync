import {
  injectAbilities,
  injectAbilitySaves,
} from "./injections/inject-abilities.js";
import { injectSkills } from "./injections/inject-skills.js";
import { injectInitiative } from "./injections/inject-initiative.js";
import { listenForIncomingEvents } from "./communication-input.js";
import { observeDocument } from "./injections/observable-injections.js";
import { injectHpSummary } from "./injections/inject-hp.js";
import { injectDeathSaveSummary } from "./injections/inject-death-save.js";

// ENTRY FILE FOR D&D BEYOND CODE

/**
 * Injects DOM with callbacks.
 */
function inject() {
  console.log("injecting ...");
  const doc = document.documentElement;

  // todo handle errors / missing HTML elements and remove giant try-catch
  try {
    injectAbilities(doc);
    injectAbilitySaves(doc);
    injectSkills(doc);
    injectInitiative(doc);

    injectHpSummary(doc);
    injectDeathSaveSummary(doc);

    observeDocument(doc);
  } catch (err) {
    console.warn("injection error", err);
    return err;
  }
}

window.onload = () => {
  const interval = setInterval(() => {
    const error = inject();
    if (!error) {
      listenForIncomingEvents();
      clearInterval(interval);
    }
  }, 1000);
};

window.onunload = () => {
  console.log("D&D Beyond window unloaded");
  // im here to disable certain browser caching!
  // see: https://stackoverflow.com/questions/1033398/how-to-execute-a-function-when-page-has-fully-loaded
};
