# Possible Features

## Todo

- implement plugin to be able to handle dice-rolling and non dice-rolling?
  - research how beyond 20 does it
  - is an option for this tool?
- error dialog with notification for "reload using popup"
- take DMG / heal => actor.applyDamage
  - bug: manual input to 0 HP doesn't send dmg event!
    => switched to death save as new mutation and mutationHandling
  - update mechanic => HP (also part of death-save, because crit-success = 1 HP!)
  - take dmg (foundry)
  - heal (foundry)
  - react to hp set (foundry)
  - respect temp-HP
    - set from foundry
    - set from beyond
    - respect when taking dmg (foundry)
    - respect when taking dmg (beyond)
- hit die
  - foundry => actor.rollHitDie
  - beyond
- passive stats
- feat / trait (post into foundry)
- inspiration
- weapons (hit + damage)
- spells
- use charge of magic item
- item sync (add / remove)
- mobile
- bug: If PC has HP remaining but Player wrongly sets death-save in foundry; beyond will throw an error
- (possible) bug: connection to background.js gets lost

## Todo - combined features

Combined features mean features that produce a distinct effect but are achieved through the combination of many smaller effects.

- long rest
  - => actor.longRest
  - changes HP
  - resets hit dice
  - recharges spell-slots
  - may recharge specific features/traits
- short rest
  - => actor.shortRest
  - changes HP
  - uses hit dice
  - may recharge spell-slots
  - may recharge specific features/traits

## Option to switch between browser and FoundryVTT Server communication

Note: current scope only applies to Browser

- good for DM, doesn't have to open a Browser

## sync with foundry server

- implementation of websocket inside background.js shouldn't be a problem
- what about "script idle" ? can background.js run permanent like Manifest v2 persistent:true ?
  - other option is to implement websocket for each content-script

## tablet & small screen support!

- tablet mode will break the website!
