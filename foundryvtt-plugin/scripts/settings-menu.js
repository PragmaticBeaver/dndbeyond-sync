import { isGMInstance } from "./common.js";
import { CHARACTER_URLS, getFlag, setFlag } from "./data-flags.js";

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
    Hooks.on("render" + id, (_app, html, _data) => {
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

function openActorConfigDialog() {
  const url = getFlag(game.user, CHARACTER_URLS) || "";

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
    title: "D&D Beyond Sync - Configure PC",
    content,
    buttons: {
      done: {
        icon: '<i class="fas fa-save"></i>',
        label: "Done",
        callback: () => {
          console.log("clicked done");
          const url = document.getElementById(
            "dndbeyondSync-pc-sync-input"
          ).value;

          setFlag(game.user, CHARACTER_URLS, url);
        },
      },
    },
    default: "done",
    render: (html) =>
      console.log("onRender - Register interactivity in the rendered dialog"),
    close: (html) => {
      console.log("closed dialog");
    },
  });
  d.render(true);
}
