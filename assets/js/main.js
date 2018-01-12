"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeSearch = require("./timeSearch");
const $ = require('jquery');
const moment = require('moment');
const attractionFactory = require('./attractions');

attractionFactory.getFormattedAttractions().then(attractions => {
    // populate area grid
    firebase.getAreas().then(areas => {
        domController.displayAreaGrid(areas);  // displays area grid
    });

    // domController.displayAreaGrid(areas);  // displays area grid
    timeSearch.getAttractionsWithHours(attractions); // accepts all attractions and returns attractions that have hours
    let currentTime = moment(); // this is a moment object that will get formatted in getCurrentAttractions
    // let currentTime = moment().format("HH:mmA"); // gets current time with moment
    timeSearch.getCurrentAttractions(currentTime); //passes in current time and returns an array of attractions happening at that time
});

// resolves getAreas promise and getAllAttractions promise
// let promiseArr = [firebase.getAreas(), firebase.getAttractions()];
// Promise.all(promiseArr)
// .then( (results) => {
    // let areas = [];
    // let attractions = [];
    // if (results[0][0].hasOwnProperty("colorTheme")) { // assigning areas and attractions based on promise.all array
    //     areas = results[0];
    //     attractions = results[1];
    // }
    // else {
    //     areas = results[1];
    //     attractions = results[0];
    // }

//     // domController.displayAreaGrid(areas);  // displays area grid
//     timeSearch.getAttractionsWithHours(attractions); // accepts all attractions and returns attractions that have hours
//     let currentTime = moment(); // this is a moment object that will get formatted in getCurrentAttractions
//     // let currentTime = moment().format("HH:mmA"); // gets current time with moment
//     timeSearch.getCurrentAttractions(currentTime); //passes in current time and returns an array of attractions happening at that time
    
// });

events.activateEvents();

domController.populateFooter();
