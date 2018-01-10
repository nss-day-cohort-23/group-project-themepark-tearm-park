"use strict";

const firebase = require("./firebase");
const $ = require("jquery");
const getAttractionData = require('./typeFormatter');

module.exports.activateEvents = function(){
    console.log("events activate!");

$("#area-grid").click(function(){
    if ($(event.target).attr("id")!= ""){
        firebase.getAttractions($(event.target).attr("id"))
            .then(attractions => {
                return getAttractionData.getTypeNames(attractions);
            }).then ( (data) => {
                console.log("after event", data);
            });
    }
    
});


};