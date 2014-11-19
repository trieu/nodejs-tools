/**
 * Created by trieunt on 19/11/2014.
 */
var express = require('express');
var app = express();
var fibrous = require('fibrous');

var redis = require('redis').createClient();
var redback = require('redback').use(redis);
var ratelimit = redback.createRateLimit('requests');


app.get('/', function (req, res) {
    //Increment the count for the specified IP
    ratelimit.add('127.0.0.1');

    //Count the number of requests in the last 20 seconds
    var f = function () {
        var requests = ratelimit.sync.count('127.0.0.1', 5);
        if (requests > 5) {
            res.send('Banned!');
        } else {
            res.send('OK!');
        }
    };
    fibrous.run(f);



})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})