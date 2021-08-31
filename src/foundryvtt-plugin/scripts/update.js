// todo bug: won't display changes if sheet is opened (guess: needs rerender)
export function updateDeathSave(actor, val) {
  console.log("val", val);

  const actorDeathState = actor.data.data.attributes.death;
  console.log("actorDeathState", actorDeathState);

  const success = val.success;
  if (success) {
    actorDeathState.success = success;
  }

  const failure = val.failure;
  if (failure) {
    actorDeathState.failure = failure;
  }

  console.log("after update actorDeathState", actorDeathState);
}
