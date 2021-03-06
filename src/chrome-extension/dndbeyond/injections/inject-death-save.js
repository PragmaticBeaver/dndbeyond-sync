import { EVENT_FROM_DNDBEYOND, getUserUrl } from "../../common.js";
import { notify } from "../../communication.js";
import {
  UPDATE_FROM_BEYOND_DEATH_SAVE,
  createSyncEvent,
  ROLL_DEATH_SAVE,
} from "../../../global.js";

/**
 * Injects button into death-save summary (where HP is usually show) of D&D Beyond.
 * @param {Document} doc
 * @returns {void}
 */
export function injectDeathSaveSummary(doc) {
  // todo set element with id and check for that id; don't execute if id exists!
  console.log("injectDeathSaveSummary");
  // todo
}

/**
 * Injects button into death-save side pane of D&D Beyond.
 * @param {Document} doc
 * @returns {void}
 */
export function injectDeathSavePane(doc) {
  const beyondSyncBtn = document.getElementById("dndbeyond-sync-deathsave-btn");
  if (beyondSyncBtn) {
    return;
  }

  const pane = doc.getElementsByClassName("ct-sidebar__pane")[0];
  if (!pane) {
    return;
  }

  // deathsaves will only be rendered when the PC has 0 HP
  const deathSaveContainer = pane.getElementsByClassName(
    "ct-health-manager__deathsaves"
  )[0];
  if (!deathSaveContainer) {
    return;
  }

  const heading = deathSaveContainer.getElementsByClassName(
    "ct-sidebar__subheading"
  )[0];
  if (!heading) {
    return;
  }

  // mutate heading for flex
  heading.style = "display: flex;justify-content: space-between;";

  // move text inside P
  const text = document.createElement("p");
  text.innerHTML = heading.innerHTML;
  text.style = "margin: 0px !important; align-self: center;";
  heading.innerHTML = "";
  heading.appendChild(text);

  // icon
  const beyondLogoStyle = 'style="width: 40px; maxWidth: 40px"';
  const beyondLogoSvg =
    `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 399.5 126.7"` +
    beyondLogoStyle +
    `xml:space="preserve">
    <style type="text/css">
      .st0{fill:#E40712;}
      .st1{fill:#FFFFFF;}
    </style>
    <g>
      <path class="st0" d="M178.5,38c0-0.6,0.1-1.6,0.3-3.3c0.2-1.7,1.3-6.7,5.7-9.5c-0.2,0-0.5-0.1-0.7-0.1c-0.6,0-2.4-0.1-4.9,0.8
        c1-1.5,4.7-4,6.1-4.7c0.1-0.1,0.3-0.2,0.4-0.2c-1.6-5.1-5-9.3-9.8-11.8c-3-1.6-6.1-2.4-10.3-2.5v0h-8.4c-6.7,0-9.8-0.1-12.2-0.6
        c-2-0.5-3.8-1.6-3.8-1.6l-0.5-0.3l0.1,0.6c0,0.2,0.5,4.7,5.9,8.7c1,0.8,1.8,1.5,1.8,4.1v24.2c0,2.6-0.5,3.3-1.7,4
        c-1.3,0.8-4,2.3-4,2.4l-0.9,0.5h21.9c6.1,0,10-1,14.1-3.8c0.8-0.5,1.5-1.1,2.1-1.6c-0.4-3.1,0.1-5.9,0.5-7.5
        C180.2,35.7,179.1,36.7,178.5,38z M164.5,38.5h-4.7V16.9h4.7c6.2,0,9.7,3.9,9.7,10.8C174.2,34.6,170.7,38.5,164.5,38.5z
        M225.2,43.9c0.4-0.8,0.6-1.8,0.6-2.8c0-1-0.3-2-0.7-2.8l1.2,0.2c0.8,0.1,2.3,1.1,2.3,2.6C228.6,42.9,226.8,43.7,225.2,43.9z
        M248.4,44.9c-4.2,2.8-8,3.8-14.1,3.8h-0.2c1-1.2,1.5-2.8,1.5-4.4c0-2.3-1.1-4.4-2.9-5.8h2.6c6.2,0,9.7-3.9,9.7-10.8
        c0-6.9-3.5-10.8-9.7-10.8h-4.7v2.7c-0.7-0.1-1.3-0.2-2-0.2c-1.1,0-2.4,0.2-2.7,0.4c1.3-1.1,2.8-1.6,3.8-1.8c-4.4-1-8.5,1.5-9.1,2.2
        c0.5-1.1,1.5-2.1,2.2-2.8c-1.4,0.5-2.7,1.2-3.8,1.9v-1.8c0-2.7-0.7-3.4-1.8-4.1c-5.4-3.9-5.9-8.5-5.9-8.7l-0.1-0.6l0.5,0.3
        c0,0,1.8,1.2,3.8,1.6c2.3,0.5,5.5,0.6,12.2,0.6h8.4v0c4.2,0.2,7.3,0.9,10.3,2.5c6.8,3.5,10.8,10.4,10.8,18.4
        c0,4.9-1.6,9.7-4.4,13.1C251.7,42.3,250.2,43.7,248.4,44.9z M227.2,36.6c-1.5,0-3.1,0.3-3.1,0.3c-0.3-0.3-2.3-1.8-3.2-2
        c1.6,1.7,1.1,3.5,0.7,4.1c-0.3,0.5-0.9,0.8-1.4,0.8c-0.4,0-0.8-0.1-1.2-0.4v-9.8c0.4-0.5,0.8-1.1,1.3-1.6c1.1-1.3,2.9-2.1,4.7-2.1
        c1.1,0,2.2,0.3,2.9,0.9l0.6,0.4l0.5-0.5c0.3-0.3,1-0.6,1.7-0.9v11.5C229.6,36.8,228.5,36.6,227.2,36.6z M225.2,23
        c-3.7-0.5-9.4,2-12.3,5.6c0.6-2.4,3.2-6.3,6.4-8.1c0,0-1.6,2-0.9,2.3c1,0.5,3.6-3.6,7-3.7c0,0-2.5,1.2-2,2.1c0.4,0.6,2.1-0.8,5-0.8
        c3.6,0,6.8,2.2,8.3,3.9c-2.5-0.7-7.2,0.5-8.6,1.7c-2.1-1.6-6.2-1.4-8.5,1.3c-2.9,3.3-4.7,7.2-5.2,8.4c-1-0.8-1.9-1.5-2.5-2
        c-0.5-0.4-1-0.6-1.5-0.8C213.1,29.1,218.7,23.3,225.2,23z M186.2,11.8c-0.4-4.7,1.8-7.3,2.8-8.4c2.2-2.3,5.2-3.6,9.7-3.4
        c7,0.4,10.4,5.2,10.4,10.3c0,2.7-1.4,6.3-3.4,8.6c-0.1-0.1-0.3-0.3-0.4-0.4c-1.3-1.2-3.2-2.7-4.4-4.5c2.4-3.5,1.4-9-2.9-9
        c-2.7,0-4.9,2.8-4,6.2c-0.4,1.5-0.6,3.5-0.3,5c-3.1-1.6-4.1-3.7-4.7-5.6c-0.8,1.6-1.3,3.8-0.7,5.9
        C188.3,16.7,186.5,15.1,186.2,11.8z M188,20.3c-0.3,1.1-4.4,2.3-6.4,4.3c3-0.6,4.4-0.1,4.9,1.1c0.3,0.9-0.1,2.1-0.3,3.5
        c1-1.1,4.4-3.4,6.9-3.9c-0.6-0.2-2.1-0.5-2.7-0.5c1.8-2.1,5.8-2.8,8-2.3c-1.4-0.1-4.2,0.7-5.3,1.6c1,0.2,1.9,0.4,2.7,0.7
        c-1.3,0.5-3,2.1-3.6,3.8c1.7-1.2,5.2-0.9,5.8,1.6c0.4,1.7-0.8,3.2-1.4,3.5c0.5,0.1,1.7,0,2.2-0.3c-0.2,0.7-1.2,1.9-1.9,2.1
        c1.8,0,4.4-1.2,5.1-2.9c0,0-1.1,0.4-1.6-0.1c-0.5-0.5,0.2-2.7,0.2-2.7s-0.7,0.9-1.3,0.4c-0.6-0.6,0.2-2.6,0.5-3
        c-0.6-0.2-2.2-0.4-2.9-0.3c2-0.7,6.5-1.1,7-0.2c0.4,0.7-0.6,2.1-0.6,2.1c0.8-0.1,3.1,0,3.9,0.9c0.8,1,0.3,2.3,0.3,2.3
        c1.8-0.9,3.4-3.7,3-6.5c-0.2,0.6-1,1.5-1.8,1.7c0.1-0.9-0.6-1.4-1.2-1.6c0.3-1.7-0.4-3.9-2.9-6.3c-2.1-2.1-6.1-4.9-5.9-8.6
        c-0.6,0.8-1.1,3.1-0.5,4.4c1.7,2,5.4,4.2,6.3,7.6c-1.6-4-9.4-7.1-9.1-12.6c-1,1-1.6,4.9-0.8,6.9c1.5,0.9,2.8,2.4,3,3.8
        c-1.4-3.2-7.1-3.8-8.7-7.6c-0.4,1.4-0.2,3.1,0.6,4.2c0,0-1.4-0.5-4.4-0.4C186.1,17.4,188.2,19.2,188,20.3z M204.2,24.9
        c-1.7,0-2.2-1.3-2.6-2.7C203.6,23,204.2,24.9,204.2,24.9z M226,51c1.2,1.1,4.1,1.9,5.6,1.2c-0.9,1.6-5.1,3.8-9,2.8
        c-3.7-1-5.4-4.5-5.4-6.8c-1.8,1.8-1.3,4.6,0,5.8c-1.4-0.4-3.6-1.9-4-4.6c-0.3-2.3,1-5-1.4-7.1c-1.4-1.3-3.7-3.1-5.1-4.2
        c-3-2.3-1.9-4.1-2.5-5.3c-0.5-1-1.8-1.5-2.5-2.4c-0.8-0.9-0.7-2.2-0.3-2.9c-0.1,1,0.6,1.8,1.6,2.2c1.1,0.4,2,0.1,3,0.6
        c1.1,0.7,0.6,2.4,1.4,3.1c0.7,0.5,2.6-0.2,4.1,1.1c1.6,1.3,5.1,4.2,6.6,5.4c2.7,2.2,5.5-0.3,4.6-2.9c2.8,1.6,3.1,6.2,0.8,7.8
        c2.2,0.5,6.1-0.5,6.1-3.6c0-1.9-1.8-3.3-3-3.5c4.5-0.4,8.4,2.7,8.4,6.7C234.8,48.4,230.7,51.6,226,51z M211.1,42.8
        c0.1,0.1,0.2,0.2,0.3,0.3c-2.4,4.9-6.9,11.2-15.5,11.2c-3.1,0-5.9-1.1-7.9-2.6c-0.7-0.5-1.3-1.1-1.8-1.8h0c0,0,0,0,0,0
        c-0.3-0.4-0.6-0.7-0.9-1.1c-0.4-0.5-0.7-0.5-0.9-0.2c-0.4,0.6,0.3,2.5,0.3,2.5c-6.8-6.4-3.3-15.8-3.2-16.2c0.4-1.2,0-1.4-0.4-1.2
        c-0.6,0.2-1.3,1.2-1.3,1.2c0.5-5.7,5.8-9.2,5.8-9.2c0,0,0.1,0.1,0.1,0.1c0.6,0.9-0.3,2-0.4,5.6c1-1.4,4.9-4.1,7.1-4.9
        c-0.7,0.9-1.3,2.2-1.3,4.1c0,0,1.6-1.8,3.6-1.8c0.5,0,1,0.1,1.4,0.3c-7.6,7.4-4.4,16.6,2,16.6c3.6,0,7.2-4,8.7-6.7
        C207.9,40.1,209.8,41.7,211.1,42.8z"/>
      <path class="st1" d="M221.3,64.7c-17.7,0-35.5,12.1-35.5,31.4c0,20,17.7,30.6,35.3,30.6c17.8,0,35.6-10.5,35.6-30.6
        C256.7,76.3,239,64.7,221.3,64.7z M221.1,113.1c-7.8,0-17.4-5.9-17.4-17c0-11.4,9-17.5,17.5-17.5c7.8,0,17.7,5.4,17.7,17.7
        C238.9,108,229,113.1,221.1,113.1z"/>
      <path class="st1" d="M302.7,66.6h24.5l-4.6,5.2v53.2h-13.3c-2.5-7.9-28-28.1-30.3-34.7h-0.2v29.6l4.6,5.1h-24.3l4.5-5.2V71.8
        l-4.6-5.3h19.7c1.8,5.9,24.8,22.8,28.2,31.8h0.2V71.8L302.7,66.6z"/>
      <path class="st1" d="M361.8,65.3c-12.9,0-25,0.8-31.4,1.3l4.6,5.1v48.2l-4.6,5.1c6.5,0.5,19.3,1.3,32.2,1.3
        c26.3,0,36.9-12.9,36.9-30.5C399.5,77.5,385,65.3,361.8,65.3z M362.4,113c-4,0-7.6-0.2-10-0.5V79.2c2.7-0.3,4.8-0.6,9.2-0.6
        c11.3,0,20,4.8,20,17C381.6,107.3,373.7,113,362.4,113z"/>
      <polygon class="st1" points="164.2,119.8 168.7,124.9 142.1,124.9 146.9,119.8 146.8,107.7 119.3,66.6 147.3,66.6 143.3,71.1 
        156.4,94.3 156.6,94.3 169.4,71.1 165.6,66.6 191.6,66.6 164.1,107.9 	"/>
      <polygon class="st1" points="124.8,111.7 116,124.9 116.1,124.9 65.3,124.9 69.9,119.8 69.9,71.7 65.3,66.6 111.2,66.5 111.2,66.6 
        120,79.7 87.3,79.7 87.3,89 110.5,89 101.7,102.2 101.7,102.3 87.3,102.2 87.3,111.8 	"/>
      <path class="st1" d="M58.8,99.3c-2.2-2.1-5.1-3.7-8.9-4.8c1.5-0.4,2.9-1,4.2-1.8c1.3-0.8,2.3-1.6,3.2-2.6c0.9-1,1.6-2,2-3.1
        C59.8,86,60,85,60,84v-1.9c0-2.3-0.5-4.5-1.6-6.4c-1.1-1.9-2.6-3.6-4.6-4.9c-2-1.4-4.8-2.4-7.6-3.2c-2.8-0.7-5.9-1.1-9.3-1.1h-27
        H7.1H1.9l5.2,5.4v18.4H0l7.1,9.1v20.1l-5.2,5.4h5.2h2.8h28.8c6.9,0,12.9-1.2,17.1-3.7c4.2-2.5,6.2-6.1,6.2-11v-3.3
        C62,103.9,60.9,101.4,58.8,99.3z M24.1,77.3h9.4c2.7,0,4.9,0.4,6.6,1.2c1.7,0.8,2.5,2.3,2.5,4.5v1.9c0,1.7-0.6,3-1.9,4
        c-1.3,1-3,1.5-5.2,1.5H24.1V77.3z M44.6,108.5c0,1.2-0.2,2.2-0.7,2.9c-0.5,0.7-1.1,1.3-1.9,1.8c-0.8,0.4-1.7,0.7-2.8,0.9
        c-1.1,0.1-2.2,0.2-3.3,0.2H24.1v-14.1h11.9c2.2,0,4.1,0.5,5.9,1.5c1.7,1,2.6,2.3,2.6,4V108.5z"/>
    </g>
    </svg>
    `;
  const iconContainer = document.createElement("div");
  iconContainer.innerHTML = beyondLogoSvg;

  // button
  const btn = document.createElement("button");
  btn.id = "dndbeyond-sync-deathsave-btn";
  btn.style =
    "border-radius: 10px; background-color: black; margin-left: 5px; align-self: center; border: none; padding: 3px;";
  btn.appendChild(iconContainer);

  const roll = createSyncEvent(ROLL_DEATH_SAVE, "", getUserUrl(), false);
  btn.onclick = () => {
    notify(EVENT_FROM_DNDBEYOND, roll);
  };

  // button text
  const btnText = document.createElement("p");
  btnText.style = "margin: 0px !important; align-self: center;";
  btnText.innerText = "roll";

  // button container
  const btnContainer = document.createElement("div");
  btnContainer.style = "display: flex;justify-content: space-between;";
  btnContainer.appendChild(btnText);
  btnContainer.appendChild(btn);

  heading.appendChild(btnContainer);

  injectFoundryNotification(doc);
}

function injectFoundryNotification(doc) {
  const container = doc.getElementsByClassName(
    "ct-health-manager__deathsaves-groups"
  )[0];

  // failure
  const failureGroup = container.getElementsByClassName(
    "ct-health-manager__deathsaves-group ct-health-manager__deathsaves-group--fails"
  )[0];
  const failureMarks = failureGroup.getElementsByClassName(
    "ct-health-manager__deathsaves-marks"
  )[0];
  injectFoundryNotificationInGroup(failureMarks, false);

  // success
  const successGroup = container.getElementsByClassName(
    "ct-health-manager__deathsaves-group ct-health-manager__deathsaves-group--successes"
  )[0];
  const successMarks = successGroup.getElementsByClassName(
    "ct-health-manager__deathsaves-marks"
  )[0];
  injectFoundryNotificationInGroup(successMarks, true);
}

function injectFoundryNotificationInGroup(container, isSuccessGroup) {
  container.onclick = () => {
    setTimeout(() => {
      const marks = container.children;

      let active = 3;
      for (const m of marks) {
        const isInactive = m.classList.contains(
          "ct-health-manager__deathsaves-mark--inactive"
        );
        if (!isInactive) {
          continue;
        }
        active -= 1;
      }

      const status = {};
      if (isSuccessGroup) {
        status.success = active;
      } else {
        status.failure = active;
      }

      const roll = createSyncEvent(
        UPDATE_FROM_BEYOND_DEATH_SAVE,
        status,
        getUserUrl()
      );
      notify(EVENT_FROM_DNDBEYOND, roll);
    }, 100);
  };
}
