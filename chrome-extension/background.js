import { DNDBEYOND_PORT_ID, FOUNDRY_PORT_ID } from "./common.js";

console.log("hello from background.js");

// const FOUNDRYVTT_URL = "*://*/game";
// const DNDBEYOND_CHARACTER_URL = "*://*.dndbeyond.com/*characters/*";
// const DNDBEYOND_MONSTER_URL = "*://*.dndbeyond.com/monsters/*";
// const DNDBEYOND_ENCOUNTER_URL = "*://*.dndbeyond.com/encounters/*";
// const DNDBEYOND_ENCOUNTERS_URL = "*://*.dndbeyond.com/my-encounters";
// const DNDBEYOND_COMBAT_URL = "*://*.dndbeyond.com/combat-tracker/*";
// const DNDBEYOND_SPELL_URL = "*://*.dndbeyond.com/spells/*";
// const DNDBEYOND_VEHICLE_URL = "*://*.dndbeyond.com/vehicles/*";
// const DNDBEYOND_SOURCES_URL = "*://*.dndbeyond.com/sources/*";
// const DNDBEYOND_CLASSES_URL = "*://*.dndbeyond.com/classes/*";

const PORTS = {};

function cachePort(port) {
  console.log("adding port", port.name);
  PORTS[port.name] = port;
}

function removePort(port) {
  console.log("removing port", port.name);
  delete PORTS[port.name];
}

function handleBeyondConnection(port) {
  port.onMessage.addListener((msg) => {
    console.log("msg from beyond", msg);
    const foundryPort = PORTS[FOUNDRY_PORT_ID];
    if (foundryPort) {
      foundryPort.postMessage(msg);
    }
  });

  port.onDisconnect.addListener(() => {
    removePort(port);
  });

  cachePort(port);
}

function handleFoundryConnection(port) {
  port.onMessage.addListener((msg) => {
    console.log("msg from foundry", msg);
    const beyondPort = PORTS[DNDBEYOND_PORT_ID];
    if (beyondPort) {
      beyondPort.postMessage(msg);
    }
  });

  port.onDisconnect.addListener(() => {
    removePort(port);
  });

  cachePort(port);
}

// listen for connections
chrome.runtime.onConnect.addListener((port) => {
  console.log("port", port);

  switch (port.name) {
    case DNDBEYOND_PORT_ID:
      handleBeyondConnection(port);
      break;
    case FOUNDRY_PORT_ID:
      handleFoundryConnection(port);
      break;
    default:
      return;
  }
});
