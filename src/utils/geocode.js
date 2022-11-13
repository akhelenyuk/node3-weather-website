const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://localhost:8080/api/geo?city=' + address;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service', undefined) // undefined is default if not set
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log(`received geo for ${address}`)
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode