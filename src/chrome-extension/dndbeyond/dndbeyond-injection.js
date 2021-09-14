import { reduceSidePane } from "../common.js";
import {
  injectAbilities,
  injectAbilitySaves,
} from "./injections/inject-abilities.js";
import { injectSkills } from "./injections/inject-skills.js";
import { injectInitiative } from "./injections/inject-initiative.js";
import { listenForIncomingEvents } from "./communication-input.js";
import { observeDocument } from "./injections/observable-injections.js";
import { injectPreferencesPane } from "./injections/inject-preferences-pane.js";
import { injectHpSummary } from "./injections/inject-hp.js";
import { injectDeathSaveSummary } from "./injections/inject-death-save.js";

// ENTRY FILE FOR D&D BEYOND CODE

/**
 * Disable native D&D Beyond dice rolling on startup.
 * (Clashes with extension!)
 */
function disableDiceRolling(doc) {
  // open side pane
  const settingsBtn = doc.getElementsByClassName(
    "ddbc-character-tidbits__menu-callout"
  )[0];
  settingsBtn.click();

  // click "Preferences"
  const manageCharPane = doc.getElementsByClassName(
    "ct-character-manage-pane"
  )[0];
  const menuBtns = manageCharPane.getElementsByClassName("ct-pane-menu__item");
  const btn = Array.from(menuBtns).find((mBtn) => {
    const label = mBtn.getElementsByClassName("ct-pane-menu__item-label")[0];
    if (label.innerText.toLowerCase() === "preferences") {
      return mBtn;
    }
  });
  btn.click();

  injectPreferencesPane(doc);
  reduceSidePane(doc);
}

/**
 * Injects DOM with callbacks.
 */
function inject() {
  console.log("injecting ...");
  const doc = document.documentElement;

  // todo handle errors / missing HTML elements and remove giant try-catch
  try {
    disableDiceRolling(doc);

    injectAbilities(doc);
    injectAbilitySaves(doc);
    injectSkills(doc);
    injectInitiative(doc);

    injectHpSummary(doc);
    injectDeathSaveSummary(doc);

    observeDocument(doc);
  } catch (err) {
    console.warn("injection error", err);
    return false;
  }

  return true;
}

window.onload = () => {
  const interval = setInterval(() => {
    listenForIncomingEvents();
    const hasInjected = inject();
    if (hasInjected) {
      clearInterval(interval);
    }
  }, 1000);
};

window.onunload = () => {
  console.log("window unloaded");
  // im here to disable certain browser caching!
  // see: https://stackoverflow.com/questions/1033398/how-to-execute-a-function-when-page-has-fully-loaded
};
