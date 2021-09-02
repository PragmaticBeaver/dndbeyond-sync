function rerenderActorSheet(actor) {
  // re-redner ActorSheet to display data-change
  if (actor._sheet?.rendered) {
    actor._sheet.render(true);
  }
}

export function updateDeathSave(actor, val) {
  const actorDeathState = actor.data.data.attributes.death;

  const success = val.success;
  if (success !== undefined) {
    actorDeathState.success = success;
  }

  const failure = val.failure;
  if (failure !== undefined) {
    actorDeathState.failure = failure;
  }

  rerenderActorSheet(actor);
}

export function handleHpUpdate(actor, val) {
  const currentHp = actor.data.data.attributes.hp.value;
  if (currentHp === val) {
    return;
  }
  actor.data.data.attributes.hp.value = val;
  rerenderActorSheet(actor);
}
