"use strict";

let attractions = [];

const firebase = require("./firebase");
const _ = require("lodash");

// setter
const setAttractions = attr => {
    attractions = attr;
};
// getter
const getAttractions = () => {
    return attractions;
};

// returns list of unique areas represented by list of attractions
const getAreasFromAttractions = attractions => {
    let areas = [];
    attractions.forEach(attraction => {
        if (areas.indexOf(attraction.area_id) == -1) {
            areas.push(attraction.area_id);
        }
    });
    return areas;
};

// promises a list of all attractions that contain term in their names
const searchAttractions = term => {
    // WHY did this work
    const firebase = require("./firebase");
    return new Promise((resolve, reject) => {
        firebase.getAttractions().then(attractions => {
            let regex = new RegExp(term, "i");
            let matches = attractions.filter(attraction => regex.test(attraction.name));
            resolve(matches);
        });
    });
};

// promises one type whose name matches the term
const searchTypes = term => {
    // WHY did this work
    const firebase = require("./firebase");
    return new Promise((resolve, reject) => {
        firebase.getTypes().then(types => {
            let regex = new RegExp(term, "i");
            let match = types.find(type => regex.test(type.name));
            resolve(match);
        });
    });
};

// -- FORMATTING -- //

// sticks type names on attraction objects
const addTypeNames = attractions => {
    // WHY did this work
    const firebase = require("./firebase");
    return new Promise ( (resolve, reject) => {
        firebase.getTypes().then( types => {
            // attractions is an object of objects!!!!
            _.forEach(attractions, attraction => {
                let attractionType = types.find(type => {
                    return type.id == attraction.type_id;
                });
                attraction.typeName = _.capitalize(attractionType.name);
            });
            resolve(attractions);
        });
    });
};

// sticks areas names on attraction objects
const addAreaNames = attractions => {
    // WHY did this work
    const firebase = require("./firebase");

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

// promises list of attractions with typeName and areaName properties added
const getFormattedAttractions = () => {
    // WHY did this work
    const firebase = require("./firebase");
    return new Promise((resolve, reject) => {
        // get basic attractions
        firebase.getAttractions()
        .then(attractions => {
            return addAreaNames(attractions);
        })
        // gets attractions with areaNames
        .then(partiallyFormattedAttractions => {
            return addTypeNames(partiallyFormattedAttractions);
        })
        // gets attractions with typeNames
        .then(formattedAttractions => {
            setAttractions(formattedAttractions);
            resolve(formattedAttractions);
        });
    });
};

module.exports = {getAreasFromAttractions, searchAttractions, searchTypes, addAreaNames, addTypeNames, setAttractions, getAttractions, getFormattedAttractions};