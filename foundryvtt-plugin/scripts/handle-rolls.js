import { getActorOfCurrentUser } from "./actor.js";

export function handleAbilityCheck(evt) {
  const actor = getActorOfCurrentUser();
  actor.rollAbilityTest(evt.ability);
}

export function handleAbilitySave(evt) {
  const actor = getActorOfCurrentUser();
  actor.rollAbilitySave(evt.save);
}

export function handleSkillCheck(evt) {
  const actor = getActorOfCurrentUser();
  actor.rollSkill(evt.skill);
}
