import { EVENT_FROM_FOUNDRY, getUserUrl } from "../common.js";
import {
  UPDATE_FROM_FOUNDRY_DEATH_SAVE,
  createSyncEvent,
  UPDATE_FROM_FOUNDRY_HP,
} from "../../../global.js";

/**
 * Dispatches custom DOM event on document using "EVENT_FROM_FOUNDRY" as key.
 * @param {Object} syncEvent SyncEvent to send to background
 */
function notify(syncEvent) {
  const evt = new CustomEvent(EVENT_FROM_FOUNDRY, {
    detail: syncEvent,
  });
  document.dispatchEvent(evt);
}

export function handleActorUpdate(change) {
  const actorId = change._id;
  const userUrl = getUserUrl(actorId);

  // console.log("change", change);

  const deathSave = change.data?.attributes?.death;
  if (deathSave) {
    console.log("isDeathSave", deathSave);
    const evt = createSyncEvent(
      UPDATE_FROM_FOUNDRY_DEATH_SAVE,
      deathSave,
      userUrl
    );
    notify(evt);
    return;
  }

  const hpChange = change.data?.attributes?.hp?.value;
  if (hpChange !== undefined) {
    console.log("hpChange", hpChange);
    const evt = createSyncEvent(UPDATE_FROM_FOUNDRY_HP, hpChange, userUrl);
    notify(evt);
    return;
  }
}
