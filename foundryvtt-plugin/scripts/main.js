const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

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
  // todo establish connection between plugin and browser extension

  // todo check connection to beyond plugin, only notify if connected ?
  // =>> DM could use ONLY FoundryVTT and does not wish to sync anything by himself
});

Hooks.on("ready", () => {
  console.log("dndbeyond-sync | starting ...");
  // todo check for changes between foundry and beyond
  listenForIncomingEvents();
});

Hooks.on("updateActor", (actor, change, options, userId) => {
  console.log("actor-update from: " + userId);
  console.log(actor, change, options, userId);

  const currentUserId = game.userId;
  if (currentUserId !== userId) {
    return;
  }

  console.log("actor-update from myself");
  // todo notify beyond
});

Hooks.on("modifyTokenAttribute", (token, change, options, userId) => {
  console.log("modifyTokenAttribute from: " + userId);
  console.log(token, change, options, userId);
});

// gets called if item (what else?) has been droped onto actor-sheet
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

// // todo (are items, spells, and so on?)
// Hooks.on("updateDocument", (document, change, options, userId) => {
//     console.log("document-update from: " + userId);
//     console.log(document, change, options, userId);

//     const currentUserId = game.userId;
//     if (currentUserId !== userId) {
//         return;
//     }

//     console.log("document-update from myself");

//     //todo
// });

// Hooks.on("updateCompendium", (pack, change, options, userId) => {
//     console.log("compendium-update from: " + userId);
//     console.log(pack, change, options, userId);
// });
