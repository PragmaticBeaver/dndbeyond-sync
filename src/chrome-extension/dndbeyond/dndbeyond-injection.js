import { EVENT_TO_DNDBEYOND, reduceSidePane } from "../common.js";
import { injectAbilities, injectAbilitySaves } from "./inject-abilities.js";
import { injectSkills } from "./inject-skills.js";
import { injectDeathSave } from "./inject-death-save.js";
import { injectInitiative } from "./inject-initiative.js";
import { updateDeathSave } from "./update-death-save.js";
import {
  UPDATE_FROM_FOUNDRY_DEATH_SAVE,
  UPDATE_FROM_FOUNDRY_HP,
} from "../../global.js";
import { updateHP } from "./update-hp.js";
import { injectHP } from "./inject-hp.js";
import { supressMessages, shouldSuppressMsg } from "../communication.js";

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

  overridePreferencesPane(doc);
  reduceSidePane(doc);
}

// todo - override preferences pane whenever it gets rendered
// ct-preferences-pane
function overridePreferencesPane(doc) {
  // disable dice rolling
  const preferencesPane = doc.getElementsByClassName("ct-preferences-pane")[0];
  const fields = preferencesPane.getElementsByClassName(
    "ct-preferences-pane__field ct-preferences-pane__field--toggle"
  );
  const field = Array.from(fields).find((f) => {
    const heading = f.getElementsByClassName(
      "ct-sidebar__subheading ct-preferences-pane__field-heading"
    )[0].innerText;
    if (heading.toLowerCase() === "dice rolling") {
      return f;
    }
  });
  const toggleContainer = field.getElementsByClassName(
    "ct-preferences-pane__field-input"
  )[0];
  const toggle = field.getElementsByClassName(
    "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
  )[0];
  if (toggle) {
    toggle.click();
  }

  // hide toggle
  toggleContainer.style = "display: none;";

  // set custom text
  const desc = field.getElementsByClassName(
    "ct-preferences-pane__field-description"
  )[0];
  desc.innerText = "Disabled by browser extension 'D&D Beyond Sync'.";
}

/**
 * Observes side pane with preferences to override settings (dice rolling).
 */
function observePreferencePane() {
  const observer = new window.MutationObserver((mutations, _observer) => {
    const importantMutations = mutations.filter((m) => {
      const element = m.target;
      const inactiveToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-disabled ddbc-toggle-field--is-interactive"
      )[0];
      const activeToggle = element.getElementsByClassName(
        "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
      )[0];

      if (inactiveToggle || activeToggle) {
        return m;
      }
    });

    const preferencesPaneRendered =
      importantMutations && importantMutations.length > 0;
    if (!preferencesPaneRendered) {
      return;
    }
    overridePreferencesPane(document);
  });
  observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
}

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-beyond" DOM events).
 */
function listenForIncomingEvents() {
  // todo create event type for updates
  document.addEventListener(EVENT_TO_DNDBEYOND, (args) => {
    const evt = args.detail;
    // console.log("event", evt);

    const suppress = evt.suppress;
    supressMessages(suppress);
    console.log("suppress msg", suppress);

    switch (evt.type) {
      case UPDATE_FROM_FOUNDRY_DEATH_SAVE:
        updateDeathSave(evt.value);
        break;
      case UPDATE_FROM_FOUNDRY_HP:
        updateHP(evt.value);
        break;
    }

    // HP (also part of death-save, because crit-success = 1 HP!)
    // todo mutate DOM
  });
}

/**
 * Injects DOM with callbacks.
 */
function inject() {
  console.log("injecting ...");
  const doc = document.documentElement;

  disableDiceRolling(doc);
  injectAbilities(doc);
  injectAbilitySaves(doc);
  // injectSkills(doc);
  // injectInitiative(doc);
  // injectDeathSave(doc);
  // injectHP(doc);
  observePreferencePane();
}

/**
 * todo deathSave-container will only be rendered when PC loses all of his/her HP.
 * how to handle?
 *  => can't find "roll death save"-button
 *  => may need to inject own button for "death save roll" which will ask foundry to make a roll
 *    =>> needs to notify beyond about return
 */

const interval = setInterval(() => {
  if (document.readyState !== "complete") {
    return;
  }
  inject();
  listenForIncomingEvents();
  clearInterval(interval);
}, 1000);
