const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsa3J0IiwiYSI6ImNqd2FyYzVmeDA4eTc0OG1nM2hoOXIxMTgifQ.UzmGifYUuwbn662OC6kOPA';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to process request!!!', undefined);
        } else if(body.features.length === 0) {
            callback('Requested location not found', undefined)
        } else {
            callback(undefined, {
                 latitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;