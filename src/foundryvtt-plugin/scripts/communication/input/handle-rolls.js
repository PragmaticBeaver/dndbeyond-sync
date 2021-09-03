export function handleAbilityCheck(actor, val) {
  actor.rollAbilityTest(val);
}

export function handleAbilitySave(actor, val) {
  actor.rollAbilitySave(val);
}

export function handleSkillCheck(actor, val) {
  const skillLong = val.toLowerCase().replace(/\s/g, "");

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

  actor.rollSkill(skill);
}

export function handleInitiativeRoll(actor) {
  actor.rollInitiative();
}

export function handleDeathSave(actor) {
  actor.rollDeathSave();
}
