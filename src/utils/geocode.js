const request = require('request')

const geocode = (address, callback) => {
    // const url = 'http://localhost:8080/api/geo?city=' + address;
    const token = 'pk.eyJ1Ijoib2toZWxlbml1ayIsImEiOiJjbGFrNGo3N2kwaXV1M3BvMWFzcjJleHpvIn0.OdPONgQ1RuzXo0HoHMcQqA'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`

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