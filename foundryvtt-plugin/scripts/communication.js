import { EVENT_FROM_FOUNDRY, EVENT_TO_FOUNDRY } from "./common.js";

/**
 * Dispatches custom DOM event on document using "EVENT_FROM_FOUNDRY" as key.
 * @param {*} blob message data
 */
export function notify(blob) {
  const syncEvent = new CustomEvent(EVENT_FROM_FOUNDRY, {
    detail: blob,
  });
  console.log("notify", EVENT_FROM_FOUNDRY, blob);
  document.dispatchEvent(syncEvent);
}

/**
 * Listens for messages from dndbeyond-sync extension ("dndbeyond-sync-to-foundry" DOM events).
 */
export function listenForIncomingEvents() {
  document.addEventListener(EVENT_TO_FOUNDRY, (...args) => {
    console.log("received args", args);
    // todo mutate VTT
  });
}
