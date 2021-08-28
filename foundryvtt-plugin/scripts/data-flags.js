export const FLAG_PREFIX = "dndbeyond-sync";

// flags
export const CHARACTER_URLS = "charUrls";

/**
 * Save data using FoundryVTT Flags.
 * @param {*} doc document where flag should be attached.
 * @param {string} key key of data-flag.
 * @returns {string} data-flag.
 */
export function getFlag(doc, key) {
  return doc.getFlag(FLAG_PREFIX, key);
}

/**
 * Retrieve data using FoundryVTT Flags.
 * @param {*} doc document where flag should be attached.
 * @param {string} key key of data-flag.
 * @param {*} val data to be saved.
 */
export function setFlag(doc, key, val) {
  doc.setFlag(FLAG_PREFIX, key, val);
}
