"use strict";

const firebase = require("./firebase");
const $ = require("jquery");
const dom = require("./dom");
const moment = require('moment');
const getAttractionData = require('./typeFormatter');
const timeFormatter = require('./timeFormatter');


module.exports.activateEvents = function(){

$("#area-grid").click(function(){
    if ($(event.target).attr("id")!= ""){
        firebase.getAttractions($(event.target).attr("id"))
            .then(attractions => {
                return getAttractionData.getTypeNames(attractions);
            }).then ( (data) => {
                dom.displayAttractions(data);
                console.log("after event", data);
            });
    }
    
});

$(document).on("click", ".attraction-name", function(){
    $('.attraction-details').hide(); 
    $(this).siblings('.attraction-details').show();
});

$('#time-selector').on("change", function () {
    let currentTime = `2013-02-08 ${$('#time-selector').val()}`;
        currentTime = moment(currentTime).format("h:mmA");
        console.log("this should be a formatted current time when you change the selector", currentTime);
        let currentAttractions = timeFormatter.getAttractionsByTime(currentTime);
    });



};