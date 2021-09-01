export function updateHP(hpValue) {
  // todo try other solution (try current event setup for heal and damage buttons)

  const healthSummary = document.getElementsByClassName(
    "ct-health-summary__hp"
  )[0];
  if (!healthSummary) {
    return;
  }

  // find input div
  const inputContainer = healthSummary.getElementsByClassName(
    "ct-health-summary__hp-number"
  )[0];
  console.log("inputContainer", inputContainer);
  inputContainer.click(); // necessary to render input

  // set input value
  const input = healthSummary.getElementsByClassName(
    "ct-theme-input ct-health-summary__hp-item-input"
  )[0];
  input.value = hpValue;
  const ke = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    keyCode: 13,
  });
  input.dispatchEvent(ke);

  // click somewhere to disable input
  const header = document.getElementsByClassName(
    "ct-character-header-desktop"
  )[0];
  console.log("header", header);
  header.click();

  // todo set hp when death-saves currently active
}
