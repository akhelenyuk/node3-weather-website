const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1f78bf5ba35fadc30f6a2c7a3373bac3&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log('error: ' + error)
            callback(error)
        } else if (body.error) {
            console.log('no data: ' + body.error)
        } else {
            callback(undefined, {
                temperature: body.current.temperature
            })
        }
    })
}

module.exports = forecast


