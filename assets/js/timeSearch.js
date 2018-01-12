'use strict';

const $ = require('jquery');
const dom = require('./dom');
const moment = require('moment');
const attractionFactory = require("./attractions");

// returns list of attractions with set times
const getScheduledAttractions = () => {
    let attractions = attractionFactory.getAttractions();
    let scheduledAttractions = attractions.filter(attraction => {
        if (attraction.hasOwnProperty('times')){
            return attraction;
        }
    });
    return scheduledAttractions;
};

// accepts a start time from main.js and events.js (when the page loads or when you select at time)
const getCurrentAttractions = (startTime) => {
    let currentAttractions = []; 
    // adds one hour to start time
        // (for example, if you enter 10:00 AM, the end time will be 11:00 AM)
    let endTime = moment(startTime).add(1, 'hours'); 
    getScheduledAttractions().forEach(attraction => {
        let timesArray = attraction.times;
        // loops through the times array in each attraction
        timesArray.forEach(time => {
            // convert time string to moment object
            time = moment(time, 'h:mmA');
            // checks to see if moment object is within an hour of your start time
            if (moment(time).isBetween(startTime, endTime)) { 
                currentAttractions.push(attraction);
            }
        });
    });
    return currentAttractions;
};

// gets and prints current attractions
const printCurrentAttractions = (startTime) => {
    let currentAttractions = getCurrentAttractions(startTime);
    dom.displayTimeAttractions(currentAttractions);
};

module.exports = {printCurrentAttractions};