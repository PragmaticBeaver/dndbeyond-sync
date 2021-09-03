let suppress = false;

/**
 * Set event supression to enable / disable throw of snyc events to D&D Beyond.
 * @param {boolean} val
 */
export function supressMessages(val) {
  suppress = val;
  console.log("msg supression", suppress);
}

/**
 * Gets the current event supression.
 * @returns {boolean}
 */
export function shouldSuppressMsg() {
  return suppress;
}
