"use strict";

const firebase = require("./firebase");
const $ = require("jquery");
const dom = require("./dom");

module.exports.activateEvents = function(){

$("#area-grid").click(function(){
    if ($(event.target).attr("id")!= ""){
        firebase.getAttractions($(event.target).attr("id"))
            .then(attractions => {
                console.log("this is from the click event", attractions);
                dom.displayAttractions(attractions);
            });
    }
    
});


};