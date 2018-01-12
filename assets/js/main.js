"use strict";

const dom = require("./dom");
const firebase = require("./firebase");
const events = require("./events");
const timeSearch = require("./timeSearch");
const $ = require('jquery');
const moment = require('moment');
const attractionFactory = require('./attractions');

// gets attractions, types, and areas, and returns fully formatted attractions
attractionFactory.getFormattedAttractions().then(attractions => {
    // populate area grid
    firebase.getAreas().then(areas => {
        dom.displayAreaGrid(areas);
    });

    // this is a moment object that will get formatted in timeSearch
    let currentTime = moment();
    // passes in current time and displays attractions happening at that time
    timeSearch.printCurrentAttractions(currentTime);
    // activates search, click events
    events.activateEvents();
});

dom.populateFooter();
