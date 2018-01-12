'use strict';

const $ = require('jquery');
const printToDom = require('./dom');
const dataFormatter = require('./dataFormatter');
const moment = require('moment');

let attractionsWithAreas = [];

// called in main.js, accepts all attractions and filters down to attractions with hours
// passes attractions with hours into the getAreaNames function
// goes to get areaNames, stores attractions with areaNames in this module 
module.exports.getAttractionsWithHours = (allAttractions) => {
    let attractionsWithHours = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    dataFormatter.getAreaNames(attractionsWithHours).then( (att) => {
        attractionsWithAreas = att; // this is an array of attractions with areaName properties attached
    });
};

// accepts a start time from main.js and events.js (when the page loads or when you select at time)
// this function DOESN'T WORK when the page loads because attractions with areas is an empty array at that point, so this is gonna need to be a callback for formatting all the attractions with area names
module.exports.getCurrentAttractions = (startTime) => {
    let currentAttractions = []; 
    let endTime = moment(startTime).add(1, 'hours'); // adds one hour to start time (for example, if you enter 10:00 AM, the end time will be 11:00 AM)
    attractionsWithAreas.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        timesArray.forEach(time => {
            time = moment(time, 'h:mmA'); // loops through the times array in each attraction, convert time string to moment object
            if (moment(time).isBetween(startTime, endTime)){ // checks to see if moment object is within an hour of your start time
                currentAttractions.push(attractionObject); // if so, push it into the currentAttractions array
            }
        });
        printToDom.displayTimeAttractions(currentAttractions); // send the current attractions array to the printer
    });
};

