import { EVENT_FROM_FOUNDRY, EVENT_TO_FOUNDRY } from "../common.js";

console.log("=>> foundry - I was injected!");

/**
 * Listens for messages from content-script ("dndbeyond-sync-to-foundry" DOM events).
 */
function listenForIncomingEvents() {
  document.addEventListener(EVENT_TO_FOUNDRY, (...args) => {
    console.log("injection: received args", args);
    // todo mutate DOM
  });
}

/**
 * Dispatches custom DOM event on document using "dndbeyond-sync-from-foundry" as key.
 * @param {*} blob message data
 */
function notify(blob) {
  const syncEvent = new CustomEvent(EVENT_FROM_FOUNDRY, {
    detail: blob,
  });
  console.log("notify content-script", syncEvent);
  document.dispatchEvent(syncEvent);
}

function tryInject(mutations, observer) {
  console.log("DOM changed;");
  console.log(mutations, observer);

  const canvas = document.getElementById("board")[0];

  // todo add eventListeners

  if (canvas) {
    console.log("board has loaded", canvas);
    observer.disconnect();
  }
}

// observe document for DOM changes
const observer = new window.MutationObserver(tryInject);
observer.observe(document, {
  subtree: true,
  childList: true,
  characterData: true,
  subtree: true,
});

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
