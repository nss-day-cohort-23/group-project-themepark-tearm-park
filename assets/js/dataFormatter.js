"use strict";

const $ = require('jquery');
const getData = require('./firebase');

module.exports.getTypeNames = (arrayOfAttractionObjects) => {
    return new Promise ( (resolve, reject) => {
        getData.getTypes().then( (arrayOfTypeObjects) => {
            for (let attraction in arrayOfAttractionObjects) {
                let currentTypeID = arrayOfAttractionObjects[attraction].type_id;
                let currentAttraction = arrayOfAttractionObjects[attraction];
                for (let i=0; i<arrayOfTypeObjects.length; i++) {
                    if (currentTypeID === arrayOfTypeObjects[i].id) {
                        currentAttraction.typeName = arrayOfTypeObjects[i].name;
                    }
                }
            }
            resolve( (arrayOfAttractionObjects));
        });
    });
};

module.exports.getAreaNames = (attractions) => {
    return new Promise ( (resolve, reject) => {
        getData.getAreas().then( (areas) => {
        for (let i=0; i<attractions.length; i++){
            let currentAttraction = attractions[i];
            let currentAreaID = currentAttraction.area_id;
                for (let c=0; c<areas.length; c++) {
                    if (currentAreaID === areas[c].id) {
                        currentAttraction.areaName = areas[c].name;
                }
            }
        }
        resolve(attractions);
        console.log("should have areaname", attractions);
        return attractions;
    });
    });
};

