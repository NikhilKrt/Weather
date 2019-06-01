const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/197e53cbfba603ef957e0c5d15bf2b74/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to process request', undefined)
        } else if (body.error) {
            callback('Unable to search the location', undefined)
        } else {
            const temp = body.currently.temperature;
            const precipProb = body.currently.precipProbability;
            callback(undefined, ` ${body.daily.data[0].summary} It is currently ${temp} degrees out. Highest temprature of today is ${body.daily.data[0].temperatureHigh} degrees and Lowest temprature of today is ${body.daily.data[0].temperatureLow} degrees. There is a ${precipProb}% chance of rain.`);
        }
    })
}

module.exports = forecast;