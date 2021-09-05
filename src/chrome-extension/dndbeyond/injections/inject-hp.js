import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../../common.js";
import { notify } from "../../communication.js";
import { UPDATE_FROM_BEYOND_HP, createSyncEvent } from "../../../global.js";

let lastHpMutation = undefined;

export function handleHPChange(val) {
  // todo mutation handle => innerText changed || render death-save element
  if (val === lastHpMutation) {
    console.log("same HP skipping message");
    return;
  }
  lastHpMutation = val;
  const evt = createSyncEvent(UPDATE_FROM_BEYOND_HP, val, getUserUrl());
  notify(EVENT_FROM_DNDBEYOND, evt);
}

export function injectHpSummary(doc) {
  // todo set element with id and check for that id; don't execute if id exists!
  console.log("injectHp");
  // todo
}

export function injectHpManager(doc) {
  // todo set element with id and check for that id; don't execute if id exists!
  console.log("injectHpManager");
  // todo
  // override apply button so it WONT ask for approval!
}
