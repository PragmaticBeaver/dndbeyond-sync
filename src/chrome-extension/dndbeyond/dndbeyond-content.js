import {
  DNDBEYOND_PORT_ID,
  EVENT_FROM_DNDBEYOND,
  EVENT_TO_DNDBEYOND,
} from "../common.js";
import {
  connectContentScript,
  notify,
  notifyBackgroundScript,
} from "../communication.js";

// todo extract dndbeyond logic into seperate scripts
// => (characters, monsters, vehicles, spells, equipment, sources, classes, encounters)

/**
 * inject script inside document to get control of DOM
 * https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
 */
const s = document.createElement("script");
s.src = chrome.runtime.getURL("dndbeyond-injection.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// inject custom css
const l = document.createElement("link");
l.href = chrome.runtime.getURL("dndbeyond-injection.css");
l.type = "text/css";
l.rel = "stylesheet";
l.media = "screen,print";
document.head.appendChild(l);

// connect to background.js
const port = connectContentScript(DNDBEYOND_PORT_ID);

/**
 * Listens for messages from injection-script ("dndbeyond-sync-from-beyond" DOM events).
 */
function listenForDOMEvents() {
  document.addEventListener(EVENT_FROM_DNDBEYOND, (args) => {
    // console.log("content: received args", args);
    notifyBackgroundScript(port, args.detail);
  });
}

/**
 * Listens for messages from background-script (port name: "dndbeyond-sync").
 */
function listenForIncomingEvents() {
  port.onMessage.addListener((msg) => {
    // console.log("content: msg from background.js", msg);
    notify(EVENT_TO_DNDBEYOND, msg);
  });
}

listenForDOMEvents();
listenForIncomingEvents();
