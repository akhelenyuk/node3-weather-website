const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1f78bf5ba35fadc30f6a2c7a3373bac3&query=${longitude},${latitude}&units=m`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log('error: ' + error)
            callback(error)
        } else if (body.error) {
            console.log('no data: ' + body.error)
        } else {
            const message = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity} %.`
            console.log(message)
            callback(undefined, message)
        }
    })
}

module.exports = forecast


