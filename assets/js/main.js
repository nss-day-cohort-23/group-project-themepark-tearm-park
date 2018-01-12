"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeFormatter = require("./timeFormatter");
const $ = require('jquery');
const moment = require('moment');

// resolves getAreas promise and getAllAttractions promise
let promiseArr = [firebase.getAreas(), firebase.getAttractions()];
Promise.all(promiseArr)
.then( (results) => {
    let areas = [];
    let attractions = [];
    if (results[0][0].hasOwnProperty("colorTheme")) { // assigning areas and attractions based on promise.all array
        areas = results[0];
        attractions = results[1];
    }
    else {
        areas = results[1];
        attractions = results[0];
    }
    domController.displayAreaGrid(areas);  // displays area grid
    timeFormatter.getAttractionsWithHours(attractions); // accepts all attractions and returns attractions that have hours
    let currentTime = moment(); // this is a moment object that will get formatted in getCurrentAttractions
    // let currentTime = moment().format("HH:mmA"); // gets current time with moment
    timeFormatter.getCurrentAttractions(currentTime); //passes in current time and returns an array of attractions happening at that time
    
});

events.activateEvents();

domController.populateFooter();
