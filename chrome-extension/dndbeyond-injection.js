console.log("=>> I was injected!");
console.log(document);

/**
 * todo
 *  receive msg's => document.addEventListener
 *  send msg's => document.dispatchEvent
 */

function onDOMChanged(mutation, observer) {
  console.log("DOM changed;");
  console.log(mutation, observer);
}

// observe document for DOM changes
const observer = new window.MutationObserver(onDOMChanged);
observer.observe(document, {
  subtree: true,
  childList: true,
  characterData: true,
});
// todo observer.disconnect(); ?

// reveive msg from content.js
document.addEventListener("dndbeyond-sync-to-beyond", (...args) => {
  console.log("received args:");
  console.log(args);
});

// send msg to content.js
const syncEvent = new CustomEvent("dndbeyond-sync-from-beyond", {
  detail: { change: "sync-from-beyond" },
});
document.dispatchEvent(syncEvent);
