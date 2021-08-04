# Possible Features

## Option to switch between browser and FoundryVTT Server communication

Note: current scope only applies to Browser

- good for DM, doesn't have to open a Browser

## sync with foundry server

- implementation of websocket inside background.js shouldn't be a problem
- what about "script idle" ? can background.js run permanent like Manifest v2 persistent:true ?
  - other option is to implement websocket for each content-script
