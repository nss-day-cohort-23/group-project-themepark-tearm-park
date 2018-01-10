"use strict";

const $ = require("jquery");

// prints all areas in grid with names and colors
const displayAreaGrid = areas => {
    const areaGrid = require("../templates/area-grid.hbs");
    areas.splice(4, 0, []);
    areas.splice(7, 0, []);
    $("#area-grid").html(areaGrid({areas}));
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

module.exports = {displayAreaGrid, populateFooter};