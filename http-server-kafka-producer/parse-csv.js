/**
 * Created by trieunt on 17/09/2014.
 */

var fs = require('fs'),
    readline = require('readline');

var redis = require("redis"),
    client = redis.createClient(6379, '127.0.0.1', {});

client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});

client.on("ready", function () {
    console.log("Connected to redis ! ");

    var rd = readline.createInterface({
        input: fs.createReadStream('/home/trieunt/Dropbox/Public/zone_fraud.csv'),
        output: process.stdout,
        terminal: false
    });
    rd.on('line', function(line) {
        var toks = line.split(',');
        var websiteId = toks[0];
        if( ! isNaN(websiteId) ){
            websiteId = parseInt(websiteId);
            var zoneId = parseInt(toks[1]);
            var fraudScoreLimit = parseInt(toks[2]);
            if( isNaN(fraudScoreLimit)){
                fraudScoreLimit = 69;
            }
            client.hset("clickfraud-websites", "w:"+websiteId, fraudScoreLimit+"");
            if(websiteId == 73)
            {
                console.log(websiteId + " zone "+ zoneId + " fraudScore: " + fraudScoreLimit  + " - " + toks[2]);
            }

        }
    });
    rd.on('close', function() {
        client.quit(function (err, res) {
            console.log("Exiting from quit command.");
        });
    });
});


