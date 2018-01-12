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


// // sticks type names on attraction objects
// module.exports.getTypeNames = (arrayOfAttractionObjects) => {
//     return new Promise ( (resolve, reject) => {
//         firebasegetData.getTypes().then( (arrayOfTypeObjects) => {
//             for (let attraction in arrayOfAttractionObjects) {
//                 let currentTypeID = arrayOfAttractionObjects[attraction].type_id;
//                 let currentAttraction = arrayOfAttractionObjects[attraction];
//                 for (let i=0; i<arrayOfTypeObjects.length; i++) {
//                     if (currentTypeID === arrayOfTypeObjects[i].id) {
//                         currentAttraction.typeName = arrayOfTypeObjects[i].name;
//                     }
//                 }
//             }
//             resolve( (arrayOfAttractionObjects));
//         });
//     });
// };

// accepts attractions, requests areas, adds area names to attraction objects, returns attractions
const addAreaNames = attractions => {
    return new Promise ( (resolve, reject) => {
        firebase.getAreas().then( areas => {
            let formattedAttractions = attractions.map(attraction => {
                let attractionArea = areas.find(area => {
                    return area.id == attraction.area_id;
                });
                attraction.areaName = attractionArea.name;
            });
            resolve(attractions);
        });
    });
};

module.exports = {getAreasFromAttractions, searchAttractions, addAreaNames};