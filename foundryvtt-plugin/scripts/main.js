import { getPCSheetIds } from "./actor.js";
import { listenForIncomingEvents, notify } from "./communication.js";
import { isGMInstance } from "./common.js";

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
  injectPCsheetOptionsBtn(getPCSheetIds());
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

/**
 * Injects the dndbeyond-sync Button into each PC Sheet.
 */
function injectPCsheetOptionsBtn(sheetIds) {
  if (!isGMInstance()) {
    console.log("PC instance, skipping options button ...");
    return;
  }

  for (const id of sheetIds) {
    Hooks.on("render" + id, (app, html, data) => {
      console.log("render", html);

      // custom icon
      const icon = document.createElement("i");
      icon.classList = "fab fa-d-and-d-beyond";

      // custom button
      const btn = document.createElement("button");
      btn.classList = "dndbeyondSync-menu-btn";
      btn.appendChild(icon);
      btn.onclick = () => {
        console.log("configure actor clicked!");
        openActorConfigDialog();
      };

      // custom div for flex-row
      const container = document.createElement("div");
      container.classList = "dndbeyondSync-menu";
      container.appendChild(btn);

      // vanilla pc name container
      const plainHtml = html.get(0);
      const nameContainer = plainHtml.getElementsByClassName("charname")[0]; //h1
      nameContainer.classList = "dndbeyondSync-pc-name";

      // move PC name-input into div
      const nameInput = nameContainer.getElementsByTagName("input")[0];
      container.appendChild(nameInput);

      nameContainer.appendChild(container);
    });
  }
}

/**
 * todo
 *  => find a way to destinguish events (events are always meant for specific PC / GM)
 *  => idea: save beyond URL (including PC ID) inside Foundry PC sheet
 */

function openActorConfigDialog() {
  const container = document.createElement("div");
  container.innerText = "You must choose either Option 1, or Option 2";

  /**
   * todo
   *  =>> get all PCs
   *  =>> render PC icon, name, textfield with beyond url (empty if no url set)
   */

  const content = container.outerHTML;

  let d = new Dialog({
    title: "D&D Beyond Sync - Configure PCs",
    content,
    buttons: {
      done: {
        icon: '<i class="fas fa-check"></i>',
        label: "Done",
        callback: () => console.log("clicked done"),
      },
    },
    default: "done",
    render: (html) =>
      console.log("onRender - Register interactivity in the rendered dialog"),
    close: (html) => {
      console.log("closed dialog");
      // todo save into actor / actor-sheets (?)
    },
  });
  d.render(true);
}
