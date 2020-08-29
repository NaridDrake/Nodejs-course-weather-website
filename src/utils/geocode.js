request = require('request')

const geocode = (addr, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(addr) +
        '.json?access_token=pk.eyJ1IjoibmFyaWR0aGVuaWdodGh1bnRlciIsImEiOiJja2VkeXQ2cmYwOG9hMndudzhmNXJjamsxIn0.7-R2LVo7Qf9HeEQ6JLKfQw&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, please try another.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode