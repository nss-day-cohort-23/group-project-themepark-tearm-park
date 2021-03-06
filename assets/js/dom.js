"use strict";

const $ = require("jquery");
const _ = require("lodash");

// prints all areas in grid with names and colors
const displayAreaGrid = areas => {
    const areaGrid = require("../templates/area-grid.hbs");
    const order = [3, 4, -1, 2, 6, 5, 1, 0, -1];
    let areaList = order.map(x => areas[x]);
    $("#area-grid").html(areaGrid({"areas": areaList}));
};

// displays list of attractions in left sidebar
const displayAttractions = attractions => {
    let attractionArray = [];
    const sidebar = require("../templates/sidebar.hbs");
    _.forEach(attractions, (attraction) => {
        attractionArray.push(attraction);
    });
    $("#attraction-list").html(sidebar({"attractions": attractionArray}));
    $('.attraction-details').hide();
};

// populates copyright footer with current year/date
const populateFooter = () => {
    let today = new Date(Date.now());
    let context = {
        "year": today.getFullYear(),
        "date": `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    };
    const footerTemplate = require("../templates/footer.hbs");
    $("#footer").html(footerTemplate(context));
};


// gives areas with areaIds a white dashed border
const highlightAreas = areaIds => {
    $(`.block`).removeClass("highlight");
    areaIds.forEach(areaId => {
        $(`#${areaId}.area`).parents(".block").addClass("highlight");
    });
};

module.exports = {displayAreaGrid, populateFooter, displayAttractions, highlightAreas};