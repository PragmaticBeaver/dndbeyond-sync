# Possible Features

## Todo

- take DMG / heal => actor.applyDamage
  - handle manual input of HP in summary
  - bug: PC dead; inside HP management click "+1 HP" => sends event without "apply"
  - update mechanic => HP (also part of death-save, because crit-success = 1 HP!)
  - handle change from 1 HP to death save menu (0HP) => send hp change with value 0
  - take dmg
  - heal
  - respect temp-HP
- hit die => actor.rollHitDie
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
