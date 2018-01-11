"use strict";

const firebase = require("./firebase");
const $ = require("jquery");
const dom = require("./dom");

const getAttractionData = require('./typeFormatter');


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
    $(".attraction-details").toggle();
});

    // (document).on("click", ".deleteCat", function () {
    //     let catId = $(this).attr("id");
    //     console.log("catId", catId);
    //     deleteCat(catId)
    //         .then(() => {
    //             alert("Category deleted");
    //             return getCats();
    //         })
    //         .then(cats => {
    //             listCats(cats);
    //         })
    //         .catch(err => {
    //             console.log("oops", err);
    //         });
    // });



};