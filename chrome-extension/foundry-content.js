console.log("=>> foundry - hello from contentScript");

/**
 * inject script inside document to get control of DOM
 * https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
 */
var s = document.createElement("script");
s.src = chrome.runtime.getURL("foundry-injection.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

/**
 * todo - there are 2 options to proceed
 *  =>  throw events inside DOM and write Foundry plugin to handle these events
 *      =>> PRO - less effected by HTML chagnes inside foundry
 *      =>> CON - 2 seperate code-bases which need to be compatible with each other
 *  =>  read and mutate DOM to acchive results (like making ability checks)
 *      =>> PRO - less code split because of one code base
 *      =>> CON - more effected by HTML changes inside foundry
 *      =>> CON - unsure how to handle item addition to inventory (drag and drop actions)
 */
