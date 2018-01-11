"use strict";

const $ = require("jquery");
const firebase = require("./firebase");
const dom = require("./dom");
const typeFormatter = require('./typeFormatter');

const activateEvents = function () {
    activateAreaGrid();
    activateAttractionCards();
    activateSearch();
};

const activateAreaGrid = () => {
    $("#area-grid").click(function () {
        if ($(event.target).attr("id") != "") {
            firebase.getAttractions($(event.target).attr("id"))
                .then(attractions => {
                    return typeFormatter.getTypeNames(attractions);
                }).then((data) => {
                    dom.displayAttractions(data);
                });
        }
    });
};

const activateAttractionCards = () => {
    $(document).on("click", ".attraction-name", function () {
        $('.attraction-details').hide();
        $(this).siblings('.attraction-details').show();
    });
};

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