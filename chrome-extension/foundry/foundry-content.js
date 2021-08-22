import {
  EVENT_FROM_FOUNDRY,
  EVENT_TO_FOUNDRY,
  FOUNDRY_PORT_ID,
} from "../common.js";
import {
  connectContentScript,
  notify,
  notifyBackgroundScript,
} from "../communication.js";

console.log("=>> foundry - hello from contentScript");

/**
 * inject script inside document to get control of DOM
 * https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
 */
var s = document.createElement("script");
s.src = chrome.runtime.getURL("foundry-injection.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

// connect to background.js
const port = connectContentScript(FOUNDRY_PORT_ID);

/**
 * Listens for messages from injection-script ("dndbeyond-sync-from-foundry" DOM events).
 */
function listenForDOMEvents() {
  document.addEventListener(EVENT_FROM_FOUNDRY, (args) => {
    console.log("content: received args", args);
    notifyBackgroundScript(port, args.detail);
  });
}

/**
 * Listens for messages from background-script (port name: "foundry-sync").
 */
function listenForIncomingEvents() {
  port.onMessage.addListener((msg) => {
    console.log("content: msg from background.js", msg);
    notify(EVENT_TO_FOUNDRY, msg);
  });
}

listenForDOMEvents();
listenForIncomingEvents();

/**
 * todo - there are 2 options to proceed
 *  =>  throw events inside DOM and write Foundry plugin to handle these events
 *      =>> PRO - less effected by HTML chagnes inside foundry
 *      =>> CON - 2 seperate code-bases which need to be compatible with each other
 *  =>  read and mutate DOM to acchive results (like making ability checks)
 *      =>> PRO - less code split because of one code base
 *      =>> CON - more effected by HTML changes inside foundry
 *      =>> CON - unsure how to handle item addition to inventory (drag and drop actions)
 */
