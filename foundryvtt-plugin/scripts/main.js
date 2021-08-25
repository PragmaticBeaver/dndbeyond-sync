const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

/**
 * Dispatches custom DOM event on document using "EVENT_FROM_FOUNDRY" as key.
 * @param {*} blob message data
 */
export function notify(blob) {
  const syncEvent = new CustomEvent(EVENT_FROM_FOUNDRY, {
    detail: blob,
  });
  console.log("notify", EVENT_FROM_FOUNDRY, blob);
  document.dispatchEvent(syncEvent);
}

/**
 * Listens for messages from dndbeyond-sync extension ("dndbeyond-sync-to-foundry" DOM events).
 */
function listenForIncomingEvents() {
  document.addEventListener(EVENT_TO_FOUNDRY, (...args) => {
    console.log("received args", args);
    // todo mutate VTT
  });
}

Hooks.on("init", () => {
  console.log("dndbeyond-sync | initalizing ...");
  // todo check connection to browser-extension, only notify if connected ?
  // =>> DM could use ONLY FoundryVTT and does not wish to sync anything by himself
});

Hooks.on("ready", () => {
  console.log("dndbeyond-sync | starting ...");
  // todo sync between foundry and beyond
  //  ==>>  check for changes
  //  ==>>  show dialog to user and ask which side to sync (use Beyond data / use Foundry data)
  injectActorOptionsMenu();
  listenForIncomingEvents();
});

// gets called when ???
Hooks.on("updateActor", (actor, change, options, userId) => {
  console.log("actor-update from: " + userId);
  console.log(actor, change, options, userId);

  const currentUserId = game.userId;
  if (currentUserId !== userId) {
    return;
  }

  console.log("actor-update from myself");
  const blob = { actor: actor.data.name, change, userId };
  notify(blob);
});

// gets called when ???
Hooks.on("modifyTokenAttribute", (token, change, options, userId) => {
  console.log("modifyTokenAttribute from: " + userId);
  console.log(token, change, options, userId);
});

// gets called when item (what else?) has been droped onto actor-sheet
Hooks.on("dropActorSheetData", (actor, actorSheet, data) => {
  console.log("dropActorSheetData from: " + actor.userId);
  console.log(actor, actorSheet, data);

  // todo check for PC (dont want du handle NPC changes)
  // todo get userId of PC to send sync msg

  switch (data.type) {
    case "Item":
      // todo get item data
      break;
    default:
      console.log("unknwon type:" + data.type);
      break;
  }
});

// todo (are items, spells, and so on?)
Hooks.on("updateDocument", (document, change, options, userId) => {
  console.log("document-update from: " + userId);
  console.log(document, change, options, userId);

  const currentUserId = game.userId;
  if (currentUserId !== userId) {
    return;
  }

  console.log("document-update from myself");
  //todo
});

// todo
Hooks.on("updateCompendium", (pack, change, options, userId) => {
  console.log("compendium-update from: " + userId);
  console.log(pack, change, options, userId);
});

/**
 * todo
 *  => find a way to destinguish events (events are always meant for specific PC / GM)
 *  => idea: save beyond URL (including PC ID) inside Foundry PC sheet
 */

function injectActorOptionsMenu() {
  // todo only render for DM!
  const actorsTab = document.getElementById("actors");
  const menuBar = actorsTab.getElementsByClassName(
    "header-actions action-buttons flexrow"
  )[0];
  console.log("menuBar", menuBar);

  const icon = document.createElement("i");
  icon.classList = "fas fa-users-cog";

  const btn = document.createElement("button");
  btn.classList = "create-entity";
  btn.appendChild(icon);
  btn.innerHTML += "Configure Actor";
  btn.onclick = () => {
    console.log("configure actor clicked!");
  };

  menuBar.appendChild(btn);
}
