// export function takeLongRest(doc) {
//   const rest = doc.getElementsByClassName(
//     "ct-character-header-desktop__group ct-character-header-desktop__group--long-rest"
//   )[0];
//   if (!rest) {
//     return;
//   }

//   // open long-rest sidebar
//   rest.click();

//   const sidebar = doc.getElementsByClassName("ct-reset-pane")[0];

//   // reset all Hit-Dice
//   const disabledCheckbox = sidebar.getElementsByClassName(
//     "ddbc-checkbox character-checkbox  ddbc-checkbox--is-disabled character-checkbox-disabled ddbc-checkbox--is-interactive character-checkbox-interactive"
//   )[0];
//   if (disabledCheckbox) {
//     disabledCheckbox.click();
//   }

//   const btn = sidebar.getElementsByClassName(
//     "ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button ct-button--confirm"
//   )[0];
//   btn.click();

//   // confirm long rest
//   const confirmBtn = sidebar.getElementsByClassName(
//     "ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button ct-button--confirm ct-button--is-confirming"
//   )[0];
//   confirmBtn.click();
// }
