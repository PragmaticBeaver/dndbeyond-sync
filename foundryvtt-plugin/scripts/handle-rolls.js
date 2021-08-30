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
  const skillLong = evt.skill.toLowerCase().replace(/\s/g, "");

  let skill = "";
  switch (skillLong) {
    case "acrobatics":
      skill = "acr";
      break;
    case "animalhandling":
      skill = "ani";
      break;
    case "arcana":
      skill = "arc";
      break;
    case "athletics":
      skill = "ath";
      break;
    case "deception":
      skill = "dec";
      break;
    case "history":
      skill = "his";
      break;
    case "insight":
      skill = "ins";
      break;
    case "intimidation":
      skill = "itm";
      break;
    case "investigation":
      skill = "inv";
      break;
    case "medicine":
      skill = "med";
      break;
    case "nature":
      skill = "nat";
      break;
    case "perception":
      skill = "prc";
      break;
    case "performance":
      skill = "prf";
      break;
    case "persuasion":
      skill = "per";
      break;
    case "religion":
      skill = "rel";
      break;
    case "sleightofhand":
      skill = "slt";
      break;
    case "stealth":
      skill = "ste";
      break;
    case "survival":
      skill = "sur";
      break;
  }

  const actor = getActorOfCurrentUser();
  actor.rollSkill(skill);
}

export async function handleInitiativeRoll(_evt) {
  const actor = getActorOfCurrentUser();
  actor.rollInitiative();
}
