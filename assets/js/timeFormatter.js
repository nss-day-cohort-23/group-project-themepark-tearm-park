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

// accepts a time, goes through attractions with areas attached, searches for attractions that match the time you passed in
module.exports.getCurrentAttractions = (startTime) => {
    let currentAttractions = [];
    let endTime = moment(startTime).add(1, 'hours'); // adds an hour to the time you pass in and formats it correctly
    attractionsWithAreas.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        timesArray.forEach(time => {
            time = moment(time, 'h:mmA');
            if (moment(time).isBetween(startTime, endTime)){
                currentAttractions.push(attractionObject);
            }
        });
        console.log(currentAttractions);
        printToDom.displayTimeAttractions(currentAttractions);
    });
};

