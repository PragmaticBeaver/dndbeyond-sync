import { CHARACTER_URLS, getUserUrl, isGMInstance } from "./common.js";
import { loadData, saveData } from "./persistence.js";

/**
 * Dynamically injects the dndbeyond-sync settings menu into each PC ActorSheet as soon as render Hook is called.
 * @param {string[]} sheetIds ActorSheet ID's of player characters
 * @returns {boolean}
 */
export function injectSettingsMenu(sheetIds) {
  if (!isGMInstance()) {
    console.log("PC instance, skipping options button ...");
    return;
  }

  for (const id of sheetIds) {
    Hooks.on("render" + id, (_app, html, data) => {
      const actorId = data.actor._id;

      // custom icon
      const icon = document.createElement("i");
      icon.classList = "fab fa-d-and-d-beyond";

      // custom button
      const btn = document.createElement("button");
      btn.classList = "dndbeyondSync-menu-btn";
      btn.appendChild(icon);
      btn.onclick = () => {
        openActorConfigDialog(actorId);
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

function openActorConfigDialog(actorId) {
  const urls = loadData(CHARACTER_URLS) || {};
  const url = getUserUrl(actorId);

  /**
   * HTMLElement.outerHTML does't work for input.value!
   * => because of this, a string representation is necessary
   */
  const content =
    `
      <div>
        <input id="dndbeyondSync-pc-sync-input" type="text" placeholder="D&D Beyond URL ..." value="` +
    url +
    `">
      </div>
    `;

  let d = new Dialog({
    title: "D&D Beyond Sync - Actor settings",
    content,
    buttons: {
      done: {
        icon: '<i class="fas fa-save"></i>',
        label: "Done",
        callback: () => {
          const u = document.getElementById(
            "dndbeyondSync-pc-sync-input"
          ).value;
          urls[u] = actorId;
          saveData(CHARACTER_URLS, urls);
        },
      },
    },
    default: "close",
    render: (html) =>
      console.log("onRender - Register interactivity in the rendered dialog"),
    close: (html) => {
      console.log("closed dialog");
    },
  });
  d.render(true);
}
