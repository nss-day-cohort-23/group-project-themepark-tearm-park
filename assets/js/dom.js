"use strict";

const $ = require("jquery");

// prints all areas in grid with names and colors
const displayAreaGrid = areas => {
    const areaGrid = require("../templates/area-grid.hbs");
    areas.splice(1, 0, []);
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


const populateFooter = () => {
    let today = new Date(Date.now());
    let context = {
        "year": today.getFullYear(),
        "date": `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
    };
    const footerTemplate = require("../templates/footer.hbs");
    $("#footer").html(footerTemplate(context));
};

module.exports = {displayAreaGrid, populateFooter, displayAttractions};

