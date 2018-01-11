'use strict';

const $ = require('jquery');
const printToDom = require('./dom');

let attractionsWithHours = [];

module.exports.activateClock = function(){
  
};


module.exports.getAttractionsWithHours = function(allAttractions){
    attractionsWithHours = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    console.log("these attractions have hours", attractionsWithHours);
};

module.exports.getCurrentAttractions = (time) => {
    let currentAttractions = [];
    attractionsWithHours.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        if (timesArray.indexOf(time) != -1){
            currentAttractions.push(attractionObject);
        }
    console.log(currentAttractions, "attractions happening at this time");
    printToDom.displayAttractions(currentAttractions);
    });
};

