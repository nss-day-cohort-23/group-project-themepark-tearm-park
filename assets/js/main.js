"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");

firebase.getAreas().then(areas => {
    domController.displayAreaGrid(areas);
});

events.activateEvents();

domController.populateFooter();