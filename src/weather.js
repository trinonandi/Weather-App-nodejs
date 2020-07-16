const request = require('request'); //npm package

function forcast(latitude,longitude,callbackFn){
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=de0e19bbda7a9d0668e963322e0bef16`;

    request({url: url ,json: true}, (error,response) => {
        if(error){
            callbackFn('Cannot connect to weather servers',undefined);
        } else if(response.body.cod){
            callbackFn('Coordinates not found');
        } else{
            callbackFn(undefined,response.body.current);
        }
    });

}

module.exports = {forcast};