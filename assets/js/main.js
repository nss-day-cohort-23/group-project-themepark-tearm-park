"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeFormatter = require("./timeFormatter");
const dataFormatter = require("./dataFormatter");
const $ = require('jquery');
const moment = require('moment');

let promiseArr = [firebase.getAreas(), firebase.getAllAttractions()];
Promise.all(promiseArr)
.then( (results) => {
    let areas = [];
    let attractions = [];
    if (results[0][0].hasOwnProperty("colorTheme")) {
        areas = results[0];
        attractions = results[1];
    }
    else {
        areas = results[1];
        attractions = results[0];
    }
    domController.displayAreaGrid(areas);
    let scheduledAttractions = timeFormatter.getAttractionsWithHours(attractions);
    // scheduledAttractions = dataFormatter.getAreaNames(areas, scheduledAttractions);
    let currentTime = moment().format("HH:mmA");
    let currentAttractions = timeFormatter.getCurrentAttractions(currentTime);
    domController.displayAttractions(currentAttractions);
});






events.activateEvents();

domController.populateFooter();

timeFormatter.activateClock();