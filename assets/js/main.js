"use strict";

const domController = require("./dom");
const firebase = require("./firebase");
firebase.getAreas().then(areas => {
    domController.displayAreaGrid(areas);
});