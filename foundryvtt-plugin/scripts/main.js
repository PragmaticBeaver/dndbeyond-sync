import { getPCSheetIds } from "./actor.js";
import { listenForIncomingEvents, notify } from "./communication.js";
import { injectSettingsMenu } from "./settings-menu.js";

/**
 * todo
 *  => find a way to destinguish events (events are always meant for specific PC / GM)
 */

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
  injectSettingsMenu(getPCSheetIds());
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

Hooks.on("renderDocument", (...args) => {
  console.log("renderDocument", args);
});
