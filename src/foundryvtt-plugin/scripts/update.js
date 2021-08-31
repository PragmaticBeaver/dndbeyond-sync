export function updateDeathSave(actor, val) {
  const actorDeathState = actor.data.data.attributes.death;

  const success = val.success;
  if (success) {
    actorDeathState.success = success;
  }

  const failure = val.failure;
  if (failure) {
    actorDeathState.failure = failure;
  }

  // re-redner ActorSheet to display data-change
  actor._sheet.render(true);
}
