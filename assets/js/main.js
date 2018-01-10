"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
const typeFormatter = require("./typeFormatter");

firebase.getAreas().then(areas => {
    console.log(areas);
    domController.displayAreaGrid(areas);
});