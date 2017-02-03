/**
 * Created by robod on 2/3/2017.
 */
var request = require('require');

module.exports.home = function(req,res) {
    res.send("I'm from Home");
}

module.exports.api = function(req,res) {
    res.send("I'm from API");

}

