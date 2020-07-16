const request = require('request'); //npm package

function geocoding(address,callbackFn){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidHJpbmFuamFuIiwiYSI6ImNrY2kyMnpqaDE3a2QyeG0yYnFtOGx6MmQifQ.fpnk1PCTnUZS8KMXc8_jtg&limit=1`;
    request({url: url, json: true}, (error,response) => {
        if(error){
            callbackFn('Cannot connect to location database',undefined);
        } else if(response.body.features.length === 0 || response.body.message){
            callbackFn('Incorrect location entered',undefined);
        } else{
            callbackFn(undefined,{
             longitude : response.body.features[0].center[0],
             latitude: response.body.features[0].center[1],
             location: response.body.features[0].place_name
            });
        }
    }); 
 }

 module.exports = {geocoding};