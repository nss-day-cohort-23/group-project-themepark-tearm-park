"use strict";

const $ = require("jquery");
const firebase = require("./firebase");
const dom = require("./dom");
const moment = require('moment');
const attractionFactory = require("./attractions");
const timeSearch = require('./timeSearch');

// activate all events
const activateEvents = function () {
    activateAreaGrid();
    activateAttractionCards();
    activateSearch();
    activateTimeSelector();
    activateCheckbox();
};

// activates time selector and calls getCurrentAttraction function
const activateTimeSelector = () =>{
    $('#time-selector').on("change", function () {
        let selectedTime = $('#time-selector').val(); // grab the selected time 
        let todaysDate= moment().format('MM-DD-YYYY'); // get todays date 
        let dateAndTime = moment(`${todaysDate} ${selectedTime}`);  // make a moment object with today's date and the selected time 
        timeSearch.printCurrentAttractions(dateAndTime);
    });
};
    
// activates click listener on area grid squares
const activateAreaGrid = () => {
    $("#area-grid").click(function () {
        let $target = $(event.target);
        if ($target.attr("id") != "" && $target.hasClass("area") || $target.hasClass("name")) {
            firebase.getAttractionsByArea($target.attr("id"))
                .then(attractions => {
                    return attractionFactory.addTypeNames(attractions);
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
        // search by type
        if ($("#searchByType").attr("checked")) {
            if (term.trim() != "") {
                attractionFactory.searchTypes(term).then(type => {
                    return firebase.getAttractionsByType(type.id);
                }).then(attractions => {
                    dom.displayAttractions(attractions);
                });
            }
        }
        // search by name
        else {
            if (term.trim() != "") {
                attractionFactory.searchAttractions(term).then(attractions => {
                    let areas = attractionFactory.getAreasFromAttractions(attractions);
                    dom.highlightAreas(areas);
                });
            } else {
                dom.highlightAreas([]);
            }
        }
    });
};

const activateCheckbox = () => {
    $("#searchByType").parent().on("click", event => {
        let $input = $(event.target).find("input");
        if ($input.attr("checked")) {
            $input.removeAttr("checked");
        } else {
            $input.attr("checked", true);
        }
    });
};

module.exports = {activateEvents};