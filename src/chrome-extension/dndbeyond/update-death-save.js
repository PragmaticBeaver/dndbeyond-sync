export function handleDeathSaveUpdate(deathStatus) {
  console.log("handleDeathSaveUpdate", deathStatus);
  if (deathStatus.failure) {
    const failureContainer = document.getElementsByClassName(
      "ct-health-manager__deathsaves-group ct-health-manager__deathsaves-group--fails"
    )[0];
    updateBeyond(failureContainer, deathStatus.failure);
  }

  if (deathStatus.success) {
    const successContainer = document.getElementsByClassName(
      "ct-health-manager__deathsaves-group ct-health-manager__deathsaves-group--successes"
    )[0];
    updateBeyond(successContainer, deathStatus.success);
  }
}

// todo bug: cant remove death-save
function updateBeyond(deathSaveContainer, count) {
  const inactiveMarks = deathSaveContainer.getElementsByClassName(
    "ct-health-manager__deathsaves-mark ct-health-manager__deathsaves-mark--inactive"
  );
  const maxCount = 3;
  const currentlyMarked = maxCount - inactiveMarks.length;
  const clickCount = count - currentlyMarked;
  for (let i = 0; i < clickCount; i++) {
    const mark = inactiveMarks[i];
    mark.click();
  }
}
