console.log("hello from the service_worker");

const FOUNDRYVTT_URL = "*://*/game";
const DNDBEYOND_CHARACTER_URL = "*://*.dndbeyond.com/*characters/*";
const DNDBEYOND_MONSTER_URL = "*://*.dndbeyond.com/monsters/*";
const DNDBEYOND_ENCOUNTER_URL = "*://*.dndbeyond.com/encounters/*";
const DNDBEYOND_ENCOUNTERS_URL = "*://*.dndbeyond.com/my-encounters";
const DNDBEYOND_COMBAT_URL = "*://*.dndbeyond.com/combat-tracker/*";
const DNDBEYOND_SPELL_URL = "*://*.dndbeyond.com/spells/*";
const DNDBEYOND_VEHICLE_URL = "*://*.dndbeyond.com/vehicles/*";
const DNDBEYOND_SOURCES_URL = "*://*.dndbeyond.com/sources/*";
const DNDBEYOND_CLASSES_URL = "*://*.dndbeyond.com/classes/*";

// // react to msg
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("onMessage:");
//   console.log(message, sender, sendResponse);
//   sendResponse(message + " to you");
// });

// // send msg
// function sendMessageTo(url, message) {
//   // chrome.tabs.query({ url }, (tabs) => {
//   //   for (let tab of tabs) {
//   //     chrome.tabs.sendMessage(tab.id, request);
//   //   }
//   // });
//   chrome.runtime.sendMessage("hello", (response) => {
//     console.log("sendMessage response:");
//     console.log(response);
//   });
// }

// function sendMessageToBeyond(message) {
//   console.log("sending msg to beyond ...");
//   sendMessageTo(DNDBEYOND_CHARACTER_URL, message);
//   // sendMessageTo(DNDBEYOND_MONSTER_URL, message);
//   // sendMessageTo(DNDBEYOND_ENCOUNTER_URL, message);
//   // sendMessageTo(DNDBEYOND_ENCOUNTERS_URL, message);
//   // sendMessageTo(DNDBEYOND_COMBAT_URL, message);
//   // sendMessageTo(DNDBEYOND_SPELL_URL, message);
//   // sendMessageTo(DNDBEYOND_VEHICLE_URL, message);
//   // sendMessageTo(DNDBEYOND_SOURCES_URL, message);
//   // sendMessageTo(DNDBEYOND_CLASSES_URL, message);
// }

// // temp
// chrome.alarms.onAlarm.addListener((alarm) => {
//   sendMessageToBeyond("test");
// });
// chrome.alarms.create("Start", { when: Date.now() + 5000 });
