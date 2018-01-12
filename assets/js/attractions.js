"use strict";

let attractions = [];

const firebase = require("./firebase");

// returns list of unique areas represented by list of attractions
const getAreasFromAttractions = attractions => {
    let areas = [];
    attractions.forEach(attraction => {
        if (areas.indexOf(attraction.area_id) == -1)
        areas.push(attraction.area_id);
    });
    return areas;
};

// promises a list of all attractions that contain term in their names
const searchAttractions = term => {
    return new Promise((resolve, reject) => {
        firebase.getAttractions().then(attractions => {
            let regex = new RegExp(term, "i");
            let matches = attractions.filter(attraction => regex.test(attraction.name));
            resolve(matches);
        });
    });
};

module.exports = {getAreasFromAttractions, searchAttractions};