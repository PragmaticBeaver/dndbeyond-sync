console.log("hello world");

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

function onMessage(request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
}

// react to msg
chrome.runtime.onMessage.addListener(onMessage);

// send msg
function sendMessageTo(url, request) {
  chrome.tabs.query({ url }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, request);
    }
  });
}

function sendMessageToBeyond(request) {
  sendMessageTo(DNDBEYOND_CHARACTER_URL, request);
  sendMessageTo(DNDBEYOND_MONSTER_URL, request);
  sendMessageTo(DNDBEYOND_ENCOUNTER_URL, request);
  sendMessageTo(DNDBEYOND_ENCOUNTERS_URL, request);
  sendMessageTo(DNDBEYOND_COMBAT_URL, request);
  sendMessageTo(DNDBEYOND_SPELL_URL, request);
  sendMessageTo(DNDBEYOND_VEHICLE_URL, request);
  sendMessageTo(DNDBEYOND_SOURCES_URL, request);
  sendMessageTo(DNDBEYOND_CLASSES_URL, request);
}
