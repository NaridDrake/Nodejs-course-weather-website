const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cb1d921dccf7fbd1d9b8807f3ba17602&query=' + lat + ',' + lon

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Could not connect to weather service!', undefined)
        }else if(body.error){
         callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast