console.log("hello from background.js");

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

function handleBeyondConnection(port) {
  port.onMessage.addListener((msg) => {
    // todo
    console.log("msg from beyond", msg);
  });
}

function handleFoundryConnection(port) {
  port.onMessage.addListener((msg) => {
    // todo
    console.log("msg from foundry", msg);
  });
}

// listen for connections
chrome.runtime.onConnect.addListener((port) => {
  console.log("port", port);

  switch (port.name) {
    case "dndbeyond-sync":
      handleBeyondConnection(port);
      break;
    case "foundry-sync":
      handleFoundryConnection(port);
      break;
    default:
      return;
  }
});
