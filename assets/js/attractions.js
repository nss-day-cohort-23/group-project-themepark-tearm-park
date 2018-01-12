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


// sticks type names on attraction objects
const addTypeNames = attractions => {
    return new Promise ( (resolve, reject) => {
        firebase.getTypes().then( types => {
            // attractions is an object of objects!!!!
            for (let index in attractions) {
                let attraction = attractions[index];
                let attractionType = types.find(type => {
                    return type.id == attraction.type_id;
                });
                attraction.typeName = attractionType.name;
            }
            resolve(attractions);
        });
    });
};

// sticks areas names on attraction objects
const addAreaNames = attractions => {
    return new Promise ( (resolve, reject) => {
        firebase.getAreas().then( areas => {
            attractions.map(attraction => {
                let attractionArea = areas.find(area => {
                    return area.id == attraction.area_id;
                });
                attraction.areaName = attractionArea.name;
            });
            resolve(attractions);
        });
    });
};

module.exports = {getAreasFromAttractions, searchAttractions, addAreaNames, addTypeNames};