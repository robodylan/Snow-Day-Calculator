/**
 * Created by robod on 2/3/2017.
 */
var request = require('request');
var sleep = require('thread-sleep');
var exphbs = require('express-handlebars');

module.exports.home = function(req,res) {
    res.render('home');
}
module.exports.api = function(req,res) {
    var currentTime = new Date();
    var calculateWithDataFrom;
    //It's still the morning, calculate based  for today
    if(currentTime.getHours() != 25) {
      sleep(2000);
      request('http://api.wunderground.com/api/e1e738109f12d10c/forecast/q/' + req.params.location + '.json', function(error, response, body) {
          if(req.params.hasOwnProperty('days')) {
            var snowDays = req.params.days;
          }else {
            res.send({Percentage : "%Error"});
          }
          var tomorrowForecast;
          if(JSON.parse(body).hasOwnProperty('forecast'))
          {
            tomorrowForecast = JSON.parse(body).forecast.simpleforecast.forecastday[1];
          }else {
            res.send({Percentage : "%N/A"});
            return;
          }
          var snowfall = tomorrowForecast.snow_day.cm;
          var temp = tomorrowForecast.low.fahrenheit - 10;
          var windSpeed = tomorrowForecast.maxwind.mph;
          var tempFactor = .25;
          var snowFactor = snowfall / 10;
          if (temp < 0)
          {
              tempFactor = .75 + (Math.abs(temp) / -50);
          } else if(snowFactor > .5){
              tempFactor = .75;
          }
          if(snowFactor < 0.5) {
            otherFactor = (windSpeed / 50)
          } else {
            otherFactor = .75 + (windSpeed / 50);
          }

          var finalPercentage = ((snowFactor + tempFactor + otherFactor) / 3) - (Math.pow(snowDays, 2) / 100);
          if (finalPercentage > 1) {
              finalPercentage = 1;
          }

          if(finalPercentage < 0) {
            finalPercentage = 0;
          }
          console.log(snowFactor);
          console.log(tempFactor);
          console.log(otherFactor);
          res.send({ "Percentage" : Math.round(finalPercentage * 98)});
      });
    }else {

    }
}
