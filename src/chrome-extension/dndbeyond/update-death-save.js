export function handleDeathSaveUpdate(deathStatus) {
  const hpManagement = document.getElementsByClassName("ct-health-manager")[0];
  if (!hpManagement) {
    const savesMenu = document.getElementsByClassName("ct-health-summary")[0];
    savesMenu.click();
  }

  if (deathStatus.failure !== undefined) {
    const failureContainer = document.getElementsByClassName(
      "ct-health-manager__deathsaves-group ct-health-manager__deathsaves-group--fails"
    )[0];
    updateBeyond(failureContainer, deathStatus.failure);
  }

  if (deathStatus.success !== undefined) {
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

  const gainedValue = currentlyMarked < count;
  if (gainedValue) {
    const clickCount = count - currentlyMarked;
    const marks = Array.from(inactiveMarks);
    for (let i = 0; i < clickCount; i++) {
      const mark = marks.pop();
      mark.click();
    }
  }

  const lostValue = currentlyMarked > count;
  if (lostValue) {
    const clickCount = currentlyMarked - count;
    const marks = deathSaveContainer.getElementsByTagName("span");
    const activeMarks = [];
    for (const m of marks) {
      if (m.className !== "ct-health-manager__deathsaves-mark") {
        continue;
      }
      activeMarks.push(m);
    }
    for (let i = 0; i < clickCount; i++) {
      const mark = activeMarks.pop();
      mark.click();
    }
  }
}
