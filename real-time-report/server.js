/*
    Node.js server script
    Required node packages: express, redis, socket.io
*/
const PORT = 3000;
const HOST = 'localhost';
const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';

var express = require('express'),
    http = require('http'), 
    fs = require('fs'),
    crypto = require('crypto'),
    server = http.createServer(app);
var phantom = require('phantom'); 
var app = express();

app.get('/report', function(req,res) {  
    var fullPath = __dirname + "/public/client.html";
    res.sendFile(fullPath);  
});

app.get('/file', function(req,res) {
    var name = req.param('name');
    var fullPath = __dirname + "/"+name;
    res.sendFile(fullPath);  
});

app.get('/screenshot', function(req,res) {
    //res.sendfile('lazada.png');    
    var url = req.param('url');
    if(url == null || url === '') {
        res.status(404).send('Not found');
        return;
    }
    var hash = crypto.createHash('md5').update(url).digest('hex');
    var name = hash + '.png';
    var fullPath = __dirname + "/" + name;

    if (fs.existsSync(fullPath)) {
       res.sendFile(fullPath);  
       return;
    }

    phantom.create(function (ph) {
        ph.createPage(function (page) {            
            page.set('settings.userAgent', USER_AGENT);
            page.set('settings.viewportSize.width', 1024);
            page.set('settings.viewportSize.height', 800);
            
            page.open(url, function(status) {  
              if (status !== 'success') {
                    console.log('Unable to load the address!');
                    ph.exit();
                } else {
                    setTimeout(function () {
                        page.render(name);
                        ph.exit();                        
                        setTimeout(function () {                           
                             res.sendFile(fullPath);  
                        }, 1100); 
                    }, 3900); 
                }
            });
        });
    });
});
app.listen(3001);



// websocket

const redis = require('redis');
const client = redis.createClient();
log('info', 'connected to redis server');

const io = require('socket.io');

if (!module.parent) {
    server.listen(PORT, HOST);
    const socket  = io.listen(server);

    socket.on('connection', function(client) {
        const subscribe = redis.createClient()
        subscribe.subscribe('realtime');

        subscribe.on("message", function(channel, message) {
            client.send(message);
            log('msg', "received from channel #" + channel + " : " + message);
        });

        client.on('message', function(msg) {
            log('debug', msg);
        });

        client.on('disconnect', function() {
            log('warn', 'disconnecting from redis');
            subscribe.quit();
        });
    });
}

function log(type, msg) {

    var color   = '\u001b[0m',
        reset = '\u001b[0m';

    switch(type) {
        case "info":
            color = '\u001b[36m';
            break;
        case "warn":
            color = '\u001b[33m';
            break;
        case "error":
            color = '\u001b[31m';
            break;
        case "msg":
            color = '\u001b[34m';
            break;
        default:
            color = '\u001b[0m'
    }

    console.log(color + '   ' + type + '  - ' + reset + msg);
}