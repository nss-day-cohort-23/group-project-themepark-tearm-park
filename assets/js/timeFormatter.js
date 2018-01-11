'use strict';

const $ = require('jquery');

let attractionsByTime = [];

module.exports.activateClock = function(){
  
};


module.exports.getAttractionsByTime = function(currentTime, allAttractions){
    let currentAttractions = [];
    console.log("this should be all the attractions in the timeformatter module", allAttractions);
    attractionsByTime = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    attractionsByTime.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        if (timesArray.indexOf(currentTime) != -1){
            console.log("this attraction starts at this time", attractionObject);
            currentAttractions.push(attractionObject);
        }

    });

    return  currentAttractions;
};

