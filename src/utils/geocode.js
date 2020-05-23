const request = require('request')
const geoCode = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaW50ZXJyb2hpdCIsImEiOiJja2E4YzJ6OHEwYmNuMnlwYzZqa2pnYmd0In0.G59rf04jCq9PR7SCxd16Wg&limit=1`
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect')
        }
        else if(body.features.length===0){
            callback('Unable to find the location, try another search')
        }
        else{
            callback(null, {
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode