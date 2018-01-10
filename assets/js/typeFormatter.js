"use strict";

const $ = require('jquery');
const getTypeData = require('./firebase');

module.exports.getTypeNames = (arrayOfAttractionObjects) => {
    return new Promise ( (resolve, reject) => {
        getTypeData.getTypes().then( (arrayOfTypeObjects) => {
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