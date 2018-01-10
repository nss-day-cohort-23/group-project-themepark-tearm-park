"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");

firebase.getAreas().then(areas => {
    console.log(areas);
    domController.displayAreaGrid(areas);
});

// copy this and paste it into the type formatter module
firebase.getTypes().then(types => {
    console.log(types);
});

events.activateEvents();