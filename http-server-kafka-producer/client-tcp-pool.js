/**
 * Created by trieu on 9/9/14.
 */

var net = require('net');
var poolModule = require('generic-pool');
var pool = poolModule.Pool({
    name: 'tcp-client',
    create: function (callback) {
        var c = new net.Socket();
        c.connect(1337, '127.0.0.1', function () {
            console.log('Connected');
        });
        callback(null, c);
    },
    destroy: function (client) {
        client.destroy();
    },
    max: 12,
    // optional. if you set this, make sure to drain() (see step 3)
    min: 3,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis: 30000,
    // if true, logs via console.log - can also be a function
    log: true
});

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.status(200);
    res.set('Content-Type', 'text/html');

    //acquire connection - callback function is called
    // once a resource becomes available
    pool.acquire(function(err, client) {
        if (err) {
            // handle error - this is generally the err from your
            // factory.create function
        }
        else {
            client.on('data', function(data) {
                //console.log('Received: ' + data);
                res.send(data);
                //client.destroy(); // kill client after server's response
            });

            client.on('close', function() {
                console.log('Connection closed');
            });
        }
    });

});

app.listen(3000);

