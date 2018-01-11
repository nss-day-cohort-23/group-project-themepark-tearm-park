"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeFormatter = require("./timeFormatter");


firebase.getAreas().then(areas => {
    console.log(areas);
    domController.displayAreaGrid(areas);
});

// // copy this and paste it into the type formatter module
// firebase.getTypes().then(types => {
//     console.log(types);
// });

firebase.getAllAttractions().then(attractions => {
    console.log("these should be attraciton with times", attractions);
    let currentTime = "4:00PM";
    let currentAttractions = timeFormatter.getAttractionsByTime(currentTime, attractions);
    // pass currentAttractions into dom module
});

events.activateEvents();

domController.populateFooter();

timeFormatter.activateClock();