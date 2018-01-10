"use strict";

const $ = require("jquery");

// prints all areas in grid with names and colors
const displayAreaGrid = areas => {
    const areaGrid = require("../templates/area-grid.hbs");
    areas.splice(4, 0, []);
    areas.splice(7, 0, []);
    $("#area-grid").html(areaGrid({areas}));
};

const displayAttractions = attractions => {
    let attractionArray = [];
    const sidebar = require("../templates/sidebar.hbs");
    for (let prop in attractions){
        attractionArray.push(attractions[prop]);
    }
    $("#attraction-list").html(sidebar({attractions: attractionArray}));
    
    
};

module.exports = {displayAreaGrid, displayAttractions};