"use strict";

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

module.exports = {getAreas};