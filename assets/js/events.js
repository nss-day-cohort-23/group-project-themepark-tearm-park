"use strict";

const firebase = require("./firebase");

module.exports.activateEvents = function(){
    console.log("events activate!");

$("#area-grid").click(function(){
    firebase.getAttractions($(event.target).attr("id"))
    .then(attractions => {
        console.log(attractions);
    });
});


};