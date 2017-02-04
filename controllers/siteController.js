/**
 * Created by robod on 2/3/2017.
 */
var request = require('request');
var sleep = require('thread-sleep');

module.exports.home = function(req,res) {
    res.send("I'm from Home");
}

module.exports.api = function(req,res) {
    var currentTime = new Date();
    //It's still the morning, calculate based  for today
    if(currentTime.getHours() < 7) {

    }
    //It's passed cancellation time, calculate for tomorrow
    if(currentTime.getHours() > 7) {

    }
    //controls are the exponential component of each control's factor
    //get weather data and set variables
    sleep(2000);
    request('http://api.wunderground.com/api/e1e738109f12d10c/forecast/q/13114.json', function(error, response, body) {
        var snowDays = 4;
        var tomorrowForecast;
        tomorrowForecast = JSON.parse(body).forecast.simpleforecast.forecastday[1];
        var snowfall = tomorrowForecast.snow_day.cm;
        var temp = tomorrowForecast.low.fahrenheit;
        temp = 10;
        var windSpeed = (tomorrowForecast.maxwind.mph + tomorrowForecast.maxwind.mph) / 2;

        var snowFactor = ((snowfall / 14) ^ 2) * 100; //Snowfall out of 60cm, 60cm = 100% chance, exponential
        if (temp < 0) //If temp is below zero, better exponential chance of snowday
        {
            tempFactor = (((temp / -25) ^ 2) * 50);
        } else {
            tempFactor = 0;
        }

        otherFactor = ((windSpeed / 50) * 25) + (25 / snowDays);

        var finalPercentage = (snowFactor + tempFactor + otherFactor) / 300;

        if (finalPercentage > 1) {
            finalPercentage = 1;
            console.log(finalPercentage);
        }

        res.send({ "Percentage" : Math.round(finalPercentage * 100) });
    });
}


