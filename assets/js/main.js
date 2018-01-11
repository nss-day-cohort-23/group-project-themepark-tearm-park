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

// get attractions at current time
firebase.getAllAttractions()
        .then(attractions => {
            let currentTime = moment().format("HH:mmA");
            console.log(currentTime);
            let currentAttractions = timeFormatter.getAttractionsByTime(currentTime, attractions);
            console.log("these should be current attractions", currentAttractions);
            // pass currentAttractions into dom module
        });


events.activateEvents();

domController.populateFooter();

timeFormatter.activateClock();