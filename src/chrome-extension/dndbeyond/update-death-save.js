/**
 * todo
 * bug: when HP container in Beyond is NOT OPEN, update will fail!
 * bug: FoundryVTT => error when ActorSheet is closed
 * bug: FoundryVTT => value 0 from Beyond will not work
 */

export function handleDeathSaveUpdate(deathStatus) {
  if (deathStatus.failure !== undefined) {
    console.log("deathStatus.failure", deathStatus.failure);
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
    for (let i = 0; i < clickCount; i++) {
      const mark = inactiveMarks[i];
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
