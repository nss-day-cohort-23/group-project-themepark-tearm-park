"use strict";

const firebase = require("./firebase");
const $ = require("jquery");

module.exports.activateEvents = function(){
    console.log("events activate!");

$("#area-grid").click(function(){
    if ($(event.target).attr("id")!= ""){
        firebase.getAttractions($(event.target).attr("id"))
            .then(attractions => {
                console.log(attractions);
            });
    }
    
});


};