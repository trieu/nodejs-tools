/**
 * Created by trieu on 9/9/14.
 */
var net = require('net');

var server = net.createServer(function(socket) {
    //socket.write('Echo server\r\n');
    socket.write('<h1>Echo from TCP server\r\n</h1>');
    socket.pipe(socket);
});


server.listen(1337, '127.0.0.1');
console.log('Starting server OK');