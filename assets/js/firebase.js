"use strict";

const $ = require("jquery");
const db_url = "https://theme-park-6b937.firebaseio.com";

// promises a list of areas
const getAreas = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db_url}/areas.json`
        }).done(results => resolve(results))
        .fail(error => reject(error));
    });
};

// promises a full list of types
const getTypes = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db_url}/attraction_types.json`
        }).done(results => resolve(results))
        .fail(error => reject(error));
    });
};

//accepts an area id and promises an array of attractions in that area
const getAttractions = (areaID) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${db_url}/attractions.json?orderBy="area_id"&equalTo=${areaID}`
        }).done(results => resolve(results))
        .fail(error => reject(error));
    });
};

module.exports = {getAreas, getTypes, getAttractions};