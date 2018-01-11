"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeFormatter = require("./timeFormatter");
const $ = require('jquery');
const moment = require('moment');



firebase.getAreas().then(areas => {
    console.log(areas);
    domController.displayAreaGrid(areas);
});

let currentTime = moment().format("HH:mmA");
// get attractions at current time
firebase.getAllAttractions()
    .then(attractions => {
        timeFormatter.getAttractionsWithHours(attractions);
    })
    .then( () => {
        timeFormatter.getCurrentAttractions(currentTime);
    });



events.activateEvents();

domController.populateFooter();

timeFormatter.activateClock();