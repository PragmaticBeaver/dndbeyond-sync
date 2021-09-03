let suppress = false;

/**
 * Set event supression to enable / disable throw of snyc events to D&D Beyond.
 * @param {boolean} val
 */
export function supressMessages(val) {
  suppress = val;
  console.log("msg supression", suppress);
}

/**
 * Gets the current event supression.
 * @returns {boolean}
 */
export function shouldSuppressMsg() {
  return suppress;
}

export function connectContentScript(name) {
  return chrome.runtime.connect({ name });
}

export function notifyBackgroundScript(port, blob) {
  port.postMessage(blob);
}

/**
 * Dispatches custom DOM event on document using "event" as key.
 * @param {string} eventName event key
 * @param {SyncEvent} evt message data
 */
export function notify(eventName, evt) {
  if (shouldSuppressMsg()) {
    console.log("suppressed", eventName, evt);
    supressMessages(false);
    return;
  }

  const syncEvent = new CustomEvent(eventName, {
    detail: evt,
  });
  console.log("notify", eventName, evt);
  document.dispatchEvent(syncEvent);
}
