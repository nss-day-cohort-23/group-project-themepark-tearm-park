"use strict";

const $ = require('jquery');
const getTypeData = require('./firebase');

module.exports.getTypeNames = (arrayOfAttractionObjects) => {
    getTypeData.getTypes().then( (arrayOfTypeObjects) => {
        for (let i=0; i<arrayOfAttractionObjects.length; i++) {
            let currentTypeID = arrayOfAttractionObjects[i].type_id;
            let currentAttraction = arrayOfAttractionObjects[i];
            for (let i=0; i<arrayOfTypeObjects.length; i++) {
                if (currentTypeID === arrayOfTypeObjects[i].id) {
                    currentAttraction.typeName = arrayOfTypeObjects[i].name;
                }
            }
        }
    });
    console.log("after looping", arrayOfAttractionObjects);
};


// let getTypeName = (attractionObjects, typeObjects) => {
    //     console.log("attractions", attractionObjects);
    //     console.log("types", typeObjects);
    //     for (let i=0; i<attractionObjects.length; i++) {
    //         let currentTypeID = attractionObjects[i].type_id;
    //         let currentAttraction = attractionObjects[i];
    //         for (let i=0; i<typeObjects.length; i++) {
    //             if (currentTypeID === typeObjects[i].id) {
    //                 currentAttraction.typeName = typeObjects[i].name;
    //             }
    //         }
    //     }
    //     console.log("after loop", attractionObjects);
    // };
    
    // getTypeName(attractions, types);