'use strict';

const $ = require('jquery');

let attractionsByTime = [];

module.exports.activateClock = function(){
    $('#time-selector').on("change", function(){
        console.log($('#time-selector').val());
    });
};

module.exports.getAttractionsByTime = function(currentTime, allAttractions){
    attractionsByTime = allAttractions.filter(function (attractionObject) {
        if (attractionObject.hasOwnProperty('times')){
            return attractionObject;
        }
    });
    console.log("this should be attractions that start at 5:00", attractionsByTime);
    attractionsByTime.forEach(attractionObject => {
        let timesArray = attractionObject.times;
        if (timesArray.indexOf(currentTime) != -1){
            console.log("this attraction starts at this time", attractionObject);
        }
        console.log(timesArray);
    });


};
