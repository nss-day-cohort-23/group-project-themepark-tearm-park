'use strict';

const $ = require('jquery');
const printToDom = require('./dom');
const dataFormatter = require('./dataFormatter');

let attractionsWithAreas = [];

module.exports.activateClock = function(){
  
};


module.exports.getAttractionsWithHours = (allAttractions) => {
    let attractionsWithHours = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    dataFormatter.getAreaNames(attractionsWithHours).then( (att) => {
        console.log(att, "result of promise");
        attractionsWithAreas = att;
    });
console.log(attractionsWithAreas, "in timeFOrmatter");
};

module.exports.getCurrentAttractions = (time) => {
    let currentAttractions = [];
    console.log("matching with time", attractionsWithAreas);
    attractionsWithAreas.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        if (timesArray.indexOf(time) != -1){
            currentAttractions.push(attractionObject);
        }
    // return currentAttractions;
    printToDom.displayAttractions(currentAttractions);
    });
};

