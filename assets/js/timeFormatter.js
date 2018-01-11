'use strict';

const $ = require('jquery');
const printToDom = require('./dom');
// const firebase = require('./firebase');

let attractionsWithHours = [];

module.exports.activateClock = function(){
  
};


module.exports.getAttractionsWithHours = (allAttractions) => {
    attractionsWithHours = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    return attractionsWithHours;
};

module.exports.getCurrentAttractions = (time) => {
    let currentAttractions = [];
    attractionsWithHours.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        if (timesArray.indexOf(time) != -1){
            currentAttractions.push(attractionObject);
        }
    // return currentAttractions;
    printToDom.displayAttractions(currentAttractions);
    });
};

