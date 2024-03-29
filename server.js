var express = require('express');
var exphbs = require('express-handlebars');
var request  =  require('request');
var siteController = require('./controllers/siteController.js');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', siteController.home);
app.get('/api/:location/:days', siteController.api);
app.get('*', function(req, res) {
  res.send('You messed up or I did, there isn\'t a page here. <a href="/"> Go Back </a>');
})

app.listen(80, function() {
  console.log("Express started");
});
