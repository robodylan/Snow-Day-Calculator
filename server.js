var express = require('express');
var handlebars = require('express-handlebars');
var request  =  require('request');
var siteController = require('./controllers/siteController.js');

var app = express();
app.engine('handlebars', handlebars({defaultlayout: 'main'}));
app.set('view engine', handlebars)
app.use(express.static(__dirname + '/public'));

app.get('/', siteController.home);

app.get('/api/:location', siteController.api);

app.listen(3000, function() {
  console.log("Express started");
});
