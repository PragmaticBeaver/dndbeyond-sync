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
  const syncEvent = new CustomEvent(event, {
    detail: blob,
  });
  console.log("notify", event, blob);
  document.dispatchEvent(syncEvent);
}
