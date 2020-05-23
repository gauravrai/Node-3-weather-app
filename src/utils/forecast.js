const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5106cd31fffa760bc05c54610ac5361f&query=${latitude},${longitude}`

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect internet')
        }
        else if(body.error){
            callback(error)
        }
        else{
            callback(null, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Air pressure is ${body.current.pressure}. `)
        }
    })
}
module.exports = forecast