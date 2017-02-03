/**
 * Created by robod on 2/3/2017.
 */
var request = require('request');
var sleep = require('thread-sleep');

module.exports.home = function(req,res) {
    res.send("I'm from Home");
}

module.exports.api = function(req,res) {
    //It's still the morning, calculate based  for today
    if(Date().getHours() < 7) {

    }
    //It's passed cancellation time, calculate for tomorrow

    var snowDays = 1 / 5 ;
    var tomorrowForecast = getWeatherData(1);
    var snowfall = tomorrowForecast.snow_day.cm;
    var temp = tomorrowForecast.
    var windSpeed =
}

function getWeatherData(day) {
    sleep(2000);
    request('http://api.wunderground.com/api/e1e738109f12d10c/forecast/q/13114.json', function(error, response, body) {
        return JSON.parse(body).forecast.simpleforecast.forecastday[day];
    });
}

