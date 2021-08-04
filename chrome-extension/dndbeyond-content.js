console.log("=>> hello from contentScript");

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

// receive msg from injection.js
document.addEventListener("dndbeyond-sync-from-beyond", (...args) => {
  console.log("received args:");
  console.log(args);
});

// send msg to injection.js
// timeout for test reasons
const syncEvent = new CustomEvent("dndbeyond-sync-to-beyond", {
  detail: { change: "sync-to-beyond" },
});
setTimeout(() => {
  document.dispatchEvent(syncEvent);
}, 1000);
