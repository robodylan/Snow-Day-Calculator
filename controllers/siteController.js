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
          var snowDays = req.params.days;
          var tomorrowForecast;
          tomorrowForecast = JSON.parse(body).forecast.simpleforecast.forecastday[1];
          var snowfall = tomorrowForecast.snow_day.cm;
          var temp = tomorrowForecast.low.fahrenheit - 10;
          var windSpeed = tomorrowForecast.maxwind.mph;

          var snowFactor = snowfall / 10;
          if (temp < 0)
          {
              tempFactor = .5 + (Math.abs(temp) / -50);
          } else {
              tempFactor = .5;
          }

          otherFactor = .5 + (windSpeed / 50);

          var finalPercentage = ((snowFactor + tempFactor + otherFactor) / 3) - (Math.pow(snowDays, 2) / 100);
          if (finalPercentage > 1) {
              finalPercentage = 1;
          }

          if(finalPercentage < 0) {
            finalPercentage = 0;
          }
          res.send({ "Percentage" : Math.round(finalPercentage * 98)});
      });
    }else {

    }
}
