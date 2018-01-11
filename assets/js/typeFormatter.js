"use strict";

const $ = require('jquery');
const getTypeData = require('./firebase');

module.exports.getTypeNames = attractions => {
    return new Promise((resolve, reject) => {
        getTypeData.getTypes().then(types => {
            // TODO refactor with lodash
            for (let index in attractions) {
                let attraction = attractions[index];
                let typeId = attraction.type_id;
                for (let i=0; i<types.length; i++) {
                    if (typeId === types[i].id) {
                        attraction.typeName = types[i].name;
                    }
                }
            }
            resolve((attractions));
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