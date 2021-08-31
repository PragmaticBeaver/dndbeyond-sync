import { EVENT_FROM_FOUNDRY, getUserUrl } from "../common.js";
import {
  UPDATE_FROM_BEYOND_DEATH_SAVE,
  createSyncEvent,
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

  const deathSave = change.data?.attributes?.death;
  if (deathSave) {
    console.log("isDeathSave", deathSave); // todo get userUrl
    const evt = createSyncEvent(
      UPDATE_FROM_BEYOND_DEATH_SAVE,
      deathSave,
      userUrl
    );
    notify(evt);
    return;
  }
}
