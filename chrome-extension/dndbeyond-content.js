import { DNDBEYOND_PORT_ID, EVENT_FROM_DNDBEYOND } from "./common.js";
import {
  connectContentScript,
  notifyBackgroundScript,
} from "./communication.js";

console.log("=>> dndbeyond - hello from contentScript");

// todo extract dndbeyond logic into seperate scripts
// => (characters, monsters, vehicles, spells, equipment, sources, classes, encounters)

/**
 * inject script inside document to get control of DOM
 * https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
 */
var s = document.createElement("script");
s.src = chrome.runtime.getURL("dndbeyond-injection.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// connect to background.js
const port = connectContentScript(DNDBEYOND_PORT_ID);

/**
 * Listens for messages from injection-script ("dndbeyond-sync-from-beyond" DOM events).
 */
function listenForDOMEvents() {
  document.addEventListener(EVENT_FROM_DNDBEYOND, (args) => {
    console.log("content: received args", args);
    notifyBackgroundScript(port, args.detail);
  });
}

/**
 * Listens for messages from background-script (port name: "dndbeyond-sync").
 */
function listenForIncomingEvents() {
  port.onMessage.addListener((msg) => {
    console.log("content: msg from background.js", msg);
    // todo notify injection.js
  });
}

listenForDOMEvents();
listenForIncomingEvents();
