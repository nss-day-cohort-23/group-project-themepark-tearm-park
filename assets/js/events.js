"use strict";

const $ = require("jquery");
const firebase = require("./firebase");
const dom = require("./dom");
const moment = require('moment');
const dataFormatter = require('./dataFormatter');
const timeFormatter = require('./timeFormatter');


// activate all events
const activateEvents = function () {
    activateAreaGrid();
    activateAttractionCards();
    activateSearch();
    activateTimeSelector();
    
};

// activates time selector and calls getCurrentAttraction function
const activateTimeSelector = () =>{
    $('#time-selector').on("change", function () {
        let currentTime = `2013-02-08 ${$('#time-selector').val()}`;
        currentTime = moment(currentTime).format("h:mmA");
        let currentAttractions = timeFormatter.getCurrentAttractions(currentTime);
    });
};
    
// activates click listener on area grid squares
const activateAreaGrid = () => {
    $("#area-grid").click(function () {
        let $target = $(event.target);
        console.log($target);
        if ($target.attr("id") != "" && $target.hasClass("area") || $target.hasClass("name")) {
            firebase.getAttractions($target.attr("id"))
                .then(attractions => {
                    return dataFormatter.getTypeNames(attractions);
                }).then((data) => {
                    dom.displayAttractions(data);
                });
        }
    });
};

// activates click listener on attraction names
const activateAttractionCards = () => {
    $(document).on("click", ".attraction-name", function () {
        $('.attraction-details').hide();
        $(this).siblings('.attraction-details').show();
    });
};

// activates keyup listener on search box
const activateSearch = () => {
    $("#attraction-search").on("keyup", event => {
        let term = $(event.target).val();
        if (term.trim() != "") {
            firebase.searchAttractions(term).then(attractions => {
                let areas = firebase.getAreasFromAttractions(attractions);
                dom.highlightAreas(areas);
            });
        } else {
            dom.highlightAreas([]);
        }
    });
};

module.exports = {activateEvents};