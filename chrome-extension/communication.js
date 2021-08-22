export function connectContentScript(name) {
  return chrome.runtime.connect({ name });
}

export function notifyBackgroundScript(port, blob) {
  port.postMessage(blob);
}
