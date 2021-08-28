import { CHARACTER_URLS, MODULE_NAME } from "./common.js";

const persistScope = {
  global: "world",
  local: "client",
};

// todo remove entry when character is deleted

/**
 * Prepares data storage via game.settings.
 */
export async function registerPersistence() {
  await game.settings.register(MODULE_NAME, CHARACTER_URLS, {
    name: "User URLs",
    hint: "The character URL's from D&D Beyond.",
    scope: persistScope.global,
    config: false,
    type: String,
    default: "",
    onChange: (value) => {
      console.log("userUrls changed", value);
      foundry.utils.debounce(window.location.reload, 100); // reload clients after 100ms
    },
    filePicker: false,
  });
  console.log("setting: " + CHARACTER_URLS + "registered");
}

/**
 * Loads data from game settings storage.
 * @param {string} key key for data
 * @returns {*} parsed data
 */
export function loadData(key) {
  const json = game.settings.get(MODULE_NAME, key);
  console.log("loaded", key, json);
  if (json) {
    return JSON.parse(json);
  }
}

/**
 *
 * @param {string} key key for later access
 * @param {*} val Data to be stringified and saved.
 */
export function saveData(key, val) {
  game.settings.set(MODULE_NAME, key, JSON.stringify(val));
  console.log("saved", key, val);
}
