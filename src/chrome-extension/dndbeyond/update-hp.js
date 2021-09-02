export function updateHP(hpValue) {
  const healthSummary = document.getElementsByClassName(
    "ct-health-summary__hp"
  )[0];
  if (!healthSummary) {
    const deathSummary =
      document.getElementsByClassName("ct-health-summary")[0];
    if (!deathSummary) {
      console.warn("Can't modify HP!");
      return;
    }
    // unconscious but regaining HP
    deathSummary.click();
  } else {
    healthSummary.click();
  }

  const healthPane = document.getElementsByClassName("ct-health-manager")[0];
  const currentHp = healthPane.getElementsByClassName(
    "ct-health-manager__health-item-value"
  )[0].innerText;

  if (hpValue === currentHp) {
    return;
  }

  if (hpValue > currentHp) {
    // healing
    const clickCount = hpValue - currentHp;
    for (let i = 0; i < clickCount; i++) {
      const btn = healthPane.getElementsByClassName(
        "ct-theme-button action-increase ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button"
      )[0];
      btn.click();
    }
  } else {
    // damage
    const clickCount = currentHp - hpValue;
    for (let i = 0; i < clickCount; i++) {
      const btn = healthPane.getElementsByClassName(
        "ct-theme-button action-decrease ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button"
      )[0];
      btn.click();
    }
  }

  const applyBtn = healthPane
    .getElementsByClassName("ct-health-manager__actions")[0]
    .getElementsByClassName(
      "ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button"
    )[0];
  applyBtn.click();

  const reducePaneBtn = document.getElementsByClassName(
    "ddbc-tooltip ct-sidebar__control ct-sidebar__control--collapse ddbc-tooltip--is-interactive"
  )[0];
  reducePaneBtn.click();
}
