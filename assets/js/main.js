"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeFormatter = require("./timeFormatter");
const $ = require('jquery');
var moment = require('moment');



firebase.getAreas().then(areas => {
    console.log(areas);
    domController.displayAreaGrid(areas);
});


firebase.getAllAttractions().then(attractions => {
    console.log("these should be attraciton with times", attractions);
    // $('#time-selector').on("change", function () {
    //     console.log($('#time-selector').val());
    //     // let currentTime = timeFormatter.formatTime($('#time-selector').val());
    // });
    let currentTime = moment().format("HH:mmA");
    console.log("this should be a string of the current time", currentTime);
    let currentAttractions = timeFormatter.getAttractionsByTime(currentTime, attractions);
    // pass currentAttractions into dom module
});

events.activateEvents();

domController.populateFooter();

timeFormatter.activateClock();