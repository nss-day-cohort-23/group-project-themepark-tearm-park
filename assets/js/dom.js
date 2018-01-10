"use strict";

const $ = require("jquery");

// prints all areas in grid with names and colors
const displayAreaGrid = areas => {
    const areaGrid = require("../templates/area-grid.hbs");
    areas.splice(4, 0, []);
    areas.splice(7, 0, []);
    $("#area-grid").html(areaGrid({areas}));
};

module.exports = {displayAreaGrid};