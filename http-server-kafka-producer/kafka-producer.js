/**
 * Created by trieunt on 10/09/2014.
 */

var zkKafka = 'localhost:2181';
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(zkKafka),
    producer = new Producer(client)
    ;

var express = require('express');
var app = express();

producer.on('ready', function () {
    app.get('/test-log-kafka', function(req, res){
        res.status(200);
        res.set('Content-Type', 'text/html');
        res.send("Logged");

        var logFields = [];
        var time = new Date().getTime();
        logFields.push(time);
        logFields.push("51597a30a83c41dd");
        logFields.push("pageview");
        logFields.push("http://sohoa.vnexpress.net/photo/do-choi-so/anh-va-video-thuc-te-dong-ho-thong-minh-apple-watch-3077240.html");

        var msg = logFields.join('\t');
        var payloads = [
            { topic: 'user-activity', messages: msg, partition: 1 }
        ]

        producer.send(payloads, function (err, data) {
            console.log(data);
            if (err) {
                console.log(err);
            }
        });
    });
    app.listen(3000);
    console.log("Http Server Log with Kafka is ready! ");
});





