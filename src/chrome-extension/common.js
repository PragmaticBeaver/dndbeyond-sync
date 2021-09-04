export const DNDBEYOND_PORT_ID = "dndbeyond-sync";
export const FOUNDRY_PORT_ID = "foundry-sync";

export const EVENT_FROM_DNDBEYOND = "dndbeyond-sync-from-beyond";
export const EVENT_TO_DNDBEYOND = "dndbeyond-sync-to-beyond";

export const EVENT_FROM_FOUNDRY = "dndbeyond-sync-from-foundry";
export const EVENT_TO_FOUNDRY = "dndbeyond-sync-to-foundry";

export function getUserUrl() {
  return window.location.href;
}

export function reduceSidePane(doc) {
  const reducePaneBtn = doc.getElementsByClassName(
    "ddbc-tooltip ct-sidebar__control ct-sidebar__control--collapse ddbc-tooltip--is-interactive"
  )[0];
  reducePaneBtn.click();
}

/**
 * Insert a node inbetween the parent and its children.
 * @param {Node} parent Parent Node
 * @param {Node} node Node which should be placed between parent and its children.
 */
export function insertNode(parent, node) {
  const children = Array.from(parent.children);
  children.forEach((c) => {
    node.appendChild(c);
  });
  parent.appendChild(node);
}
