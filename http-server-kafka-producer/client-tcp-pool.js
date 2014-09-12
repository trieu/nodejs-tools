/**
 * Created by trieu on 9/9/14.
 */

var ConnectionPool = require('jackpot');
var net = require('net');
var fibrous = require('fibrous');

// First argument: size of the connection pool.
// Second argument: optional connection factory.
// Third argument: optional options.
var pool = new ConnectionPool(10, {
    min: 2,
    max: 20
});
pool.retries = 5 // allow 5 failures for the #pull method

var connCount = 0;
pool.factory(function () {
    var client = new net.Socket();
    return client.connect(1337, '127.0.0.1', function () {
        connCount++;
        console.log('Connected ' + connCount);
    })
});

/*pool.allocate(function allocate(err, conn) {
 conn.on('data', function(data) {
 console.log('Received: ' + data);
 });
 });*/


var onGetData = function (data) {
    console.log('Received: ' + data);
    return data;
};
var allocateCallback = function (err, conn) {
    conn.on('data', onGetData);
};
pool.allocate(allocateCallback);

function getData() {


    var data = "ok";
    //data = allocateCallback.sync();


    return data;
}

var express = require('express');
var app = express();

app.get('/', function (req, res) {

    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send(getData());

});

app.listen(3000);

