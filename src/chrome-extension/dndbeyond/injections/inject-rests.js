// export function injectLongRest(doc) {
//   const sidebar = doc.getElementsByClassName("ct-reset-pane")[0];
//   if (!sidebar) {
//     return;
//   }

//   // reset all Hit-Dice
//   const disabledCheckbox = sidebar.getElementsByClassName(
//     "ddbc-checkbox character-checkbox  ddbc-checkbox--is-disabled character-checkbox-disabled ddbc-checkbox--is-interactive character-checkbox-interactive"
//   )[0];
//   if (disabledCheckbox) {
//     // todo handle "don't heal to max HP" (whats the rules? roll all hit-dice?)
//     console.log("option: don't heal to full HP");
//   }

//   // todo handle "heal to max HP"
//   console.log("option: heal to full HP");

//   const confirmBtn = sidebar.getElementsByClassName(
//     "ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button ct-button--confirm ct-button--is-confirming"
//   )[0];
//   if (!confirmBtn) {
//     return;
//   }

//   confirmBtn.onclick = () => {
//     console.log("confirm clicked");
//   };
// }

// export function injectShortRest(doc) {
//   const rest = doc.getElementsByClassName(
//     "ct-character-header-desktop__group ct-character-header-desktop__group--short-rest"
//   )[0];
//   if (!rest) {
//     return;
//   }

//   // todo
// }
