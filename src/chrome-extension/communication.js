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
 * @param {string} event event key
 * @param {*} blob message data
 */
export function notify(event, blob) {
  if (shouldSuppressMsg()) {
    console.log("suppressed", event, blob);
    supressMessages(false);
    return;
  }

  const syncEvent = new CustomEvent(event, {
    detail: blob,
  });
  console.log("notify", event, blob);
  document.dispatchEvent(syncEvent);
}
